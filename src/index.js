import React from 'react';
import ReactDOM from 'react-dom/client';
import './Styles/index.css';
import Comp from './Comp';
import { BrowserRouter ,Routes, Route} from "react-router-dom";
import RoutineExecPage from './RoutineExecPage';
const root = ReactDOM.createRoot(document.getElementById('root'));



root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Comp />}/>
        <Route path='/disprout' element={<RoutineExecPage/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
