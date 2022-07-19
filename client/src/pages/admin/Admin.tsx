import React from 'react';
import { Link } from 'react-router-dom';
import AdminProducts from './AdminProducts';
import Divider from '@material-ui/core/Divider';
import AdminOrders from './AdminOrders';
import SettingsIcon from '@material-ui/icons/Settings';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

// Statics
import './Admin.css';

const Admin = () => {
  return (
    <div className="admin">
      <div className="admin__header">
        <h1>
          <SettingsIcon /> Admin Zone
        </h1>
      </div>

      <Divider />

      <div className="admin__content">
        <div className="admin__content--left">
          <AdminOrders />
        </div>
        <div className="admin__content--right">
          <AdminProducts />
        </div>
      </div>

      <Link to="/admin/create">
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Link>
    </div>
  );
};

export default Admin;
