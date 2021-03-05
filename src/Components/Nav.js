import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';

const Nav = ( {loggedIn,registering} ) => {
    return (
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" style={{flex:1}}>
                    Admin
                    </Typography>
                    { loggedIn && <Link style={{textDecoration:'none',color:'white'}} to="/personaldetails"><Button color="inherit">Personal Detail</Button></Link>}
                    {loggedIn && <Link style={{textDecoration:'none',color:'white'}} to="/educationaldetails"><Button color="inherit">Educational Detail</Button></Link>}
                    {loggedIn ? <Link style={{textDecoration:'none',color:'white'}} to="/logout"><Button color="inherit">Logout</Button></Link>
                    : (!registering && <Link to="/login" style={{textDecoration:'none',color:'white'}}><Button color="inherit">Login</Button></Link>)}
                </Toolbar>
            </AppBar>
        
    )
}

export default Nav
