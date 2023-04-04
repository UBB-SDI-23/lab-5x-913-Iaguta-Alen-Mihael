import logo from './logo.svg';
import './App.css';

import {Home} from  './Home';
import {Navigation} from './Navigation';
import {Player} from './Player/Player';
import {Tournament} from './Tournament/Tournament';
import {Champion} from './Champion/Champion';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
 

function App() {
  return (
    <BrowserRouter>
    <div className="container">
      <h3 className="m-3 d-flex justify-content-center">
        Chess SDI
      </h3>
    
    <Navigation/>
    
    <Routes>
      <Route path='/' Component={Home} exact/>
      <Route path='/players' Component={Player} />
      <Route path='/champions' Component={Champion} />
      <Route path='/tournaments' Component={Tournament} />
    </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
