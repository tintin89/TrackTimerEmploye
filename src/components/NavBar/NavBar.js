import React from 'react';
import './NavBar.css';
import logo from '../../logo.svg';
import {useSelector,useDispatch} from 'react-redux';
import { logout } from '../../store/actions';
import axios from 'axios';
import moment from 'moment';
import {NavLink} from 'react-router-dom';


const mapState = (globalState)=>({
    userInfo:globalState.userInfo,
    arriving:globalState.arrivingHour
})

function NavBar() {
   
    const {userInfo,arriving} = useSelector(mapState);
    const dispatch = useDispatch();
    return (
        <div className="navBar">
            <NavLink to="/">
            <div className="logo__container">
            <img src={logo} alt="logo" className="logo"/>       
            <span>TRACK TIMER EMPLOYES</span>
            </div>
            </NavLink>
            {userInfo!=="" ? <span 
            onClick={async ()=>{
              if(JSON.parse(localStorage.getItem("isLunching"))===false || (!localStorage.getItem("isLunching"))){
                try {
                    await axios.patch(`https://timertracker-a17c6-default-rtdb.firebaseio.com/employers/${userInfo.localId}/${moment().format("MMM Do YY")}.json`,{
                        workedHours:JSON.parse(localStorage.getItem("employeTimer")).counter,
                        exitingHour:moment().format('LT'),
                        arrivingHour:arriving
                    })
                } catch (error) {
                    console.log(error);
                }
              
               return dispatch(logout());
              }else alert("you must finish the lunch!")
            }} 
            className="log">Log Out</span>
            :
            <NavLink to="/login">
                <span className="log">Log In</span>
            </NavLink>
        }     
        </div>
    )
}

export default NavBar
