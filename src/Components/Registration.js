import React, { useState,useEffect } from 'react';
import { Typography,Grid,Button, Paper, TextField,Select,MenuItem,InputLabel } from '@material-ui/core';

const Registration = (props) => {

    const [userDetails,setUserDetails] = useState({  //Form Fields value
        fname:'',
        lname:'',
        gender:'male',
        email:'',
        phone:'',
        password:'',
        confirmPassword:'',
    });

    const [errorMsgs,setErrorMsgs] = useState({ //Error Messages for materil UI
        fnameError:'',
        lnameError:'',
        genderError:'',
        emailError:'',
        phoneError:'',
        passwordError:'',
        confirmPasswordError:''
    })

    useEffect(() => {
        if(localStorage.getItem("currUserForRegisterForm") != null) //If tapped Previous Btn from step2 then set the formFields
        {
            let existingItem = JSON.parse(localStorage.getItem("currUserForRegisterForm"));
            setUserDetails({
                fname:existingItem.fname,
                lname:existingItem.lname,
                gender:existingItem.gender,
                email:existingItem.email,
                phone:existingItem.phone,
                password:existingItem.password,
                confirmPassword:existingItem.password,
            })
        }
    },[])

    const handleSubmit = (e) => 
    {
        e.preventDefault();
        //sum variable sums length of all error msgs to see if there are any errors in input?
        let sum=0;
        for(let msg in errorMsgs)
        {
            sum+=errorMsgs[msg].length;
        }

        if(sum==0)//No Input Errors
        {
            let usersArr = [];
            let storeObj = {id:userDetails.email,userInfo:userDetails};
            if(props.registering)//Registering Gone to Second Step so Let it Pass without check
            {
                if(localStorage.getItem("users")) // If Any users present then get and push in users localstorage array
                {
                    usersArr = JSON.parse(localStorage.getItem("users"));
                    usersArr.push(storeObj);
                    localStorage.setItem("users",JSON.stringify(usersArr));
                }
                else //No users present push first user create users array in localstorage
                {
                    usersArr.push(storeObj);
                    localStorage.setItem("users",JSON.stringify(usersArr));
                }
                props.setRegistering(true);
                localStorage.setItem("userDetail"+userDetails.email,JSON.stringify(userDetails));
                localStorage.setItem("currUser",JSON.stringify(userDetails));
                props.history.push("/registration-step2");
                // }
            }
            else // registering first time check for unique email
            {
                if(localStorage.getItem("userDetail"+userDetails.email) != null)
                {
                     alert("User Already Exist , Please Login");
                     props.history.push("/login");
                }
                else
                {
                if(localStorage.getItem("users"))
                {
                    usersArr = JSON.parse(localStorage.getItem("users"));
                    usersArr.push(storeObj);
                    localStorage.setItem("users",JSON.stringify(usersArr));
                }
                else
                {
                    usersArr.push(storeObj);
                    localStorage.setItem("users",JSON.stringify(usersArr));
                }
                props.setRegistering(true);
                localStorage.setItem("userDetail"+userDetails.email,JSON.stringify(userDetails));
                localStorage.setItem("currUser",JSON.stringify(userDetails));
                localStorage.setItem("currUserForRegisterForm",JSON.stringify(userDetails));
                console.log(JSON.parse(localStorage.getItem("userDetail")));
                props.history.push("/registration-step2");
                }
            }
        }
        else//input contains errors
        {
            alert("Input is Erroneous")
        }
    }

    const handleChange = (e) => 
    {
        validate(e);
        switch(e.target.name)
        {
            case 'fname':
                setUserDetails({...userDetails,fname:e.target.value});
                break;
            case 'lname':
                setUserDetails({...userDetails,lname:e.target.value});
                break;
            case 'gender':
                setUserDetails({...userDetails,gender:e.target.value});
                break;
            case 'email':
                setUserDetails({...userDetails,email:e.target.value});
                break;
            case 'phone':
                setUserDetails({...userDetails,phone:e.target.value});
                break;
            case 'pass':
                setUserDetails({...userDetails,password:e.target.value});
                break;
            case 'cpass':
                setUserDetails({...userDetails,confirmPassword:e.target.value});
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
            case 'fname':
                e.target.value == '' ? setErrorMsgs({...errorMsgs,fnameError:"It is Required"}) : setErrorMsgs({...errorMsgs,fnameError:""}) ;
                break;
            case 'lname':
                e.target.value == '' ? setErrorMsgs({...errorMsgs,lnameError:"It is Required"}) : setErrorMsgs({...errorMsgs,lnameError:""}) ;
                break;
            case 'gender':
                e.target.value == '' ? setErrorMsgs({...errorMsgs,genderError:"It is Required"}) : setErrorMsgs({...errorMsgs,genderError:""});
                break;
            case 'email':
                const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if( ! (re.test(String(e.target.value).toLowerCase()))) setErrorMsgs({...errorMsgs,emailError:"Invalid Email"}); else setErrorMsgs({...errorMsgs,emailError:""});
                console.log(errorMsgs);
                break;
            case 'phone':
                const rephone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
                 if( ! (rephone.test(String(e.target.value)))) setErrorMsgs({...errorMsgs,phoneError:"Invalid PhoneNo"}); else setErrorMsgs({...errorMsgs,phoneError:""});
                 console.log(errorMsgs);
                break;
            case 'pass':
                checkPassRepass(e);
                break;
            case 'cpass':
                if(!(e.target.value == userDetails.password)) setErrorMsgs({...errorMsgs,confirmPasswordError:"Password & ConfirmPass Should Match"}); else setErrorMsgs({...errorMsgs,confirmPasswordError:""});
                console.log(errorMsgs);     
                break;
            default:
                console.log("How");
                break;
        }
        
    }

    const checkPassRepass = (e) =>
    {
        const repass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
                if(!(repass.test(String(e.target.value)))) 
                    {setErrorMsgs({...errorMsgs,passwordError:"Minimum eight characters at least one letter and one number"});} 
                else{
                    if(!(e.target.value == userDetails.password)) 
                        { userDetails.confirmPassword == "" ? setErrorMsgs({...errorMsgs,passwordError:''}) : setErrorMsgs({...errorMsgs,passwordError:'',confirmPasswordError:"Password & ConfirmPass Should Match"});}
                    else 
                        {setErrorMsgs({...errorMsgs,confirmPasswordError:""})}; };
    }

    return (
        <form onSubmit={handleSubmit}>
            <Paper elevation={20} style={{maxWidth:'55vw',margin:'15px auto',padding:'20px'}}>
            <Typography variant="h5" align="center" color="primary">Registration Form</Typography>
            <Grid container alignItems="center" justify="center" direction="column" spacing={1} style={{maxWidth:'100vw',marginTop:'2px'}}>
                {/* First Name */}
                <Grid item>
                    <TextField
                     value={userDetails.fname}
                      onChange={handleChange}   
                        error={errorMsgs.fnameError} // if error message isn't null will active error class
                        helperText={errorMsgs.fnameError} // Show the actual error message below the input if any
                       name="fname"
                        label="First Name"
                         required style={{width:'25vw'}}></TextField></Grid>
                {/* Last Name */}
                <Grid item><TextField
                 value={userDetails.lname}
                  onChange={handleChange}
                 error={errorMsgs.lnameError}
                  helperText={errorMsgs.lnameError}
                   name="lname"
                    label="Last Name"
                     required style={{width:'25vw'}}></TextField></Grid>
                {/* Gender */}
                        <Grid item style={{marginTop:'10px',marginBottom:'-4px'}}>
                        <InputLabel id="genderlbl">Gender</InputLabel>
                        <Select  value={userDetails.gender}
                         onChange={handleChange}
                          name="gender"
                          labelId="genderlbl"
                 error={errorMsgs.genderError}
                  helperText={errorMsgs.genderError}
                           required style={{width:'25vw'}}>
                            <MenuItem value={"male"}>Male</MenuItem>
                            <MenuItem value={"female"}>Female</MenuItem>
                            <MenuItem value={"other"}>Others</MenuItem>
                        </Select>
                         </Grid>
                {/* Email */}
                <Grid item><TextField
                 error={errorMsgs.emailError}
                  helperText={errorMsgs.emailError}
                   value={userDetails.email}
                    name="email"
                     onChange={handleChange}
                      label="Email ID"
                       type="email"
                        required style={{width:'25vw'}}></TextField></Grid>
                {/* Phone Number */}
                <Grid item><TextField
                 error={errorMsgs.phoneError}
                  helperText={errorMsgs.phoneError}
                   value={userDetails.phone}
                    name="phone"
                     onChange={handleChange}
                      label="Phone No"
                       required style={{width:'25vw'}}></TextField></Grid>
                {/* Password */}
                <Grid item><TextField
                 error={errorMsgs.passwordError}
                  helperText={errorMsgs.passwordError}
                   value={userDetails.password}
                    name="pass" onChange={handleChange}
                     label="Password"
                      type="password"
                       required style={{width:'25vw'}}></TextField></Grid>
                {/* Confirm Pass */}
                <Grid item><TextField
                 error={errorMsgs.confirmPasswordError}
                  helperText={errorMsgs.confirmPasswordError}
                   value={userDetails.confirmPassword}
                    name="cpass" onChange={handleChange}
                     label="Confirm Password"
                      type="password"
                       required style={{width:'25vw'}}></TextField></Grid>
                <Button type="submit" color="primary" variant="contained" style={{marginTop:'25px',width:'25vw'}}>Next</Button>
            </Grid>
            </Paper>
        </form>
    )
}

export default Registration
