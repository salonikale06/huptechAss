// controllers/authController.js

import loginModel from "../models/loginModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const handleUserSignup = async (req, res) => {
    const { Name, email, password } = req.body;

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user with hashed password
        const user = await loginModel.create({
            Name,
            email,
            password: hashedPassword // Store hashed password in the database
        });

        console.log(user);
        res.status(200).json({ path: "controller schema created" });

    } catch (error) {
        console.error("Controller Issue", error);
        res.status(500).json({ msg: "Duplicate Email" });
    }
}

export const handleUserLogin = async (req, res) => {
    const { email, password } = req.body;
   
    try {
        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({ status: "error", message: "Email and password are required" });
        }

        // Find user by email
        const user = await loginModel.findOne({ email: email });

        if (user) {
            // Compare password
            const isValidPassword = await bcrypt.compare(password, user.password);

            if (isValidPassword) {
                // Password is correct, generate JWT token
                const token = jwt.sign({
                    Name: user.Name,
                    email: user.email
                }, process.env.secreteKey);

                res.json({ status: "ok", token: token });
            } else {
                // Password is incorrect
                res.status(401).json({ status: "error", message: "Invalid password" });
            }
        } else {
            // User not found
            res.status(404).json({ status: "error", message: "User not found" });
        }
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
}

export const handleDashboard = async (req,res) => {
    const token = req.headers['x-access-token'];
   
    try {
        const decode = jwt.verify(token,process.env.secreteKey);
        const email = decode.email;
        const user = await loginModel.findOne({email:email});
        return res.json({status: 'ok', quotes: user.quotes});
    } catch (error) {
        console.log(error);
    }
}

export const handleDashboardPost = async (req,res) => {
    const token = req.headers['x-access-token'];
    try {
        const decode = jwt.verify(token,process.env.secreteKey);
        const email = decode.email;
        const user = await loginModel.updateOne({email:email} ,{$set:{quotes:req.body.quotes}});
        return res.json({status: 'ok',quotes: user.quotes});
    } catch (error) {
        console.log(error);
    }
}
