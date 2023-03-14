import React from 'react';
import {Routes, Route, } from 'react-router-dom'
import './App.css';
import {Homepage} from "./Page/Home/Homepage";
import {Login} from "./Page/Login/Login";
import ResponsiveAppBar from "./Component/Shared/ResponsiveAppBar";
import {Signup} from "./Page/SignUp/Signup";
import {ControlPanel} from "./Page/ControlPanel/ControlPanel";
import PrivateRoutes from "./Component/Security/PrivateRoutes";

function App() {
    return (
        <div>
            <ResponsiveAppBar/>
            <Routes>
                <Route path='*' element={<Homepage/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/register' element={<Signup/>}/>
                <Route element={<PrivateRoutes/>}>
                    <Route path='/control-panel' element={<ControlPanel/>}/>
                </Route>
            </Routes>
        </div>
    );
}

export default App;