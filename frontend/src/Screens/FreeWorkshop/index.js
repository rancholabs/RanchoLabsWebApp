import React, { useEffect } from 'react'

import WorkshopMain from './WorkshopMain'
import WorkshopCards from './WorkshopCards'
import WorkshopBatch from './WorkshopBatch'
import WorkshopLearning from './WorkshopLearning'
import WorkshopTeam from './WorkshopTeam'
import WorkshopExperience from './WorkshopExperience'
import WorkshopFaq from './WorkshopFaq'

import {setDefaultHeader, updateHeader} from './../../Actions/Header'
// import {setWorkshopDetails } from './../../Actions/Payment'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import axios from 'axios'


const FreeWorkshop = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(updateHeader({backgroundColor: '#0A0E2A'}))
        return () => {
            dispatch(setDefaultHeader())
        }
    }, [])

    // const dispatch = useDispatch()
    // const { workshopId } = useParams()
    // const [workshop, setWorkshop] = useState(undefined)
    
    // useEffect(()=> {
    //     dispatch(updateHeader({backgroundColor: '#0A0E2A'}))
    //     axios.get(`/api/workshop/${workshopId}`)
    //     .then(json => {
    //         const workshopData = json.data
    //         if(workshopData) {
    //             setWorkshop(workshopData)
    //             dispatch(setWorkshopDetails({workshopId: workshopData._id, workshopPrice: workshopData.price}))
    //         }
    //     })
    //     .catch(err => console.log('Err Res:', err))
    //     return () => {
    //         dispatch(updateHeader({backgroundColor: undefined}))
    //         dispatch(setworkshopDetails({workshopId: undefined, workshopPrice: undefined}))
    //     }
    // }, [])

    document.title = "FreeWorkshop"
    const WorkshopDetails = {
        WorkshopSchedule : [
            {
                title : 'Day 1',
                content : [
                    "Introduction to Robotics and AI",  
                    "Arduino and its programming",
                    "Project: Diwali Lights",
                    "Project: Traffic Light Controller"
              ]
            },
            {
                title : 'Day 2',
                content : [
                    "Electrical Components",  
                    "Sensors", 
                    "Programming", 
                    "Project: Stalker Guard",  
                    "Innovation Project"
                ]
            },
            {
                title : "Learners  Outcome",
                content : [
                    "Learn fundamentals of Robotics",
                    "Know about electrical, mechanical and programming",
                    "Bring your own ideas to life"
                ]
            }
        ],

        faqs: [
            {
                question: 'What are the pre-requisites to attend this program?',
                answer: 'There are no pre-requisites for the program. But you must have good internet and a laptop/computer to attend the classes and to do the assignments and projects.'
            },
            {
                question: 'Who is eligible to apply for this program?',
                answer: 'Anyone who loves building machines, break and build electronic stuff is eligible to attend the program.'
            },
            {
                question: 'Is this program fully online? Do we need to buy components to learn this workshop?',
                answer: 'Yes, the program is fully online and all the electronic components are being used in a virtual environment using tinkercad. It is good if you have components but it is not required to learn this workshop. The whole workshop components can be simulated in the environment environment.'
            }
        ],
        batch: {
            durationInHours : 12,
            durationPerWeek: 3,
            noOfWeeks: 4,
            batches: [
                '30 Jul - 1 Aug 2020 | 5pm to 7pm IST',
                '1 Aug - 2 Aug 2020 | 5pm to 7pm IST',
                '3 Aug - 4 Aug 2020 | 5pm to 7pm IST',
                '5 Jul - 6 Aug 2020 | 5pm to 7pm IST'
            ]
        },
        
    }

    return(
        <div style={{backgroundColor: '#0A0E2A'}}>
        <WorkshopMain />
        <WorkshopCards />
        <WorkshopBatch batch={WorkshopDetails.batch} />
        <WorkshopTeam />
        <WorkshopLearning />
        <WorkshopExperience />
        <WorkshopFaq faqs={WorkshopDetails.faqs} />
        </div>
    )
}


export default FreeWorkshop