import { Typography } from '@material-ui/core';
import React,{useEffect} from 'react'

const Logout = (props) => {

    useEffect( () => {   
        localStorage.removeItem("currUser");    
        setTimeout(() => {props.history.replace("/login");props.setLoggedIn(false);},2000)      
    },[])
    
    return (
        <div>
            <Typography variant={"h3"} align={"center"} style={{marginTop:'40vh'}}>Logging You Out.......</Typography>
        </div>
    )
}

export default Logout
