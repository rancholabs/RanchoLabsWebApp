import React, { useEffect, useState } from 'react'
import './css/index.css'

import CourseHeader from './CourseHeader'
import CourseView from './CourseView'
import CourseLearn from './CourseLearn'
import CourseBuild from './CourseBuild'
import CourseInnovate from './CourseInnovate'
import CourseStructure from './CourseStructure'
import CourseBatch from './CourseBatch'
import CourseOutcome from './CourseOutcome'
import CourseReview from './CourseReview'
import CourseGroundInnovation from './CourseGroundInnovation'
import CourseSignup from './CourseSignup'
import CourseLearningHome from './CourseLearningHome'
import CourseInstructors from './CourseInstructors'
import CourseFaq from './CourseFaq'
import RoboticsCurriculum from '../files/RoboticsCurriculum.pdf'

import {setDefaultHeader, updateHeader} from './../../Actions/Header'
import {setCourseDetails } from './../../Actions/Payment'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { updateLocation } from '../../Actions/App'

const Course = ({location}) => {
    const dispatch = useDispatch()
    const { courseId } = useParams()
    const [course, setCourse] = useState(undefined)
    
    useEffect(()=> {
        dispatch(updateHeader({backgroundColor: '#0A0E2A'}))
        dispatch(updateLocation(location))
        axios.get(`/api/course/${courseId}`)
        .then(json => {
            const courseData = json.data
            if(courseData) {
                setCourse(courseData)
                dispatch(setCourseDetails({courseId: courseData._id, coursePrice: courseData.price}))
            }
        })
        .catch(err => console.log('Err Res:', err))
        return () => {
            dispatch(setDefaultHeader())
        }
    }, [])

    document.title = 'Course'
    const innovationSteps = [
        'Propose the problem that you want to solve, get it refined with the help of your mentor',
        'Brainstorm, research and come up with different ways to solve the problem',
        'Finalize the solution with the help of mentor and design the circuit and simulate it',
        'Order components and program it'
    ]
    const groundInnovation = {
        title: 'Title here',
        subTitle: 'Subtitle here',
        link: ''
    }
    const courseDetails = {
        name: 'Robotics for Beginners',
        shortDesc: 'A Foundation Program in Robotics for School students of class 8th to 12th'.split(/school students/i),
        level: 'Beginners',
        preReq: 'None',
        duration: 12,
        currencyCode: 'INR',
        currency: 4999,
        overview: 'Robotics is a powerful tool to understand the basic concepts of Computer Science, Mechanical engineering, and Electronics engineering. In this program you will build a strong foundation in Robotics by learning different Electronics & Electrical concepts and components, Mechanical concepts and mechanism and programming. You will be building many robots and projects throughout the course using Arduino.',
        keywordView: 'After this course, you will be able to create devices that read the data about the external world with a variety of sensors, receive and forward this data to a PC, and mobile devices, and control the movement. The creation of such devices will involve design, the study of their components, the assemblage of circuit boards, coding and diagnostics.',
        learns: [
            {
                topic: 'Electrical',
                descs: [
                    'You will learn about many electrical components, connecting and communicating with different devices, programming them to do the required task.',
                    'Components covered: Arduino, Micro-controllers Ultrasonic Sensor, Servo Motors, Push Button, Keypad, LCD and Motor Driver'
                ]
            },
            {
                topic: 'Arduino Programming',
                descs: [
                    'Arduino is a microcontroller which is used to control other devices. You will learn how to program Arduino to communicate and control the other devices.',
                    'Programming covered: Print, If else, else if, for loop, while loop, 1D, 2D & 3D Array, functions, digitalRead, digitalWrite, pulseIn and different libraries'
                ]
            },
            {
                topic: 'Mechanical',
                descs: [
                    'In Mechanical, you will learn about rotation, variable speed, drive and about functioning of motors and their control to build automated door and robotics arms.'
                ]
            }
        ],
        builds: [
            {
                topic: 'TRAFFIC LIGHT CONTROLLER',
                img: ''
            },
            {
                topic: 'SOCIAL DISTANCING PROJECT',
                img: ''
            },
            {
                topic: 'OBSTACLE AVOIDING ROBOT',
                img: ''
            },
            {
                topic: 'DIWALI LIGHTS',
                img: ''
            },
            {
                topic: 'CALCULATOR',
                img: ''
            },
            {
                topic: 'AUTOMATED DOOR',
                img: ''
            }
        ],
        innovate: {
            items: [
                {
                    desc: 'By learning about different electrical components, programming and mechanical concepts and by building a series of awesome projects that connect you with real-life problem solving and stretching your mind to work on real-problems helps you build logical and creative thinking, you are ready solve many problems of the world.',
                    img: ''
                }
            ],
            steps: [
                'Propose the problem that you want to solve, get it refined with the help of your mentor',
                'Brainstorm, research and come up with different ways to solve the problem',
                'Finalize the solution with the help of mentor and design the circuit and simulate it',
                'Order components and program it'
            ]
        },
        structure: RoboticsCurriculum,
        batch: {
            durationInHours : 12,
            durationPerWeek: 3,
            noOfWeeks: 4,
            batches: [
                '1 Aug - 30 Aug 2020',
                '1 Sep - 30 Sep 2020'
            ]
        },
        outcomes: [
            'Build 10 Projects during the course from scratch',
            'Solve a Real-Life Problem at the end of the course',
            'Master the Fundamentals of programming with C/C++',
            'Electronics and Electrical Concepts',
            'Mechanical Concepts and Mechanism',
            'Bring your ideas to reality'
        ],
        reviews: [
            {
                name: 'Vandhana(Siddharth Mother)',
                grade: '7',
                school: 'St Thomas Residential School - Kerala',
                review: '"The Robotics course by Rancho Labs has been a great learning experience for Siddharth. The claases were well planned and executed and the instructors were available round the clock to clarify doubts.  Hands on projects in stimulated environments helped students to reinforce concepts learned every day. I am happy to have enrolled my son in this course,  as it has given a solid foundation to \'future proof\' his skill sets."'
            },
            {
                name: 'Karandeep Singh',
                grade: '11',
                school: 'Dayawati Modi Academy ,Uttar Pradesh',
                review: '"I liked the program as it has been very useful,educative and innovative for me. It brings the creativity out of the students. All this has been possible due to the wonderful guidance of the zealous instructors. I am really very thankful to the entire team for providing me this wonderful opportunity of learning about Robotics."'
            },
            {
                name: 'Aryan Verma',
                grade: '12',
                school: 'School- GD Goenka, Vasant Kunj, New Delhi',
                review: '"My experience with Rancho Labs has been great so far! The fact that they are providing courses to students with no prior experience at such nominal fee amazes me. They pay close attention to each student with small batches and don’t move a step forward until the doubts of every student has been cleared. I would highly recommend others to enroll with them as soon as possible!"'
            },
            {
                name: 'Varyam Gupta',
                grade: '11',
                school: 'The Doon School, Dehradun',
                review: '"Although learning how to build robots, circuits and innovative projects seems like a hands-on activity, the amazing team at Rancho Labs has managed to achieve this feat on a virtual platform as well. Over the course of a month, I have gained a vast amount of knowledge in this field, and the projects that we have to make have really fascinated me. The best part of Rancho Labs is that they prepare you for the present as well as the future, by making you think like an innovator and understand what failure and persistence look like. On numerous occasions I have reached out to them for even the smallest of doubts and I have always been helped and supported by the team. Rancho Labs for me has been an experience I will cherish, an opportunity that I was lucky enough to get, and I urge all of you to grasp this gem of an opportunity."'
            },
            {
                name: 'Kanav Atre',
                grade: '11',
                school: 'Delhi Public School Indirapuram, New Delhi',
                review: '"The course is seeming to interest me more than I thought it would and despite of the current covid19 situation, the team (Anshul sir, Aman sir & Rohan sir) is really able to explain the concepts and especially with help of the tincercad software, I am able to comprehend that how circuits work and I am also able to understand arduino programming and coding. Finally, I would say that I found the course very interesting and I would look forward to joining courses like these in future."'
            }
        ],
        groundInnovation: {
            title: 'Title here',
            subTitle: 'Subtitle here',
            link: ''
        },
        instructors: [
            {
                name: 'Rohan yuttham',
                img: '',
                desc: 'Robotics Head, Rancho Labs Overall Coordinator, Robotics Club, IIT Delhi'
            },
            {
                name: 'Aman Kumar',
                img: '',
                desc: 'Co-founder, Rancho Labs B.Tech, IIT Delhi'
            }
        ],
        faqs: [
            {
                ques: 'What are the pre-requisites to attend this program?',
                ans: 'There are no pre-requisites for the program. But you must have good internet and a laptop/computer to attend the classes and to do the assignments and projects.'
            },
            {
                ques: 'Who is eligible to apply for this program?',
                ans: 'Anyone who loves building machines, break and build electronic stuff is eligible to attend the program.'
            },
            {
                ques: 'Is this program fully online? Do we need to buy components to learn this course?',
                ans: 'Yes, the program is fully online and all electronic components are being used in a virtual environment using tinkercad. The whole course components can be simulated in the virtual environment. Students learn logic, coding and how to operate different electrical and electronic components.'
            }
        ]
    }

    const { _id: id, overview, detailedView, learns, builds, innovates, 
        courseStructure, batches, durationInHours, hoursPerWeek,
        NoOfWeeks, outcomes, reviews, instructors, faqs } = course ? course : {}

    return (
        <>
            {course && (
                <>
                    <CourseHeader courseDetails={course} />
                    <CourseView overview={overview} detailedView={detailedView} />
                    <CourseLearn learns={learns} />
                    <CourseBuild builds={builds} />
                    <CourseInnovate innovates={innovates} steps={innovationSteps} />
                    <CourseStructure structure={courseStructure ? courseStructure.filePath : ''} />
                    <CourseBatch batches={batches} noOfWeeks={NoOfWeeks} durationInHours={durationInHours} hoursPerWeek={hoursPerWeek} id={id} />
                    <CourseOutcome outcomes={outcomes} />
                    <CourseReview reviews={reviews} />
                    <CourseGroundInnovation innovation={groundInnovation} />
                    <CourseSignup />
                    <CourseLearningHome />
                    <CourseInstructors instructors={instructors} />
                    <CourseFaq faqs={faqs} />
                </>
            )}
        </>
    )
}

export default Course
