import React ,{useState} from 'react'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import './Loginfrm.css';
import { Button, Paper, TextField } from '@material-ui/core';
import {Route,Link} from 'react-router-dom';

const Loginfrm = (props) => {

    const [email,setEmail] = useState("");
    const [pass,setPass] = useState("");

    const handleSubmit = (e) => 
    {
        e.preventDefault();
        if(localStorage.getItem("userDetail" + email) == null)
        {
            alert("User Doesn't Exist , Please Register");
        }
        else{
        let emailMatchUser = JSON.parse(localStorage.getItem("userDetail" + email));
        
        
        //set currUser and UserDetail+email
        if(email == emailMatchUser.email && pass == emailMatchUser.password)
        {
            props.setLoggedIn(true);
            alert("Successfully LoggedIn");
            localStorage.setItem("currUser",JSON.stringify(emailMatchUser));
            props.history.push("/home");
        }
        else
        {
            alert("Invalid Credentials")
        }
        }
    }

    const handleChange = (e) => 
    {
        if(e.target.name === "email")
        {
            setEmail(e.target.value);
        }
        else if(e.target.name === "password")
        {
            setPass(e.target.value);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <Paper elevation={20} style={{maxWidth:'55vw',margin:'80px auto',padding:'20px'}}>
            <Typography variant="h5" align="center" color="primary">Signin Form</Typography>
            <Grid container alignItems="center" justify="center" direction="column" spacing={2} style={{maxWidth:'100vw',marginTop:'2px'}}>
                <Grid item><TextField name="email" onChange={handleChange} value={email} label="Email ID" type="email" required style={{width:'25vw'}}></TextField></Grid>
                <Grid item><TextField name="password" onChange={handleChange} value={pass} label="Password" type="password" required style={{width:'25vw'}}></TextField></Grid>
                <Button type="sumit" color="primary" variant="contained" style={{marginTop:'25px',width:'25vw'}}>Log In</Button>
                <Grid item style={{marginTop:'22px'}}><Typography>Don't have an account! <Link to="/registration">Register Now.</Link></Typography></Grid>
            </Grid>
            </Paper>
        </form>        
    )
}

export default Loginfrm
