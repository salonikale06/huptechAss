import express from 'express';
import { uploadData , downloadPDF} from '../controllers/UserData.js'; // Adjust import statement
import { handleUserSignup , handleUserLogin , handleDashboard ,handleDashboardPost} from "../controllers/loginController.js";

const routes = express.Router();

routes.post('/upload', uploadData);
routes.get('/downloadPDF', downloadPDF);
routes.post("/register",handleUserSignup);
routes.post("/login",handleUserLogin);
routes.get("/quotes",handleDashboard);
routes.post("/quotes",handleDashboardPost);

export default routes;
