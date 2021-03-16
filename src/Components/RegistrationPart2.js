import React,{useState} from 'react'
import { Typography,Grid,Button, Paper, TextField,Select,MenuItem, } from '@material-ui/core';

const RegistrationPart2 = (props) => {

    const [educationDetails,setEducationDetails] = useState([{
        instituteName:'',
        cgpa:'',
        course:'',
        startDate:'',
        endDate:'',
    },]);

    const [errorMsgs,setErrorMsgs] = useState([{
        cgpaError:'',
        phoneError:'',
        startDateError:'',
    },])

    const handleSubmit = (e) =>
    {
        e.preventDefault();

        //Calculate sum of length of every error message
        let sum=0;
        for(let msg of errorMsgs)
        {
            for(let insmsg in msg)
            {
                    sum+=msg[insmsg].length;    
            }
            
        }

        if(sum==0) //if all error meessages are null means no error in form inputs
        {
            console.log(educationDetails);
            let currUser = JSON.parse(localStorage.getItem("currUser"));
            let usersArr = [];
            let storeObj = {id:currUser.email,userInfo:currUser,educationDetail:educationDetails};
            if(localStorage.getItem("users"))
            {
                usersArr = JSON.parse(localStorage.getItem("users"));
                
                //Replace Object within Array Of Object
                //Placing Educational Details of perticular user in the users array
                let newList = [];
                usersArr.forEach(function (item)
                {
                    if (item.id === currUser.email) {
                        newList.push(storeObj);
                    }
                    else { newList.push(item); }
                });

            console.log(newList);
            localStorage.setItem("users",JSON.stringify(newList));
            }
            localStorage.setItem("educational detail"+currUser.email, JSON.stringify(educationDetails));
            props.history.push("/login");
            alert("Registed Successfully");
            props.setRegistering(false); 
            localStorage.removeItem("currUserForRegisterForm");   
        }

        else //Form contains errors
        {
            console.log(sum);
            alert("Any on of the Field Contains Invalid Input")
        }
    }

    const handleChange = (index,e) =>
    {
        validate(e,index);
        let temp;
        switch(e.target.name)
        {
            case 'institute':
                temp = [...educationDetails];
                temp[index]["instituteName"] = e.target.value;
                setEducationDetails(temp); 
                break;
            case 'cgpa':
                temp = [...educationDetails];
                temp[index]["cgpa"] = e.target.value;
                setEducationDetails(temp);
                break;
            case 'course':
                temp = [...educationDetails];
                temp[index]["course"] = e.target.value;
                setEducationDetails(temp);
                break;
            case 'startdate':
                temp = [...educationDetails];
                temp[index]["startDate"] = e.target.value;
                setEducationDetails(temp);
                break;
            case 'enddate':
                temp = [...educationDetails];
                temp[index]["endDate"] = e.target.value;
                setEducationDetails(temp);
                break;
            default:
                console.log("How");
                break;
        }
    }

    const validate = (e,index) =>
    {
        switch(e.target.name)
        {
            case 'cgpa':
                checkPercentage(e.target.value,index);
                break;
            case 'startdate':
                checkStartIsLessThanEnd(index);
                break;
            case 'enddate':
                checkStartIsLessThanEnd(index);
                break;
            default:
                console.log("How");
                break;
        }
        
    }

    const checkPercentage = (str,index) =>
    {
        let x = Number(str);
        console.log(x);
        let tempErrorMsgs = [];
        tempErrorMsgs = [...errorMsgs];
        if ( isNaN(x)  || Number(x) < 0 || Number(x) > 100) {
            tempErrorMsgs[index].cgpaError="Value must be between 0-100";
             setErrorMsgs(tempErrorMsgs); 
            }
        else { 
            tempErrorMsgs[index].cgpaError="";
             setErrorMsgs(tempErrorMsgs); 
         } 
    }

    const checkStartIsLessThanEnd = (index) =>
    {
        let startdateval = new Date(document.getElementById("datestart" + index).value);
        let enddateval = new Date(document.getElementById("dateend" +  + index).value);
        console.log("inside Check start date is - " + startdateval + "end date" + enddateval);
        let tempErrorMsgs = [];
        tempErrorMsgs = [...errorMsgs];

        if(startdateval > enddateval)
        {
            console.log("Inside true")
            tempErrorMsgs[index].startDateError="Start Date Must be Less Than End Date";
            setErrorMsgs(tempErrorMsgs); 
        }
        else { 
            console.log("Inside false")
            tempErrorMsgs[index].startDateError="";
             setErrorMsgs(tempErrorMsgs); 
        }
    }
    

    const addNewForm = () => // Add new object in state array with all fields null to render an extra form
    {
        setEducationDetails([...educationDetails,{instituteName:'',cgpa:'',course:'',startDate:'2016-06-24',endDate:'2021-06-24',}])
        setErrorMsgs([...errorMsgs,{
        cgpaError:'',
        phoneError:'',
        startDateError:'',
    }])
    }

    const removeForm = (id) => //if form is removed added data into that form should be removed so it doesn't get added
    {
        if(educationDetails.length>1)
        {
        setEducationDetails( educationDetails.filter((_,index) => index!==id ))
        setErrorMsgs(errorMsgs.filter((_,index) => index!==id ))
        }
        else
        {
            alert("You have to enter atleast 1 Education Detail")
        }
    }

    const acedamicDetailFrm = (eduDetail,index) => (
        <div key={index}>
        {/* Institute/School Name */}
                <Grid item>
                    <TextField
                    value={eduDetail.instituteName}
                      onChange={(e) =>handleChange(index,e)}
                       name="institute"
                        label="Institute Name"
                         required style={{width:'25vw'}}></TextField></Grid>
                {/* CGPA/Percentage Name */}
                <Grid item><TextField
                 value={eduDetail.cgpa}
                  onChange={(e) =>handleChange(index,e)}
                  error={errorMsgs[index].cgpaError}
                  helperText={errorMsgs[index].cgpaError}
                   name="cgpa"
                    label="CGPA/Percentage"
                     required style={{width:'25vw'}}></TextField></Grid>
                {/* Course Name */}
                <Grid item><TextField
                 value={eduDetail.course}
                  onChange={(e) =>handleChange(index,e)}
                   name="course"
                    label="Course Name"
                     required style={{width:'25vw'}}></TextField></Grid>
                
                {/* Start Date */}
                <Grid item>
                    <TextField
                        value={eduDetail.startDate}
                        onChange={(e) =>handleChange(index,e)}
                        error={errorMsgs[index].startDateError}
                        helperText={errorMsgs[index].startDateError}
                        name="startdate"
                        id={"datestart" + index}
                        label="Start Date"
                        type="date"
                        InputLabelProps={{
                        shrink: true,
                        }}
                        required style={{width:'25vw'}}
                    />
                </Grid>
                
                {/* End Date */}
                <Grid item>
                    <TextField
                        value={eduDetail.endDate}
                        onChange={(e) =>handleChange(index,e)}
                        name="enddate"
                        id={"dateend" + index}
                        label="End Date"
                        type="date"
                        InputLabelProps={{
                        shrink: true,
                        }}
                        required style={{width:'25vw'}}
                    />
                </Grid>
                <Grid container direction="row" alignItems="center" justify="center" spacing={2} style={{marginBottom:'10px'}}>
                <Grid item><Button onClick={addNewForm} color="primary" variant="contained" style={{marginTop:'25px',width:'12vw'}}>Add</Button></Grid>
                <Grid item><Button onClick={() => removeForm(index)} color="secondary" variant="contained" style={{marginTop:'25px',width:'12vw'}}>Remove</Button></Grid>
                </Grid>
                </div>)

    return (
        <div>
            <form onSubmit={handleSubmit}>
            <Paper elevation={20} style={{maxWidth:'55vw',margin:'15px auto',padding:'20px'}}>
            <Typography variant="h5" align="center" color="primary" style={{marginBottom:'20px'}}>Enter Educational Details</Typography>
            <Grid container alignItems="center" justify="center" direction="column" spacing={1} style={{maxWidth:'100vw',marginTop:'2px'}}>
                
                {educationDetails.map( (eduDetail,index) => acedamicDetailFrm(eduDetail,index) )}                
                {/* {acedamicDetailFrm} */}
                <Button type="submit" color="primary" variant="contained" style={{marginTop:'5px',width:'25vw'}}>Register</Button>
                <Button onClick={() => props.history.goBack()} color="primary" variant="contained" style={{marginTop:'15px',width:'25vw'}}>Previous</Button>
            </Grid>
            </Paper>
        </form>      
        </div>
    )
}

export default RegistrationPart2
