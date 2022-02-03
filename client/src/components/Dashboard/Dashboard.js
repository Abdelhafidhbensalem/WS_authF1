import React from 'react';
import { useSelector } from 'react-redux';
import NavBar from '../NavBar/NavBar';

const Dashboard = () => {
    const currentUser=useSelector(state=>state.userReducer.currentUser)
  return <div>
      <NavBar/>
      <h1>Welcome {currentUser.fullName}</h1>
  </div>;
};

export default Dashboard;
