import React from 'react'
import { useState } from 'react'
import { Dropdown, Button, ButtonGroup, DropdownButton } from 'react-bootstrap'
import './css/DashboardBody.css'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { courseGroups } from '../../Actions/courseActions'
import { activeCourseGroup } from '../../Actions/dashboardActions'
import DashboardCards from './DashboardCards'
import DashboardBanner from './DashboardBanner'
import DashboardCertificate from './DashboardCertificate'
import DashboardJourney from './DashboardJourney'
import DashboardTestimonials from './DashboardTestimonial'
import DashboardCongratsCard from './DashboardCongratsCard'
import DashboardCertificateComplete from './DashboardCertificateComplete'

const DashboardCourseChoice = () => {
    // const [course, setCourse] = useState(0);
    const dispatch = useDispatch()

    const groups = useSelector((state) => state.courseGroups)
    const { loading, error, coursegroups } = groups

    useEffect(() => {
        dispatch(courseGroups())
    }, [])

    const { activeCourse } = useSelector((state) => state.activeCourse)

    if (coursegroups) {
        var selected = coursegroups.filter((course) => {
            if (course._id === activeCourse)
                return course
        })

    }

    const { userInfo } = useSelector(state => state.userLogin)

    function handleClick(id) {
        dispatch(activeCourseGroup(id))
    }


    return (
        <>
            {coursegroups && <div className="dchoice" style={{ backgroundColor: "#F0F0F2", position: "relative" ,width:"35.27vw"}}>
                <Dropdown as={ButtonGroup} style={{ width: "100%" }}>
                    <Button variant="success" style={{ width: "max-content", marginRight: "unset", borderRadius: "inherit", background: "transparent", border: "none", paddingLeft:"0" }}>
                        <div id="plus" className="align-self-center">
                            <a href='/course'>+</a></div></Button>
                    <Dropdown.Toggle split variant="success" id="dropdown-split-basic"
                        style={{ width: "100%", margin: "unset", background: "transparent", border: "none"}}>
                            {selected[0].name}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {
                            coursegroups.map((group) =>
                                <>
                                    <Dropdown.Item onClick={() => handleClick(group._id)}>{group.name}</Dropdown.Item>
                                </>
                            )
                        }
                    </Dropdown.Menu>
                </Dropdown>
            </div>}
        </>
    )
}

const DashboardHeaderLowerMob = (props) => {

    return (
        <div className="row dashboard-header-lower-mob mx-0" style={{ height: "9vw" }}>
            <div className="col-7 p-0">
                <DashboardCourseChoice />
            </div>
            <div className="col-5 pl-15">
                <div className="profile-title">PROFILE</div>
            </div>
        </div>
    )
}

const DashboardHeaderLower = () => {

    return (
        <div style={{backgroundColor:"#020122", paddingTop:"2vw"}}>
            <div className="row dashboard-header-lower mr-0">
            <div className="col-lg-5">
                <DashboardCourseChoice />
            </div>
            <div className="col-lg-7" style={{alignSelf:"flex-end"}}>
                <div className="profile-title">PROFILE</div>
            </div>
        </div>
        </div>
    )
}

function DashboardBody(props) {

    const { activeCourseGroup } = useSelector((state) => state.activeCourse)

    var activeCourse = props.courses.filter((course) => {
        if (course.courseDetails.groupId === activeCourseGroup)
            return course
    })

    var workshop = props.courses.filter((course) => {
        if (course.courseDetails.groupId === '')
            return course
    })


    var coursedata = (activeCourse.length) ? activeCourse[0] : null
    // console.log(activeCourse.courseDetails.groupId)

    return (
        <>
            {
                activeCourse &&
                <>
                    <DashboardHeaderLowerMob />
                    <DashboardHeaderLower />
                    {
                        <div style={{backgroundColor:"#F0F0F2"}}>
                            <DashboardBanner />
                            <DashboardCards coursedata={coursedata} activeCourse={activeCourse}/>
                            {/* <DashboardCertificate /> */}
                            {/* <DashboardCertificateComplete /> */}
                            {/* <DashboardCongratsCard /> */}
                            <DashboardJourney />
                            <DashboardTestimonials />
                        </div>
                    }
                </>
            }
        </>
    )
}

export default DashboardBody