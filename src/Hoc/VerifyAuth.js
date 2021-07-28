import {useEffect} from 'react'
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';


const mapState = (globalState) =>({
    userInfo:globalState.userInfo
});

const VerifyAuth = props =>{
    const {userInfo} = useSelector(mapState);
    const history=useHistory();

    useEffect(()=>{
        if(userInfo===""){
            history.push('/')
        }
    },[userInfo,history])

    return props.children;
}

export default VerifyAuth;