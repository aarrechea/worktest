// Imports
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoute';
import Registration from './components/auth/Registration';
import Login from './components/auth/Login';
import Company from './components/company/CompanyPage';
import CreateEditCompany from './components/company/CompaniesEditCreate';
import EvaluationPage from './components/evaluations/EvaluationPage';



// App
function App() {
  return (
    <Routes>
      <Route path='/register/' element={<Registration/>} />
      <Route path='/login/' element={<Login/>} />
      <Route path='/' element={<ProtectedRoute><EvaluationPage/></ProtectedRoute>} />      
      <Route path='/company' element={<ProtectedRoute><Company/></ProtectedRoute>} />
      <Route path='/create-company' element={<ProtectedRoute><CreateEditCompany/></ProtectedRoute>} />      
    </Routes>
  );
};



// Exports
export default App;
