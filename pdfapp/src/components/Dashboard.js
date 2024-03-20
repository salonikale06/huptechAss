
import React, { Component } from 'react';
import DataTable from 'react-data-table-component';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css } from '@emotion/react';
import ClipLoader from 'react-spinners/ClipLoader';
import Swal from 'sweetalert2';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const API_URL = 'http://78.46.203.31:49160/api/customers';

class Customers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.fetchCustomers();
  }

  fetchCustomers = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      this.setState({ customers: data, loading: false });
    } catch (error) {
      console.error('Error fetching customers:', error);
      this.setState({ loading: false });
      toast.error('Failed to fetch customers');
    }
  };

  handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        await this.fetchCustomers();
        toast.success('Customer deleted successfully');
      } else {
        throw new Error('Failed to delete customer');
      }
    } catch (error) {
      console.error('Error deleting customer:', error);
      toast.error('Failed to delete customer');
    }
  };

  render() {
    const { customers, loading } = this.state;

    const columns = [
      {
        name: 'ID',
        selector: 'id',
        sortable: true,
      },
      {
        name: 'Name',
        selector: 'name',
        sortable: true,
      },
      {
        name: 'Phone',
        selector: 'phone',
        sortable: true,
      },
      {
        name: 'Actions',
        cell: (row) => (
          <>
            <button onClick={() => this.handleDelete(row.id)}>Delete</button>
            {/* Add edit functionality */}
          </>
        ),
      },
    ];

    return (
      <div>
        <h1>Customers</h1>
        {loading ? (
          <ClipLoader color="#36D7B7" loading={loading} css={override} size={35} />
        ) : (
          <DataTable
            title="Customer List"
            columns={columns}
            data={customers}
            pagination
            highlightOnHover
          />
        )}
        <ToastContainer />
      </div>
    );
  }
}

export default Customers;
