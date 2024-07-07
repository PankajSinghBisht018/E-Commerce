import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import StoreIcon from '@mui/icons-material/Store';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PeopleIcon from '@mui/icons-material/People';
import DashboardIcon from '@mui/icons-material/Dashboard';

function Dashboard() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="flex-1 min-h-screen">
      <div className="flex">
        <div className="static top-0 left-0 flex flex-col items-center h-screen " style={{ width: '240px' }}>
          <ul className="p-2">
            <ListItem button onClick={() => handleNavigation('/dashboard')} className="p-4 cursor-pointer hover:bg-gray-700">
              <ListItemIcon>
                <DashboardIcon className="text-2xl" />
              </ListItemIcon>
              <ListItemText primary="Dashboard" className="ml-2" />
            </ListItem>
            <ListItem button onClick={() => handleNavigation('/products')} className="p-4 cursor-pointer hover:bg-gray-700">
              <ListItemIcon>
                <StoreIcon className="text-2xl" />
              </ListItemIcon>
              <ListItemText primary="Products" className="ml-2" />
            </ListItem>
            <ListItem button onClick={() => handleNavigation('/orders')} className="p-4 cursor-pointer hover:bg-gray-700">
              <ListItemIcon>
                <ListAltIcon className="text-2xl" />
              </ListItemIcon>
              <ListItemText primary="Orders" className="ml-2" />
            </ListItem>
            <ListItem button onClick={() => handleNavigation('/customers')} className="p-4 cursor-pointer hover:bg-gray-700">
              <ListItemIcon>
                <PeopleIcon className="text-2xl" />
              </ListItemIcon>
              <ListItemText primary="Customers" className="ml-2" />
            </ListItem>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
