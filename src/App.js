import { useState } from "react";
import Loginfrm from "./Components/Loginfrm";
import Nav from "./Components/Nav";
import Registration from "./Components/Registration";
import MainScr from "./Components/MainScr";
import {Redirect, Route,Switch} from 'react-router-dom';
import Logout from "./Components/Logout";
import PersonalDetails from "./Components/PersonalDetails";
import RegistrationPart2 from './Components/RegistrationPart2'
import EducationalDetails from "./Components/EducationalDetails";

function App() {

  const [loggedIn,setLoggedIn] = useState(false);
  const [registering,setRegistering] = useState(false);

  return (
    <div>
      <Nav loggedIn={loggedIn} registering={registering}/> {/* passed props are to set button links in nav dynamically  */}
      <Switch> {/* Set up Routes with validations/guards */}
      {loggedIn ? 
          <Route exact path="/home" component={MainScr}/> 
          : <Route exact path="/login" render={(props) => <Loginfrm {...props} loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>} />
               }
          <Route path="/registration" render={(props) => <Registration {...props} registering={registering} setRegistering={setRegistering}/>}/>
          {loggedIn ? <Route path="/logout" render={(props) => <Logout {...props} setLoggedIn={setLoggedIn}/>} /> : null}
          {loggedIn ? <Route path="/personaldetails" component={PersonalDetails}/> : null}
          {loggedIn ? <Route path="/educationaldetails" component={EducationalDetails}/> : null}
          registering && <Route path="/registration-step2" render={(props) => <RegistrationPart2 {...props} registering={registering} setRegistering={setRegistering}/>}/>
      </Switch>
    </div>
  );
}

export default App;
