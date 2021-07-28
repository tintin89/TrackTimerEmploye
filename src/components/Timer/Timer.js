import React,{useState,useEffect} from 'react';
import './Timer.css'
import axios from 'axios';
import {useSelector} from 'react-redux';
import moment from 'moment'


const mapState = (globalState)=>({
    userInfo:globalState.userInfo,
    userData:globalState.userData
})


function Timer() {  
    const {userInfo,userData} = useSelector(mapState);  
    const [isLunching,setisLunching] = useState(localStorage.getItem('isLunching') ? JSON.parse(localStorage.getItem('isLunching')) : false);  
    const [employeTimer,setEmployeTimer] = useState(localStorage.getItem('employeTimer') ? JSON.parse(localStorage.getItem('employeTimer')) : {
        second:'00',
        minute:'00',
        hours:'00',
        counter:0
    });

    
  

    useEffect(()=>{
      let intervalId;
       if(!isLunching){      
        if(localStorage.getItem("existCounter")){
            localStorage.removeItem("existCounter");
            setEmployeTimer({...employeTimer,counter:userData})
        }

        intervalId = setInterval(()=>{
          
            const hours = Math.floor((employeTimer.counter/(60*60)));
            const minutes = Math.floor((employeTimer.counter/60)%60);
            const seconds = employeTimer.counter%60;
            const formatedHours = String(hours).length === 1 ? `0${hours}` : hours;
            const formatedSecond = String(seconds).length === 1 ? `0${seconds}`: seconds;
            const formatedMinute = String(minutes).length === 1 ? `0${minutes}`: minutes;
           
           setEmployeTimer(prevState=>({
                second:formatedSecond,
                minute:formatedMinute,
                hours:formatedHours,
                counter:prevState.counter +1
            }));
            localStorage.setItem("employeTimer",JSON.stringify(employeTimer));
        
        },1000)      
       }
       return ()=>{
            
          return clearInterval(intervalId)
        };

    },[employeTimer,isLunching,userData])



    const handleLunch = async () =>{    
        if(isLunching){    
        
       try {
             await axios.put(`https://timertracker-a17c6-default-rtdb.firebaseio.com/employers/${userInfo.localId}/${moment().format("MMM Do YY")}/lunchBreaks/${localStorage.getItem("lunchBStart")}.json`,{
               finishLunch:moment().format('LTS')
               })                 
          } catch (error) {
              console.log(error)
          }     

         setisLunching(false);
         localStorage.setItem("isLunching",false);  
         localStorage.removeItem("lunchBStart");     
        }else{
            setisLunching(true);
            localStorage.setItem("isLunching",true);
            localStorage.setItem("lunchBStart",moment().format('LTS'))
        } 
         
        }

    return (
         <>
       <div className="timer__container">
            <div className="timer">
            <span>{employeTimer.hours}:</span>
            <span>{employeTimer.minute}:</span>
            <span>{employeTimer.second}</span>
            </div>
            <div className="timer__line"></div>
            <span className="expectedHours">Expected Working Hours: 8hrs</span>            
        </div>
         <div onClick={()=>handleLunch()} className="lunchTime">
         {isLunching ? "Finish Lunch" : "Go to Lunch"}
     </div>
         </>
    )
}

export default Timer
