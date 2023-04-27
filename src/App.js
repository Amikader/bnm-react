//import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Routes,Route,Outlet } from 'react-router-dom'
import Dashbaord from './components/Dashboard';
import UserDashboard from './components/UserDashboard';
import form from './css/form.css';
import { useContext, useState } from 'react';
import Calendar1 from './calendar/Calendar1'
import Content from './components/Content';
import Demandes from './components/Demandes';
import  Calendar0 from'./calendar/Calendar0';
import  CongeesCalendar from'./calendar/CongeesCalendar';
import AddDemmand from './cards/AddDemmand';
import Approuver from './components/Approuver';
import Rejeter from './components/Rejeter';
import Login1 from './components/Login1';
import PrivateRoutes from './api/PrivateRoutes';
import LoginRoute from './api/LoginRoute';
import AuthContext from './context/AuthContext';
import DemandsUser from './components/DemandsUser';
import UserApprouver from './components/UserApprouver';
import UserRejeter from './components/UserRejeter';
import FormPDF from './cards/FormPDF';
import { useEffect } from 'react';
import dayjs from 'dayjs';
import Test from './components/Test';


function App() {
  const {auth} = useContext(AuthContext)
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<LoginRoute />}>
            <Route path='/login' element={<Login1/>} />
          </Route>
          <Route element={<PrivateRoutes />}>
            <Route path='/'  element={auth?.group === 'manager' ? <Dashbaord /> : <UserDashboard />} >
              <Route index element={<Content />}/>
              <Route path='demande' element={auth?.group === 'manager' ?<Demandes />: <DemandsUser />}/>
              <Route path='calendar' element={< CongeesCalendar />} />
              <Route path='approuver' element={auth?.group === 'manager' ?< Approuver />: <UserApprouver />} />
              <Route path='rejeter' element={auth?.group === 'manager' ?< Rejeter /> : <UserRejeter />} />
              <Route path='pdf' element={<FormPDF/>} />
            </Route>  
            </Route> 
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
