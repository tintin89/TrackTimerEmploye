import React,{useState,useEffect} from 'react';
import './Employers.css';
import axios from 'axios';
import {formatCount} from '../../utility';

function EMployers() {
    const [employers,setEmployers] = useState([]);
    const [logs,setLogs] = useState([]);


    const handleShowBreak=(lunchB)=>{
      const temp=[];
       for(let e in lunchB){         
        
         temp.push(<span key={e}>{e+"-"+lunchB[e].finishLunch}</span>)
       }
       return temp
    }

  useEffect(() => {
      axios.get(`https://timertracker-a17c6-default-rtdb.firebaseio.com/employers.json`)
      .then(response=>{
       const tempL = [];
       const tempE = [];
       
      for(let keyE in response.data){     
        tempE.push(response.data[keyE].email);
        for(let key in response.data[keyE]){
          if(key!=="email"){
            tempL.push({
              ...response.data[keyE][key],
              date:key,
              email:response.data[keyE].email
            }) 
            }
           
         }
         
      }
    
      setEmployers(tempE);
      
      setLogs(tempL);
         
      })
   
      
      .catch(error=>console.log(error))
  }, [])


    return <div className="resultsEmployes">
      {
        employers.map(e=>{
          return <table key={e}>
          <caption><span style={{color:"#69b2c7"}}>Employe:</span> {e}</caption>
          <thead>
            <tr>          
              <th scope="col">Date</th>
              <th scope="col">Arriving</th>
              <th scope="col">Exiting</th>
              <th scope="col">Worked Hours</th>
              <th scope="col">Lunch Breaks</th>
            </tr>
          </thead>
          <tbody>
              {
                  logs.map((l,index)=>{
                    const timerE = formatCount(l.workedHours);
                     if(l.email===e){
                      return   <tr key={index}>                        
                      <td data-label="Date">{l.date}</td>
                      <td data-label="Arriving">{l.arrivingHour}</td>
                      <td data-label="Exiting">{l.exitingHour}</td>
                      <td data-label="Worked Hours">{timerE.formatedHours+":"+timerE.formatedMinute+":"+timerE.formatedSecond}</td>
                      <td data-label="Lunch Breaks">
                        <div style={{fontSize:"0.7rem",display:"flex",flexFlow:"column"}}>
                          {handleShowBreak(l.lunchBreaks)}
                        </div>
                      </td>
                  </tr>
                     } else return null
                  })
              }
           
         
          </tbody>
        </table>
        })
      }
    </div>
    
    
}

export default EMployers
