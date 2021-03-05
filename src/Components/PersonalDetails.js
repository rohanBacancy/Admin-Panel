import React,{useEffect,useState} from 'react'
import {TableContainer,Table,TableRow,TableHead,TableCell,TableBody,Paper,Grid,Typography} from '@material-ui/core/';

const PersonalDetails = () => {

    const [userDetail,setUserDetail] = useState({});

    useEffect(() => {
        setUserDetail(JSON.parse(localStorage.getItem("currUser")));
        console.log(userDetail);
    },[])


    return (
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
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow>
              <TableCell align="center"><Typography variant={"h6"}>{userDetail.fname}</Typography></TableCell>
              <TableCell align="center"><Typography variant={"h6"}>{userDetail.lname}</Typography></TableCell>
              <TableCell align="center"><Typography variant={"h6"}>{userDetail.gender}</Typography></TableCell>
              <TableCell align="center"><Typography variant={"h6"}>{userDetail.email}</Typography></TableCell>
              <TableCell align="center"><Typography variant={"h6"}>{userDetail.phone}</Typography></TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    </Grid>
    </Grid>
    )
}

export default PersonalDetails
