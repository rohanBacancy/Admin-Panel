import React,{useEffect,useState} from 'react'
import {Button,TextField,TableContainer,Table,TableRow,TableHead,TableCell,TableBody,Paper,Grid,Typography, IconButton} from '@material-ui/core/';
import UpdateIcon from '@material-ui/icons/Update';


const PersonalDetails = () => {

    const [usersDetail,setUsersDetail] = useState([]);
    const [showForm,setShowForm] = useState(false);
    const [formVals,setFormVals] = useState(
      {
        oldpass:'',
        newPass:'',
        confirmPass:''
      }
    )
    const [flagVals,setFlagVals] = useState(
      {
        email:'',
        oldPass:''
      }
    );
    const [errorMsgs,setErrorMsgs] = useState({
      oldpassError:'',
      newPassErr:'',
      confirmPassErr:''
    })

    useEffect(() => {
        setUsersDetail(JSON.parse(localStorage.getItem("users")));
        console.log(usersDetail);
    },[])


    const handleChangePass = ( email,oldp ) => 
    {
      setFlagVals({email:email,oldPass:oldp});
      setShowForm(true);
    }

    const handleSubmit = (e) =>
    {
      e.preventDefault();
      if(formVals.oldpass === flagVals.oldPass)
      {
      let userArr = JSON.parse(localStorage.getItem("users"));
      let newUserArr = userArr.filter((user) => user.id === flagVals.email ? user.userInfo.password = formVals.newPass : user );
      localStorage.setItem("users",JSON.stringify(newUserArr));
      alert("Password Updated Successfully");
      setShowForm(false);
      }
      else
      {
        alert("Old Password isn't valid")
      }
    }

    const handleChange = (e) => 
    {
        validate(e);
        switch(e.target.name)
        {
            case 'opass':
                setFormVals({...formVals,oldpass:e.target.value});
                break;
            case 'npass':
                setFormVals({...formVals,newPass:e.target.value});
                break;
            case 'cpass':
                setFormVals({...formVals,confirmPass:e.target.value});
                break;
            default:
                console.log("How");
                break;
        }
    }

    const validate = (e) =>
    {
        switch(e.target.name)
        {
            case 'opass':
                e.target.value == '' ? setErrorMsgs({...errorMsgs,oldpassError:"It is Required"}) : setErrorMsgs({...errorMsgs,oldpassError:""}) ;
                break;
            case 'npass':
                e.target.value == '' ? setErrorMsgs({...errorMsgs,newPassErr:"It is Required"}) : setErrorMsgs({...errorMsgs,newPassErr:""}) ;
                break;
            case 'cpass':
                if(!(e.target.value == formVals.newPass)) setErrorMsgs({...errorMsgs,confirmPassErr:"Password & ConfirmPass Should Match"}); else setErrorMsgs({...errorMsgs,confirmPassErr:""});
                console.log(errorMsgs);     
                break;
            default:
                console.log("How");
                break;
        }
        
    }

    const formIs = (
          <form onSubmit={handleSubmit}>
            <Paper elevation={20} style={{maxWidth:'55vw',margin:'15px auto',padding:'20px'}}>
            <Typography variant="h5" align="center" color="primary">Change Password</Typography>
            <Grid container alignItems="center" justify="center" direction="column" spacing={1} style={{maxWidth:'100vw',marginTop:'2px'}}>
                {/* Old Pass */}
                <Grid item><TextField
                 error={errorMsgs.oldpassError.length>1}
                  helperText={errorMsgs.oldpassError}
                   value={formVals.oldpass}
                    name="opass" onChange={handleChange}
                     label="Old Password"
                      type="password"
                       required style={{width:'25vw'}}></TextField></Grid>
                 {/* New Pass */}
                <Grid item><TextField
                 error={errorMsgs.newPassErr.length>1}
                  helperText={errorMsgs.newPassErr}
                   value={formVals.newPass}
                    name="npass" onChange={handleChange}
                     label="New Password"
                      type="password"
                       required style={{width:'25vw'}}></TextField></Grid>
                       {/* Confirm New Pass */}
                <Grid item><TextField
                 error={errorMsgs.confirmPassErr.length>1}
                  helperText={errorMsgs.confirmPassErr}
                   value={formVals.confirmPass}
                    name="cpass" onChange={handleChange}
                     label="Confirm Password"
                      type="password"
                       required style={{width:'25vw'}}></TextField></Grid>
                <Grid container direction="row" alignItems="center" justify="center" spacing={2} style={{marginBottom:'10px'}}>
                <Grid item><Button type="submit" color="primary" variant="contained" style={{marginTop:'25px',width:'100%'}}>Update</Button></Grid>
                <Grid item><Button onClick={() => {setShowForm(false)}} color="primary" variant="contained" style={{marginTop:'25px',width:'100%'}}>Cancel</Button></Grid>
                </Grid>
            </Grid>
            </Paper>
        </form>      
    );

    return (
      showForm ? formIs : 
    <Grid container justify="center" align={"center"} style={{maxWidth:'60vw',margin:'20vh auto'}}>
    <Grid item>
    <TableContainer component={Paper}>
      <Table align="center" justify="center" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center"><Typography color="primary" variant={"h5"}>First Name</Typography></TableCell>
            <TableCell align="center"><Typography color="primary" variant={"h5"}>Last Name</Typography></TableCell>
            <TableCell align="center"><Typography color="primary" variant={"h5"}>Gender</Typography></TableCell>
            <TableCell align="center"><Typography color="primary" variant={"h5"}>Email</Typography></TableCell>
            <TableCell align="center"><Typography color="primary" variant={"h5"}>Phone No</Typography></TableCell>
            <TableCell align="center"><Typography color="primary" variant={"h5"}>Action</Typography></TableCell>         
          </TableRow>
        </TableHead>
        <TableBody>
          {
            usersDetail.map( (usr,index) => 
            <TableRow key={usr.id}>
              <TableCell align="center"><Typography variant={"h6"}>{usr.userInfo.fname}</Typography></TableCell>
              <TableCell align="center"><Typography variant={"h6"}>{usr.userInfo.lname}</Typography></TableCell>
              <TableCell align="center"><Typography variant={"h6"}>{usr.userInfo.gender}</Typography></TableCell>
              <TableCell align="center"><Typography variant={"h6"}>{usr.userInfo.email}</Typography></TableCell>
              <TableCell align="center"><Typography variant={"h6"}>{usr.userInfo.phone}</Typography></TableCell>
              <TableCell align="center"><Typography color="primary" variant={"h5"}><IconButton onClick={() => {handleChangePass(usr.id,usr.userInfo.password)}}><UpdateIcon/></IconButton></Typography></TableCell>
            </TableRow>) 
            
          }

        </TableBody>
      </Table>
    </TableContainer>
    </Grid>
    </Grid>
    )
}

export default PersonalDetails
