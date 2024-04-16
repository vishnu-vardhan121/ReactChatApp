import logo from './logo.svg';
import './App.css';
import RegisterPage from './pages/RegisterPage';
import { BrowserRouter, Routes, Route ,Navigate } from "react-router-dom";
import HomePage from './pages/home';
import LoginPage from './pages/loginPage';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';



function App() {

  const {currentUser}= useContext(AuthContext)
  const ProtectedRoute = ({children})=>{
    if(!currentUser){
      return <Navigate to="/login"/>;
    }
    return children
  }
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path='/' element={<ProtectedRoute><HomePage/></ProtectedRoute>}/>
        <Route path='login' element={<LoginPage/>}/>
        <Route path='register' element={<RegisterPage/>}/>

      </Routes>
    </BrowserRouter>
    );
}

export default App