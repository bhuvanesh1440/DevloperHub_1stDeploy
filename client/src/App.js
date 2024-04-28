import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeComponent from './Home';
import Login from './Login';
import Nav from './Nav';
import Register from './Register';
import Dashboard from './Dashboard';
import Myprofile from './Myprofile';
import Individual from './Individual';
function App() {
  return (
    <div>
      
      <BrowserRouter>
      {/* <Nav></Nav> */}
      <Routes>
        <Route exact path="/"  Component={HomeComponent} />
        <Route exact path="/login" Component={Login}></Route>
        <Route exact path="/register" Component={Register}></Route>
        <Route exact path='/dashboard' Component={Dashboard}></Route>
        <Route exact path='/myprofile' Component={Myprofile}/>
        <Route exact path='/individual/:fullname/:email/:skill/:id' Component={Individual}/>
      </Routes>
      
      </BrowserRouter>
      
    </div>
  );
}

export default App;
