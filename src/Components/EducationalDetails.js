import React,{useState,useEffect} from 'react'
import {TableContainer,Table,TableRow,TableHead,TableCell,TableBody,Paper,Grid,Typography, IconButton, TextField,CardActions,Button,Card,CardContent} from '@material-ui/core/';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';
import EducationalDtls from './EditEducationDtls';

const EducationalDetails = () => {

    const [educationalDetails,setEducationalDetails] = useState([]);
    const [showForm,setShowForm] = useState({
      show:false,
      id:0
    });

    useEffect(() => {
            let currUser = JSON.parse(localStorage.getItem("currUser"));
            let detailsGot = JSON.parse(localStorage.getItem("educational detail"+currUser.email));
            let tempArr = []
            for(let detail of detailsGot)
            {
                tempArr.push(detail);
            }
            setEducationalDetails(tempArr);
    
    },[])

    const handleDeleteClick = (id) =>
    {
      let ans = window.confirm("Are You Sure?");
      if(ans)
      {
        let newArr = [...educationalDetails];
      setEducationalDetails(educationalDetails.filter((_,index) => index !== id))
      let ansArr = newArr.filter((_,index) => index !== id);
      let currUser = JSON.parse(localStorage.getItem("currUser"));
      localStorage.setItem("educational detail"+currUser.email,JSON.stringify(ansArr));
      }
      else
      {

      }
    }
    const handleEditClick = (id) =>
    {
      console.log("id came in func"+id);
      setShowForm({show:true,id:id});
      console.log("state id"+showForm.id);
    }

    return (
    showForm.show ? <EducationalDtls id={showForm.id} educationalDetails={educationalDetails} setShowForm={setShowForm} setEducationalDetails={setEducationalDetails}/> :
    <Grid container justify="center" align={"center"} style={{maxWidth:'60vw',margin:'10vh auto'}}>
    <Grid item>
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
            { educationalDetails && educationalDetails.map((eduDetail,index) => (<TableRow key={index}>
              <TableCell align="center"><Typography variant={"h6"}>{eduDetail.instituteName}</Typography></TableCell>
              <TableCell align="center"><Typography variant={"h6"}>{eduDetail.cgpa}</Typography></TableCell>
              <TableCell align="center"><Typography variant={"h6"}>{eduDetail.course}</Typography></TableCell>
              <TableCell align="center"><Typography variant={"h6"}>{eduDetail.startDate}</Typography></TableCell>
              <TableCell align="center"><Typography variant={"h6"}>{eduDetail.endDate}</Typography></TableCell>
              <TableCell align="center"><IconButton onClick={() => handleEditClick(index)}><EditIcon/></IconButton></TableCell>
              <TableCell align="center"><IconButton onClick={() => handleDeleteClick(index)}><DeleteIcon/></IconButton></TableCell>
        </TableRow>))}
        </TableBody>
      </Table>
    </TableContainer>       
    </Grid>
    </Grid>
    )
}

export default EducationalDetails
