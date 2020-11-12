import React from 'react'
import './css/CourseReview.css'
import { Carousel } from 'react-responsive-carousel'

const CourseReview = ({reviews}) => {
    return (
        <div className="course-review course-margin">
            <Carousel showStatus={false} showThumbs={false} showArrows={true} showIndicators={false} infiniteLoop useKeyboardArrows>
                {
                    reviews.map((review, ri) => {
                        const {name, grade, school, review: revw, image} = review
                        return (
                            <div className="center" key={ri}>
                                <div>
                                    <div className="profile">
                                        <img src={image ? image.filePath : ''} className="img" />
                                        <div className="details">
                                            <p>{name}</p>
                                            <p>Class - {grade}th</p>
                                            <p>{school.name} - {school.location}</p>
                                        </div>
                                    </div>
                                    <div className="review">"{revw}"</div>
                                </div>
                            </div>
                        )
                    })
                }
            </Carousel>
        </div>
    )
}

export default CourseReview
