import React,{useEffect,useState} from 'react'
import {Paper,Grid,Typography, TextField,Button,Card,CardContent} from '@material-ui/core/';


const EditEducationDtls = ({id,userDetails,setShowForm,setUserDetails,gotObj,email}) => {

    const [currEduDetail,setCurrEduDetail] = useState({
        instituteName:'',
        cgpa:'',
        course:'',
        startDate:'',
        endDate:'',
    });

    const [errorMsgs,setErrorMsgs] = useState({
        cgpaError:'',
        phoneError:'',
        startDateError:'',
    })

    useEffect(()=> {
        console.log("here");
        console.log(gotObj);
        setCurrEduDetail(gotObj)
    },[gotObj]);

    const handleChange = (e) =>
    {
        validate(e);
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
            case 'datestart':
                setCurrEduDetail({...currEduDetail,startDate:e.target.value})
                break;
            case 'dateend':
                setCurrEduDetail({...currEduDetail,endDate:e.target.value})
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
            case 'cgpa':
                checkPercentage(e.target.value);
                break;
            case 'datestart':
                checkStartIsLessThanEnd();
                break;
            case 'dateend':
                checkStartIsLessThanEnd();
                break;
            default:
                console.log("How");
                break;
        }
        
    }

    const checkPercentage = (str) =>
    {
        let x = Number(str);
        console.log(x);
        let tempErrorMsgs = {};
        tempErrorMsgs = {...errorMsgs};
        if ( isNaN(x)  || Number(x) < 0 || Number(x) > 100) {
            tempErrorMsgs.cgpaError = "Value must be between 1-100"
            setErrorMsgs(tempErrorMsgs); 
            }
        else { 
            tempErrorMsgs.cgpaError = ""
            setErrorMsgs(tempErrorMsgs); 
         } 
    }

    const checkStartIsLessThanEnd = () =>
    {
        let startdateval = new Date(document.getElementById("datestart").value);
        let enddateval = new Date(document.getElementById("dateend").value);
        console.log("inside Check start date is - " + startdateval + "end date" + enddateval);
        let tempErrorMsgs = {};
        tempErrorMsgs = {...errorMsgs};

        if(startdateval > enddateval)
        {
            console.log("Inside true")
            tempErrorMsgs.startDateError="Start Date Must be Less Than End Date";
            setErrorMsgs(tempErrorMsgs); 
        }
        else { 
            console.log("Inside false")
            tempErrorMsgs.startDateError="";
            setErrorMsgs(tempErrorMsgs); 
        }
    }

    const handleCancelClick = () =>
    {
        setShowForm(false);
    }


    const handleSubmit = (e) =>
    {
        e.preventDefault();
        let newEduObj = currEduDetail;
        console.log("Got Email" + email + "and ID " + id);
      let userArr = JSON.parse(localStorage.getItem("users"));
      let newUserArr = userArr.filter((user) => user.id === email ? user.educationDetail[id] = newEduObj : user );
      localStorage.setItem("users",JSON.stringify(newUserArr));
     setShowForm(false);
    }

    

    return (
      <Card>
      <CardContent>
        <form onSubmit={handleSubmit}>
            <Paper elevation={20} style={{maxWidth:'55vw',margin:'15px auto',padding:'20px'}}>
            <Typography variant="h5" align="center" color="primary" style={{marginBottom:'20px'}}>Enter Educational Details</Typography>
            <Grid container alignItems="center" justify="center" direction="column" spacing={1} style={{maxWidth:'100vw',marginTop:'2px'}}>
                
                {/* Institute Name */}
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
                        error={errorMsgs.cgpaError.length>1}
                        helperText={errorMsgs.cgpaError}
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
                        name="datestart"
                        id="datestart"
                        label="Start Date"
                        type="date"
                        value={currEduDetail.startDate}
                        onChange={(e) =>handleChange(e)}
                        error={errorMsgs.startDateError.length>1}
                        helperText={errorMsgs.startDateError}
                        InputLabelProps={{
                        shrink: true,
                        }}
                        required style={{width:'25vw'}}
                    />
                </Grid>
                
                {/* End Date */}
                <Grid item>
                    <TextField
                        name="dateend"
                        id="dateend"
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
