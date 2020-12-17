import React from "react";
import { BrowserRouter, Route, Switch, withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./Actions/userAction";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import Header from "./Components/Header";
import Loader from "./Components/Loader";
import Footer from "./Components/Footer";
import ScrollToTop from "./Components/ScrollToTop";
import HomeScreen from "./Screens/Home";
import Course from "./Screens/Course";
import Courses from "./Screens/Courses";
import LandingPage from "./Screens/Landing-page";
import WorkshopDashboard from "./Screens/WorkshopDashboard";
// import StudentInfo from './Screens/StudentInformation'
import LoginAccount from "./Screens/LogIn";
import SetPass from "./Screens/SetPassword";
import ResetPass from "./Screens/ResetPassword";
import ValidateResetLink from "./Screens/ResetPassword/ValidateResetLink";
import ForgotPass from "./Screens/ForgotPassword";
import CreateAccount from "./Screens/CreateAccount";
import FreeWorkshop from "./Screens/FreeWorkshop";
import WorkshopSignup from "./Screens/WorkshopSignup";
import PageNotFound from "./Screens/PageNotFound";
import ErrorHandler from "./Screens/ErrorHandler";
import AboutUs from "./Screens/AboutUs";
import FreeClass from "./Screens/FreeClass";
import Project from "./Screens/Project";
import ProjectView from "./Screens/ProjectView";
import FooterBottom from "./Components/FooterBottom";
import ProjectProfile from "./Components/ProjectProfile";
import Innovation from "./Screens/Innovation";
import InnovationView from "./Screens/InnovationView";
import StudentProfile from "./Screens/StudentProfile";
import InstructorProfile from "./Screens/InstructorProfile";
import InstructorSchedule from "./Screens/InstructorSchedule";
import Blog from "./Screens/Blog";
import SingleBlog from "./Screens/SingleBlog";
import BlogAdmin from "./Screens/BlogAdmin";
import Payment from "./Screens/Payment";
import BuildProject from "./Screens/BuildProject";

// ADMIN
import Admin from "./Screens/Admin";

import axios from "axios";

function App() {
  //const HeaderComponent = withRouter( props => <Header {...props}/>)
  const [showAdmin, setShowAdmin] = React.useState(false);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (window.location.href.toString().includes("/admin")) {
      setShowAdmin(true);
    }
  });

  React.useEffect(() => {
    checkToken();
    setInterval(() => {
      checkToken();
    }, 1000 * 60 * 5);
  }, []);

  const checkToken = () => {
    const _userInfo = localStorage.getItem("userInfo");
    const token = _userInfo ? JSON.parse(_userInfo).token : "";
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    };
    if (token) {
      axios
        .get("/api/validateTokenExpiry", config)
        .then((res) => {
          // valid
          console.log(res.data);
        })
        .catch((err) => {
          // expire
          console.log(err);
          dispatch(logout());
        });
    }
  };
  return (
    <BrowserRouter primary={false}>
      <>
        {showAdmin ? (
          <Switch>
            <Route path="/admin" exact={true} component={Admin} />
          </Switch>
        ) : (
          <>
            <Route
              render={({ location }) =>
                ["/project", "/innovation"].includes(location.pathname) ? (
                  <ProjectProfile />
                ) : location.pathname.includes("/profile/student") ? (
                  <></>
                ) : (
                  <Header />
                )
              }
            />
            <Loader />
            <main>
              <ScrollToTop>
                <Switch>
                  <Route path="/" exact={true} component={LandingPage} />
                  <Route
                    path="/course/:courseId"
                    exact={true}
                    component={Course}
                  />
                  <Route
                    path={["/courses", "/courses/:groupId"]}
                    exact={true}
                    component={Courses}
                  />
                  <Route
                    path="/dashboard"
                    exact={true}
                    component={WorkshopDashboard}
                  />
                  {/* <Route path="/studentInfo" exact={true} component={StudentInfo} /> */}
                  <Route path="/login" exact={true} component={LoginAccount} />
                  <Route
                    path={["/setPassword", "/setPassword/:email"]}
                    exact={true}
                    component={SetPass}
                  />
                  {/* <Route
                    path="/resetPassword"
                    exact={true}
                    component={ResetPass}
                  /> */}
                  <Route
                    path="/resetPassword"
                    exact={true}
                    component={ValidateResetLink}
                  />
                  <Route
                    path="/forgotPassword"
                    exact={true}
                    component={ForgotPass}
                  />
                  <Route
                    path="/register"
                    exact={true}
                    component={CreateAccount}
                  />
                  <Route
                    path="/freeWorkshop"
                    exact={true}
                    component={FreeWorkshop}
                  />
                  <Route
                    path="/workshopSignup"
                    exact={true}
                    component={WorkshopSignup}
                  />
                  <Route
                    path="/errorHandler"
                    exact={true}
                    component={ErrorHandler}
                  />
                  <Route
                    exact
                    path="/aboutUs"
                    exact={true}
                    component={AboutUs}
                  />
                  <Route path="/project" exact={true} component={Project} />
                  <Route
                    path="/project/:projectId"
                    exact={true}
                    component={ProjectView}
                  />
                  <Route
                    path="/innovation"
                    exact={true}
                    component={Innovation}
                  />
                  <Route
                    path="/innovation/:innovationId"
                    exact={true}
                    component={InnovationView}
                  />
                  <Route
                    path="/profile/student"
                    exact={true}
                    component={StudentProfile}
                  />
                  <Route
                    path="/profile/student/:profileId"
                    exact={true}
                    component={StudentProfile}
                  />
                  <Route
                    exact
                    path="/freeclass"
                    exact={true}
                    component={FreeClass}
                  />
                  <Route
                    exact
                    path="/instructor/profile"
                    exact={true}
                    component={InstructorProfile}
                  />
                  <Route
                    exact
                    path="/instructor/schedule"
                    exact={true}
                    component={InstructorSchedule}
                  />
                  <Route
                    path="/blog"
                    component={Blog}
                    exact
                    // component={() => {
                    //   window.location.href = "http://blog.rancholabs.com";
                    //   return null;
                    // }}
                  />
                  <Route path="/blog/:blogID" component={SingleBlog} exact />
                  <Route path="/blogadmin" component={BlogAdmin} exact />
                  <Route
                    path={["/enroll", "/enroll/:courseId"]}
                    exact={true}
                    component={Payment}
                  />
                  <Route
                    path="/buildproject"
                    exact={true}
                    component={BuildProject}
                  />
                  <Route component={PageNotFound} />
                </Switch>
              </ScrollToTop>
            </main>
            <Route
              render={({ location }) =>
                ["/project", "/innovation"].includes(location.pathname) ? (
                  <FooterBottom />
                ) : location.pathname.includes("/profile/student") ? (
                  <></>
                ) : (
                  <Footer />
                )
              }
            />
          </>
        )}
      </>
    </BrowserRouter>
  );
}

export default App;
