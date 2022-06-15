import React from 'react';
import ReactDOM from 'react-dom/client';
import './Styles/index.css';
import Comp from './Comp';
import { HashRouter, Routes, Route, Link } from "react-router-dom";
import RoutineDisplay from './Components/RoutinePage/RoutineDisplay';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path='/' element={<Comp />}/>
        <Route path='/disprout' element={<RoutineDisplay/>}/>
      </Routes>
    </HashRouter>
  </React.StrictMode>
);
