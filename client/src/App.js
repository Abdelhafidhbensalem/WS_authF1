import './App.css';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Signin from './components/Signin/Signin';
import Signup from './components/Signup/Signup';
import Dashboard from './components/Dashboard/Dashboard';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCurrentUser } from './JS/actions/actionsUser';
import AuthUser from './components/AuthUser';

function App() {
  const dispatch=useDispatch()
  useEffect(() => {
    dispatch(getCurrentUser())
  
   
  }, []);
  
  return (
    <div className="App">
   <Routes>
     <Route path="/" element={<NavBar/>}/>
     <Route path="/signin" element={<Signin/>}/>
     <Route path="/signup" element={<Signup/>}/>
     <Route path="/dashboard" element={<AuthUser><Dashboard/></AuthUser>} />
   </Routes>
    </div>
  );
}

export default App;
