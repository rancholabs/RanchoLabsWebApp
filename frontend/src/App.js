import React from 'react';
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import Header from './Components/Header'
import Loader from './Components/Loader'
import Footer from './Components/Footer'
import ScrollToTop from './Components/ScrollToTop'
import HomeScreen from './Screens/Home'
import Course from './Screens/Course'
import Courses from './Screens/Courses'
import LandingPage from './Screens/Landing-page'
import WorkshopDashboard from './Screens/WorkshopDashboard'
// import StudentInfo from './Screens/StudentInformation'
import LoginAccount from './Screens/LogIn'
import SetPass from './Screens/SetPassword'
import ResetPass from './Screens/ResetPassword'
import ValidateResetLink from './Screens/ResetPassword/ValidateResetLink'
import ForgotPass from './Screens/ForgotPassword'
import CreateAccount from './Screens/CreateAccount'
import FreeWorkshop from './Screens/FreeWorkshop'
import WorkshopSignup from './Screens/WorkshopSignup'
import PageNotFound from './Screens/PageNotFound'
import ErrorHandler from './Screens/ErrorHandler'
import AboutUs from './Screens/AboutUs'
import FreeClass from './Screens/FreeClass'
import InstructorProfile from './Screens/InstructorProfile'
import InstructorSchedule from './Screens/InstructorSchedule'

function App() {
  //const HeaderComponent = withRouter( props => <Header {...props}/>)
  return (
    <BrowserRouter primary={false}>
      <>
        <Header/>
        <Loader/>
        <main>
          <ScrollToTop>
            <Switch>
              <Route path="/" exact={true} component={LandingPage} />
              <Route path="/course/:courseId" exact={true} component={Course} />
              <Route path={["/courses", "/courses/:groupId"]} exact={true} component={Courses} />
              <Route path="/dashboard" exact={true} component={WorkshopDashboard} />
              {/* <Route path="/studentInfo" exact={true} component={StudentInfo} /> */}
              <Route path="/login" exact={true} component={LoginAccount} />
              <Route path="/setPassword" exact={true} component={SetPass} />
              <Route path="/resetPassword" exact={true} component={ResetPass} />
              <Route path="/resetPassword/:token" exact={true} component={ValidateResetLink} />
              <Route path="/forgotPassword" exact={true} component={ForgotPass} />
              <Route path="/register" exact={true} component={CreateAccount} />
              <Route path="/freeWorkshop" exact={true} component={FreeWorkshop} />
              <Route path="/workshopSignup" exact={true} component={WorkshopSignup} />
              <Route path="/errorHandler" exact={true} component={ErrorHandler} />
              <Route exact path="/aboutUs" exact={true} component={AboutUs} />
              <Route exact path="/freeclass" exact={true} component={FreeClass} />
              <Route exact path="/instructor/profile" exact={true} component={InstructorProfile} />
              <Route exact path="/instructor/schedule" exact={true} component={InstructorSchedule} />
              <Route path="/blog" component={() => {
                window.location.href = 'http://blog.rancholabs.com'
                return null}} />
              <Route component={PageNotFound} />
            </Switch>
          </ScrollToTop>
        </main>
        <Footer/>
      </>
    </BrowserRouter>
  );
}

export default App;
