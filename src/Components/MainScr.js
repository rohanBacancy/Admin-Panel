import React,{useState,useEffect} from 'react'
import Typography from '@material-ui/core/Typography';

const MainScr = ( {nonloginattempt} ) => {
    const [uname,setUname] = useState("");
    useEffect(() => {
        setUname(JSON.parse(localStorage.getItem("currUser")).fname);
    },[])
    return (
        <div>
           { uname && <Typography align="center" variant="h4" justify="center" style={{marginTop:'30vh'}}>You are logged in as {uname}</Typography>}
           { nonloginattempt && <Typography align="center" variant="h4" justify="center" style={{marginTop:'30vh'}}>Please Login First</Typography>}
        </div>
    )
}

export default MainScr
