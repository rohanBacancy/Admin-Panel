import { useState } from "react";
import Loginfrm from "./Components/Loginfrm";
import Nav from "./Components/Nav";
import Registration from "./Components/Registration";
import MainScr from "./Components/MainScr";
import {Route,Switch} from 'react-router-dom';
import Logout from "./Components/Logout";
import PersonalDetails from "./Components/PersonalDetails";
import RegistrationPart2 from './Components/RegistrationPart2'
import EducationalDetails from "./Components/EducationalDetails";

function App() {

  const [loggedIn,setLoggedIn] = useState(false);
  const [registering,setRegistering] = useState(false);

  return (
    <div>
      <Nav loggedIn={loggedIn} registering={registering}/>
      <Switch>
      {loggedIn ? 
          <Route exact path="/home" component={MainScr}/> 
          : <Route exact path="/login" render={(props) => <Loginfrm {...props} loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>} />
               }
          <Route path="/registration" render={(props) => <Registration {...props} setRegistering={setRegistering}/>}/>
          loggedIn && <Route path="/logout" render={(props) => <Logout {...props} setLoggedIn={setLoggedIn}/>}/> 
          loggedIn && <Route path="/personaldetails" component={PersonalDetails}/>
          loggedIn && <Route path="/educationaldetails" component={EducationalDetails}/>
          registering && <Route path="/registration-step2" component={RegistrationPart2}/>
      </Switch>
    </div>
  );
}

export default App;
