import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import CreateSchool from '../pages/School/Create';
import CreateStudent from '../pages/Student/Create';
import IndexSchool from '../pages/School/Index';
import IndexStudent from '../pages/Student/Index';
import Register from '../pages/Register/Register';
import Login from '../pages/Login/Login';

const Web = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/school' element={<IndexSchool />}/>
            <Route path='/student' element={<IndexStudent />}/>
            <Route path='/school/create' element={<CreateSchool />}/>
            <Route path='/student/create' element={<CreateStudent />}/>
            <Route path='/register' element={<Register />}/>
            <Route path='/login' element={<Login />}/>
        </Routes>
    </BrowserRouter>
  );
};

export default Web