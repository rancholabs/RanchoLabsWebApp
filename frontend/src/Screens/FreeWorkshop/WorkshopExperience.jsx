import React from 'react'
import { Carousel } from 'react-responsive-carousel';

import user from './img/user2.png'
import './css/WorkshopExperience.css'
import Karandeep from './img/karandeep.jpeg'
import Siddharth from './img/siddharth.jpg'
import varyam from './img/varyam.PNG'
import kanav from './img/kanav.jpeg'
import aryan from './img/aryan.jpeg'

const testimonials = [
    {
        "name": "Karandeep Singh",
        "description": "I liked the program as it has been very useful,educative and innovative for me. It brings the creativity out of the students. All this has been possible due to the wonderful guidance of the zealous instructors. I am really very thankful to the entire team for providing me this wonderful opportunity of learning about Robotics.",
        "class": "Class 11th",
        "school": "Dayawati Modi Academy, Uttar Pradesh",
        "img" : Karandeep
    },
    {
        "name": "Aryan Verma",
        "description": "My experience with Rancho Labs has been great so far! The fact that they are providing courses to students with no prior experience at such nominal fee amazes me. They pay close attention to each student with small batches and don’t move a step forward until the doubts of every student has been cleared. I would highly recommend others to enroll with them as soon as possible!",
        "class": "Class 12th",
        "school": "School- GD Goenka, Vasant Kunj, New Delhi",
        "img" : aryan
    },
    {
        "name": "Varyam Gupta",
        "description": "Although learning how to build robots, circuits and innovative projects seems like a hands-on activity, the amazing team at Rancho Labs has managed to achieve this feat on a virtual platform as well. Over the course of a month, I have gained a vast amount of knowledge in this field, and the projects that we have to make have really fascinated me. The best part of Rancho Labs is that they prepare you for the present as well as the future.",
        "class": "Class 11th",
        "school": "The Doon School, Dehradun",
        "img" : varyam
    },
    {
        "name": "Kanav Atre",
        "description": "The course is seeming to interest me more than I thought it would and despite of the current covid19 situation, the team (Anshul sir, Aman sir & Rohan sir) is really able to explain the concepts and especially with help of the tincercad software, I am able to comprehend that how circuits work and I am also able to understand arduino programming and coding. Finally, I would say that I found the course very interesting and I would look forward to joining courses like these in future.",
        "class": "Class 11th",
        "school": "Delhi Public School Indirapuram, New Delhi",
        "img" : kanav
    },
    {
        "name": "Vandhana(Siddharth Mother)",
        "description": "The Robotics course by Rancho Labs has been a great learning experience for Siddharth. The claases were well planned and executed and the instructors were available round the clock to clarify doubts.  Hands on projects in stimulated environments helped students to reinforce concepts learned every day. I am happy to have enrolled my son in this course,  as it has given a solid foundation to 'future proof' his skill sets.",
        "class": "Class 7th student",
        "school": "St Thomas Residential School - Kerala",
        "img" : Siddharth
    }
]


function ScrollCard(testimony) {
    return (
        <div class="experience-card">
            <div className="card">
                <div className="exp-desc">{testimony.description}</div>
                <div className="student-details">
                    <div className="row">
                        <div className="col-2 pr-2">
                            <img className="img-fluid" src={testimony.img}></img>
                        </div>
                        <div className="col-10" style={{ alignSelf: "center" }}>
                            {testimony.name} <br /> {testimony.school}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

function MobileTestimonialItem(testimony) {
    return (
            <>
            <div className="row">
                <div className="col-4" style={{ alignSelf: "center" }}>
                    <img className="img-fluid" src={testimony.img}></img>
                </div>
                <div className="col-8 pl-0">
                    <div className="student-details">
                        {testimony.name} <br />Class - {testimony.class} <br />School - {testimony.school}
                    </div>
                </div>
            </div>
            <div className="experience-desc">{testimony.description}</div>
            </>
    )
}

function MobileTestimonial()
{
    return(
    <div className="MobileExp">
    <Carousel infiniteLoop useKeyboardArrows>
        {
            testimonials.map(MobileTestimonialItem)
        }
    </Carousel>
    </div>
    )
}

function DesktopTestimonial() {
    return (
        <div>
            <div className="review-title">Workshop Reviews</div>
            <div className="DesktopExp">
                {
                    testimonials.map(ScrollCard)
                }
            </div>
        </div>
    )
}

function Experience() {
    return (
        <div className="WorkshopExperience">
            <MobileTestimonial />
            <DesktopTestimonial />
        </div>
    )
}

export default Experience