import React,{useState,useEffect} from 'react'
import {TableContainer,Table,TableRow,TableHead,TableCell,TableBody,Paper,Grid,Typography, IconButton} from '@material-ui/core/';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';
import EducationalDtls from './EditEducationDtls';

const EducationalDetails = () => {

    const [userDetails,setUserDetails] = useState([]);
    const [showForm,setShowForm] = useState({
      show:false,
      id:0,
      passObj:{},
      eamil:''
    });

    useEffect(() => {
            // let currUser = JSON.parse(localStorage.getItem("currUser"));
            // let detailsGot = JSON.parse(localStorage.getItem("educational detail"+currUser.email));
            let tempArr = [];
            let usersArr = [];
            if(localStorage.getItem("users"))
            {
                usersArr = JSON.parse(localStorage.getItem("users"));
            }
            for(let user of usersArr)
            {
                tempArr.push({key:user.id,eduDetail:user.educationDetail});
            }
            console.log(tempArr[0])
            setUserDetails(tempArr);
    
    },[showForm])

    const handleDeleteClick = (email,id) =>
    {
      let ans = window.confirm("Are You Sure ?");
      if(ans)
      {
      console.log("Got Email" + email + "and ID " + id);
      let userArr = JSON.parse(localStorage.getItem("users"));
      let newUserArr = userArr.filter((user) => user.id === email ? user.educationDetail.splice(id,1) : user );
      localStorage.setItem("users",JSON.stringify(newUserArr));

      let tempArr = [];
            
            for(let user of newUserArr)
            {
                tempArr.push({key:user.id,eduDetail:user.educationDetail});
            }
            console.log(tempArr[0])
            setUserDetails(tempArr);
      }
      else
      {

      }
    }
    const handleEditClick = (emailt,index,passObjp) =>
    {
      console.log("id came in func"+index);
      console.log(passObjp);
      setShowForm({show:true,id:index,passObj:passObjp,email:emailt});
      console.log("state id"+showForm.index);
    }

    return (
    showForm.show ? <EducationalDtls id={showForm.id}  userDetails={userDetails} setShowForm={setShowForm} setUserDetails={setUserDetails} gotObj={showForm.passObj} email={showForm.email}/> :
    <Grid container justify="center" align={"center"} style={{maxWidth:'60vw',margin:'2vh auto'}}>
    
    {userDetails.map((user,index) => (<Grid item>
      <h4>{user.key}</h4>
    <TableContainer style={{width:'80vw',margin:'10px'}} component={Paper}>
      <Table align="center" justify="center" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center"><Typography color="primary" variant={"h5"}>InstituteName</Typography></TableCell>
            <TableCell align="center"><Typography color="primary" variant={"h5"}>Cgpa</Typography></TableCell>
            <TableCell align="center"><Typography color="primary" variant={"h5"}>Course</Typography></TableCell>
            <TableCell align="center"><Typography color="primary" variant={"h5"}>Startdate</Typography></TableCell>
            <TableCell align="center"><Typography color="primary" variant={"h5"}>Enddate</Typography></TableCell>
            <TableCell align="center"><Typography color="primary" variant={"h5"}>Edit</Typography></TableCell>
            <TableCell align="center"><Typography color="primary" variant={"h5"}>Delete</Typography></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
              {user.eduDetail.map((eduDtl,index) => (
              <TableRow key={index}>
              <TableCell align="center"><Typography variant={"h6"}>{eduDtl.instituteName}</Typography></TableCell>
              <TableCell align="center"><Typography variant={"h6"}>{eduDtl.cgpa}</Typography></TableCell>
              <TableCell align="center"><Typography variant={"h6"}>{eduDtl.course}</Typography></TableCell>
              <TableCell align="center"><Typography variant={"h6"}>{eduDtl.startDate}</Typography></TableCell>
              <TableCell align="center"><Typography variant={"h6"}>{eduDtl.endDate}</Typography></TableCell>
              <TableCell align="center"><IconButton onClick={() => handleEditClick(user.key,index,eduDtl)}><EditIcon/></IconButton></TableCell>
              <TableCell align="center"><IconButton onClick={() => handleDeleteClick(user.key,index)}><DeleteIcon/></IconButton></TableCell>
              </TableRow>
              ))
              }
        </TableBody>
      </Table>
    </TableContainer>       
    </Grid>))
      }

    </Grid>
    )
}

export default EducationalDetails
