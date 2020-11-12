import React, { useEffect, useState } from 'react'
import CoursesDrivingFuture from './CoursesDrivingFuture'
import CoursesGrade from './CoursesGrade'
import CoursesCourses from './CoursesCourses'
import CoursesDetails from './CoursesDetails'
import CoursesDetailedList from './CoursesDetailedList'
import CoursesMain from './CoursesMain'
import CoursesBanner from './CoursesBanner'
import CoursesLearn from './CoursesLearn'
import CoursesInstructors from './CoursesInstructors'
import CoursesGrowth from './CoursesGrowth'
import CoursesFaq from './CoursesFaq'
import CoursesTestimonials from './CoursesTestimonials'
import CoursesProjects from './CoursesProjects'
import './css/index.css'
import Robotics from './img/robotics.png'
import Programming from './img/programming.png'
import AI from './img/ai.png'
import RoboticsCurriculum from './../files/RoboticsCurriculum.pdf'
import AICurriculum from './../files/AICurriculum.pdf'

import { useDispatch, useSelector } from 'react-redux'
import { courseActiveGroupsList, courseGroupsList } from '../../Actions/courseActions'

const Courses = () => {

    //const [grades, setGrades] = useState([])
    //const [activeGrade, setActiveGrade] = useState(undefined)
    //const [courseGroups, setCourseGroups] = useState([])
    //const [activeCourseGroups, setActiveCourseGroups] = useState([])
    const [state, setState] = useState({grades: [], activeGrade: undefined, activeCourseGroups: []})
    const {grades, activeGrade, activeCourseGroups} = state
    const {courseGroupsList: courseGroups} = useSelector((state) => state.courseGroupsList)
    const setActiveGrade = (activeGrade) => {
        setState((prevState) => {
            return({
              ...prevState,
              activeGrade: activeGrade
            })
        })
    }
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(courseGroupsList())
    }, [])
    useEffect(() => {
        
        const rCourses = courseGroups.flatMap(courseGroup => courseGroup.courses)
        const rGrades = [...new Set(rCourses.map(course => JSON.stringify(course.gradeRange)))]
        .map(grade => JSON.parse(grade))
        .sort((a,b) => (a.minG > b.minG) ? 1 : ((b.minG > a.minG) ? -1 : 0))
        setState((prevState) => {
            return({
                ...prevState,
                grades: rGrades,
                activeCourseGroups: courseGroups.sort((a,b) => (a._id > b._id) ? 1 : ((b._id > a._id) ? -1 : 0)),
                activeGrade: rGrades.length ? rGrades[0] : undefined
            })
        })

        
    }, [courseGroups])

    useEffect(() => {
        if(activeGrade) {
            const getData = async () => {
                const data = await courseActiveGroupsList()

                const rCourseGroups = data.map(courseGroup => {
                    courseGroup.courses = courseGroup.courses.filter(course => {
                        if(JSON.stringify(course.gradeRange) === JSON.stringify(activeGrade))
                            return course
                    })
                    return courseGroup
                })
                setState((prevState) => {
                    return({
                    ...prevState,
                    activeCourseGroups: rCourseGroups.sort((a,b) => (a._id > b._id) ? 1 : ((b._id > a._id) ? -1 : 0))
                    })
                })
            }
    
            getData()
        }
    }, [activeGrade])

    const coursess = {
        grades: [
            {
                id: 1,
                minG: 8,
                maxG: 10
            },
            {
                id: 2,
                minG: 11,
                maxG: 12
            }
        ],
        courses: [
            {
                id: 1,
                name: 'ROBOTICS',
                img: Robotics,
                curriculum: RoboticsCurriculum,
                details: [
                    {
                        name: 'Robotics & Programming',
                        grade: {
                            minG: 8,
                            maxG: 10
                        },
                        durationInhours: 15,
                        outcomes: [
                            {
                                topic: 'LEARN',
                                subtopics: [
                                    'Programming',
                                    'Electrical',
                                    'Mechanical'
                                ]
                            },
                            {
                                topic: 'BUILD',
                                subtopics: [
                                    'Calculator',
                                    'Diwali lights',
                                    'Traffic light controller'
                                ]
                            },
                            {
                                topic: 'INNOVATE',
                                subtopics: [
                                    'Calculator'
                                ]
                            }
                        ],
                        price: {
                            currency: '₹',
                            amount: '4999'
                        }
                    },
                    {
                        name: 'Robotics & Programming',
                        grade: {
                            minG: 8,
                            maxG: 10
                        },
                        durationInhours: 15,
                        outcomes: [
                            {
                                topic: 'LEARN',
                                subtopics: [
                                    'Programming',
                                    'Electrical',
                                    'Mechanical'
                                ]
                            },
                            {
                                topic: 'BUILD',
                                subtopics: [
                                    'Calculator',
                                    'Diwali lights',
                                    'Traffic light controller'
                                ]
                            },
                            {
                                topic: 'INNOVATE',
                                subtopics: [
                                    'Calculator'
                                ]
                            }
                        ],
                        price: {
                            currency: '₹',
                            amount: '4999'
                        }
                    },
                    {
                        name: 'Robotics & Programming',
                        grade: {
                            minG: 8,
                            maxG: 10
                        },
                        durationInhours: 15,
                        outcomes: [
                            {
                                topic: 'LEARN',
                                subtopics: [
                                    'Programming',
                                    'Electrical',
                                    'Mechanical'
                                ]
                            },
                            {
                                topic: 'BUILD',
                                subtopics: [
                                    'Calculator',
                                    'Diwali lights',
                                    'Traffic light controller'
                                ]
                            },
                            {
                                topic: 'INNOVATE',
                                subtopics: [
                                    'Calculator'
                                ]
                            }
                        ],
                        price: {
                            currency: '₹',
                            amount: '4999'
                        }
                    }
                ]
            },
            {
                id: 2,
                name: 'PROGRAMMING',
                img: Programming,
                curriculum: "",
                details: [
                    {
                        name: 'Programming',
                        grade: {
                            minG: 8,
                            maxG: 10
                        },
                        durationInhours: 15,
                        outcomes: [
                            {
                                topic: 'LEARN',
                                subtopics: [
                                    'Programming',
                                    'Electrical',
                                    'Mechanical'
                                ]
                            },
                            {
                                topic: 'BUILD',
                                subtopics: [
                                    'Calculator',
                                    'Diwali lights',
                                    'Traffic light controller'
                                ]
                            },
                            {
                                topic: 'INNOVATE',
                                subtopics: [
                                    'Calculator'
                                ]
                            }
                        ],
                        price: {
                            currency: '₹',
                            amount: '4999'
                        }
                    },
                    {
                        name: 'Programming',
                        grade: {
                            minG: 8,
                            maxG: 10
                        },
                        durationInhours: 15,
                        outcomes: [
                            {
                                topic: 'LEARN',
                                subtopics: [
                                    'Programming',
                                    'Electrical',
                                    'Mechanical'
                                ]
                            },
                            {
                                topic: 'BUILD',
                                subtopics: [
                                    'Calculator',
                                    'Diwali lights',
                                    'Traffic light controller'
                                ]
                            },
                            {
                                topic: 'INNOVATE',
                                subtopics: [
                                    'Calculator'
                                ]
                            }
                        ],
                        price: {
                            currency: '₹',
                            amount: '4999'
                        }
                    },
                    {
                        name: 'Programming',
                        grade: {
                            minG: 8,
                            maxG: 10
                        },
                        durationInhours: 15,
                        outcomes: [
                            {
                                topic: 'LEARN',
                                subtopics: [
                                    'Programming',
                                    'Electrical',
                                    'Mechanical'
                                ]
                            },
                            {
                                topic: 'BUILD',
                                subtopics: [
                                    'Calculator',
                                    'Diwali lights',
                                    'Traffic light controller'
                                ]
                            },
                            {
                                topic: 'INNOVATE',
                                subtopics: [
                                    'Calculator'
                                ]
                            }
                        ],
                        price: {
                            currency: '₹',
                            amount: '4999'
                        }
                    }
                ]
            },
            {
                id: 3,
                name: 'ARTIFICIAL INTELLIGENCE',
                img: AI,
                curriculum: AICurriculum,
                details: [
                    {
                        name: 'Artificial Intelligence',
                        grade: {
                            minG: 8,
                            maxG: 10
                        },
                        durationInhours: 15,
                        outcomes: [
                            {
                                topic: 'LEARN',
                                subtopics: [
                                    'Programming',
                                    'Electrical',
                                    'Mechanical'
                                ]
                            },
                            {
                                topic: 'BUILD',
                                subtopics: [
                                    'Calculator',
                                    'Diwali lights',
                                    'Traffic light controller'
                                ]
                            },
                            {
                                topic: 'INNOVATE',
                                subtopics: [
                                    'Calculator'
                                ]
                            }
                        ],
                        price: {
                            currency: '₹',
                            amount: '4999'
                        }
                    },
                    {
                        name: 'Artificial Intelligence',
                        grade: {
                            minG: 8,
                            maxG: 10
                        },
                        durationInhours: 15,
                        outcomes: [
                            {
                                topic: 'LEARN',
                                subtopics: [
                                    'Programming',
                                    'Electrical',
                                    'Mechanical'
                                ]
                            },
                            {
                                topic: 'BUILD',
                                subtopics: [
                                    'Calculator',
                                    'Diwali lights',
                                    'Traffic light controller'
                                ]
                            },
                            {
                                topic: 'INNOVATE',
                                subtopics: [
                                    'Calculator'
                                ]
                            }
                        ],
                        price: {
                            currency: '₹',
                            amount: '4999'
                        }
                    },
                    {
                        name: 'Artificial Intelligence',
                        grade: {
                            minG: 8,
                            maxG: 10
                        },
                        durationInhours: 15,
                        outcomes: [
                            {
                                topic: 'LEARN',
                                subtopics: [
                                    'Programming',
                                    'Electrical',
                                    'Mechanical'
                                ]
                            },
                            {
                                topic: 'BUILD',
                                subtopics: [
                                    'Calculator',
                                    'Diwali lights',
                                    'Traffic light controller'
                                ]
                            },
                            {
                                topic: 'INNOVATE',
                                subtopics: [
                                    'Calculator'
                                ]
                            }
                        ],
                        price: {
                            currency: '₹',
                            amount: '4999'
                        }
                    }
                ]
            },
            /*{
                id: 4,
                name: 'CHECKING',
                img: Robotics,
                details: [
                    {
                        name: 'Checking',
                        grade: {
                            minG: 8,
                            maxG: 10
                        },
                        durationInhours: 15,
                        outcomes: [
                            {
                                topic: 'LEARN',
                                subtopics: [
                                    'Programming',
                                    'Electrical',
                                    'Mechanical'
                                ]
                            },
                            {
                                topic: 'BUILD',
                                subtopics: [
                                    'Calculator',
                                    'Diwali lights',
                                    'Traffic light controller'
                                ]
                            },
                            {
                                topic: 'INNOVATE',
                                subtopics: [
                                    'Calculator'
                                ]
                            }
                        ],
                        price: {
                            currencyType: '₹',
                            currency: '4999'
                        }
                    },
                    {
                        name: 'Checking',
                        grade: {
                            minG: 8,
                            maxG: 10
                        },
                        durationInhours: 15,
                        outcomes: [
                            {
                                topic: 'LEARN',
                                subtopics: [
                                    'Programming',
                                    'Electrical',
                                    'Mechanical'
                                ]
                            },
                            {
                                topic: 'BUILD',
                                subtopics: [
                                    'Calculator',
                                    'Diwali lights',
                                    'Traffic light controller'
                                ]
                            },
                            {
                                topic: 'INNOVATE',
                                subtopics: [
                                    'Calculator'
                                ]
                            }
                        ],
                        price: {
                            currencyType: '₹',
                            currency: '4999'
                        }
                    },
                    {
                        name: 'Checking',
                        grade: {
                            minG: 8,
                            maxG: 10
                        },
                        durationInhours: 15,
                        outcomes: [
                            {
                                topic: 'LEARN',
                                subtopics: [
                                    'Programming',
                                    'Electrical',
                                    'Mechanical'
                                ]
                            },
                            {
                                topic: 'BUILD',
                                subtopics: [
                                    'Calculator',
                                    'Diwali lights',
                                    'Traffic light controller'
                                ]
                            },
                            {
                                topic: 'INNOVATE',
                                subtopics: [
                                    'Calculator'
                                ]
                            }
                        ],
                        price: {
                            currencyType: '₹',
                            currency: '4999'
                        }
                    }
                ]
            },*/
        ]
    }
    return (
        <div className="courses-main">
            <CoursesMain />
            <CoursesGrade grades={grades} activeGrade={activeGrade} setActiveGrade={setActiveGrade} />
            <CoursesCourses />
            <CoursesDetails />
            <CoursesBanner />
            <CoursesLearn />
            <CoursesInstructors />
            <CoursesTestimonials />
            <CoursesProjects />
            <CoursesGrowth />
            <CoursesFaq />
            {/* <CoursesDrivingFuture /> */}
            {/* <CoursesList courses={courses.courses} /> */}
            {/* <CoursesDetailedList courseGroups={activeCourseGroups} /> */}
        </div>
    )
}

export default Courses
