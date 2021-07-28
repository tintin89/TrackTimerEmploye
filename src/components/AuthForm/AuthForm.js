import React,{useState} from 'react';
import './AuthForm.css';
import {useSelector,useDispatch} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {sign,updateErrorM} from '../../store/actions';
import LabelMessage from '../LabelMessage/LabelMessage';
import Loader from '../Loader/Loader';


const mapState = (globalState)=>({
    userInfo:globalState.userInfo,
    errorM:globalState.errorM,
    loading:globalState.isloading
})

function AuthForm() {
    const dispatch = useDispatch();
    const {userInfo,errorM,loading} = useSelector(mapState);
    const[form,setForm] = React.useState({user:"",password:""});
    const [passwordConfirm,setPasswordConfirm] = useState("");
    const [register,setRegister] = useState(false);
   
    

    const handleSubmit = e =>{
        e.preventDefault();
        if(form.user===""||form.password===""){
            dispatch(updateErrorM("Empty Fields!"));
            return;
        }
        if(register){
        if(passwordConfirm===form.password){
           dispatch(sign(form.user,form.password,register));
        }else{
            dispatch(updateErrorM("Passwords don't match"));
        }

        }else{
           dispatch(sign(form.user,form.password,register));
        }

    }

    let redireccionar=null;
    if(userInfo!==""){
         redireccionar=<Redirect exact to="/dashboard"/>
        }

    return (
        <>
        {redireccionar}
        {
            loading ? <Loader/> :
            <form className="formAuth" onSubmit={handleSubmit}>
            <div className="formAuth__field">
            <label htmlFor="email">User</label>
            <input
             value={form.user} 
             onChange={e=>{             
                 setForm({...form,user:e.target.value});
                 if(errorM!==""){
                     dispatch(updateErrorM(""));
                 }
             }} 
             type="email" 
             placeholder="user@example.com" 
             id="email"/>                
            </div>
            <div className="formAuth__field">
                  <label htmlFor="password">Password</label>
                  <input
                  value={form.password}
                  onChange={e=>{
                     setForm({...form,password:e.target.value})
                     if(errorM!==""){
                        dispatch(updateErrorM(""));
                    }
                  }}
                   type="password" 
                   placeholder="Enter your password" 
                   id="password"/>
                  </div>
                {
                    register &&
                    <div className="formAuth__field">
               <label htmlFor="password">Confirm Password</label>
                <input
                  value={passwordConfirm}
                  onChange={e=>{
                     setPasswordConfirm(e.target.value);
                     if(errorM!==""){
                        dispatch(updateErrorM(""));
                    }
                  }}
                   type="password" 
                   placeholder="Confirm your password" 
                   id="password"/>
                  </div>  
                } 
    
                {errorM!=="" && <LabelMessage message={errorM}/>}
    
            <button  type="submit">{register ? "SIGN UP" : "SIGN IN"}</button>   
            <div onClick={()=>setRegister(prevState=>!prevState)} className="formAuth__register">{register ? "Back" : "Register Here"}</div>         
           </form>    
        }
       </>     
    )
}

export default AuthForm
