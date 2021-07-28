import { BrowserRouter } from "react-router-dom";
import { Route, Switch } from "react-router";
import Home from './pages/Home/Home';
import Dashboard from './pages/Dashboard/Dashboard';
import NavBar from './components/NavBar/NavBar';
import './App.css'
import VerifyAuth from "./Hoc/VerifyAuth";
import Login from './pages/Home/Login'



function App() {



  return (
    <div className="app">
       
         <BrowserRouter>
         <NavBar/>  
        <Switch>
        <Route path="/dashboard" render={()=>( 
          <VerifyAuth>
            <Dashboard/>
          </VerifyAuth>           
          )}/>   

         <Route path="/login" render={()=>(      
            <Login/>
          )}/>  

        <Route path="/" render={()=>(      
            <Home/>
          )}/>          
      </Switch>
      </BrowserRouter>
       </div>
  );
}

export default App;
