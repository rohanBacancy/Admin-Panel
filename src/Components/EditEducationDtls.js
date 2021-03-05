import React,{useEffect,useState} from 'react'
import {Paper,Grid,Typography, TextField,Button,Card,CardContent} from '@material-ui/core/';


const EditEducationDtls = ({id,educationalDetails,setShowForm,setEducationalDetails}) => {

    const [currEduDetail,setCurrEduDetail] = useState({
        instituteName:'',
        cgpa:'',
        course:'',
        startDate:'2016-06-24',
        endDate:'2021-06-24',
    });

    useEffect(()=> {
        setCurrEduDetail(educationalDetails[id])
    },[educationalDetails[id]]);

    const handleCancelClick = () =>
    {
        setShowForm(false);
    }


    const handleSubmit = (e) =>
    {
        e.preventDefault();
        console.log(currEduDetail);
        let currUser = JSON.parse(localStorage.getItem("currUser"));
        let arrayGot = JSON.parse(localStorage.getItem("educational detail"+currUser.email));
        arrayGot[id] = currEduDetail;
        setEducationalDetails(arrayGot);
        localStorage.setItem("educational detail"+currUser.email,JSON.stringify(arrayGot));
        setShowForm(false);
    }

    const handleChange = (e) =>
    {
        switch(e.target.name)
        {
            case 'institute':
                setCurrEduDetail({...currEduDetail,instituteName:e.target.value}) 
                break;
            case 'cgpa':
                setCurrEduDetail({...currEduDetail,cgpa:e.target.value})
                break;
            case 'course':
                setCurrEduDetail({...currEduDetail,course:e.target.value})
                break;
            case 'startdate':
                setCurrEduDetail({...currEduDetail,startDate:e.target.value})
                break;
            case 'enddate':
                setCurrEduDetail({...currEduDetail,endDate:e.target.value})
                break;
            default:
                console.log("How");
                break;
        }
    }



    return (
      <Card>
      <CardContent>
        <form onSubmit={handleSubmit}>
            <Paper elevation={20} style={{maxWidth:'55vw',margin:'15px auto',padding:'20px'}}>
            <Typography variant="h5" align="center" color="primary" style={{marginBottom:'20px'}}>Enter Educational Details</Typography>
            <Grid container alignItems="center" justify="center" direction="column" spacing={1} style={{maxWidth:'100vw',marginTop:'2px'}}>
                
                <Grid item>
                    <TextField
                       name="institute"
                        label="Institute Name"
                        value={currEduDetail.instituteName}
                            onChange={(e) =>handleChange(e)}
                         required style={{width:'25vw'}}></TextField></Grid>
                {/* CGPA/Percentage Name */}
                <Grid item><TextField
                   name="cgpa"
                    label="CGPA/Percentage"
                    value={currEduDetail.cgpa}
                        onChange={(e) =>handleChange(e)}
                     required style={{width:'25vw'}}></TextField></Grid>
                {/* Course Name */}
                <Grid item><TextField
                  name="course"
                    label="Course Name"
                    value={currEduDetail.course}
                            onChange={(e) =>handleChange(e)}
                     required style={{width:'25vw'}}></TextField></Grid>
                
                {/* Start Date */}
                <Grid item>
                    <TextField
                        name="startdate"
                        label="Start Date"
                        type="date"
                        value={currEduDetail.startDate}
                        onChange={(e) =>handleChange(e)}
                        InputLabelProps={{
                        shrink: true,
                        }}
                        required style={{width:'25vw'}}
                    />
                </Grid>
                
                {/* End Date */}
                <Grid item>
                    <TextField
                        name="enddate"
                        label="End Date"
                        type="date"
                        value={currEduDetail.endDate}
                        onChange={(e) =>handleChange(e)}
                        InputLabelProps={{
                        shrink: true,
                        }}
                        required style={{width:'25vw'}}
                    />
                </Grid>                
            <Button type="submit" color="primary" variant="contained" style={{marginTop:'25px',width:'25vw'}}>Update</Button>
            <Button onClick={handleCancelClick} color="primary" variant="contained" style={{marginTop:'25px',width:'25vw'}}>Cancel</Button>
            </Grid>
            </Paper>
        </form>
      </CardContent>
    </Card>
    )
}

export default EditEducationDtls
