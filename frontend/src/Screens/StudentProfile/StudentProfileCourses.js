import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateCourses } from '../../Actions/StudentProfile'
import './css/StudentProfileCourses.css'
import courseImage from './img/courses.png'
import StudentProfileEditIcon from './StudentProfileEditIcon'

const AddCourse = ({courses, setCourses, setIsAddCourse}) => {
    const [heading, setHeading] = useState('')
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')

    const dispatch = useDispatch()
    
    const addCourseClickHandler = () => {
        if (heading && category && description) {
            const maxId = Math.max.apply(Math, courses.map(function(s) { return s.id; }))
            const coursesNew = [
                ...courses,
                {
                    id: maxId === -Infinity ? 0 : maxId+1,
                    heading,
                    category,
                    description,
                    isEnabled: true
                }
            ]
            dispatch(updateCourses(coursesNew))
            setCourses(coursesNew)
            setIsAddCourse(false)
        }
    }

    const setDescriptionHandler = (value) => {
        if(value.length <= 65) {
            setDescription(value)
        }
    }

    return (
        <div className="add-course-dialog">
            <input type="text" className="heading" value={heading} onChange={(e) => setHeading(e.target.value)} placeholder="Heading" />
            <input type="text"className="category" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Enter Category (Eg: Robotics)" />
            <textarea className="description" style={{textAlign: description.length ? "initial" : "center"}} value={description} onChange={(e) => setDescriptionHandler(e.target.value)} placeholder="Description (65 characters)" />
            <div className="actions">
                <button className="cancel" onClick={() => setIsAddCourse(false)}>CANCEL</button>
                <button className={`add${(!heading || !category || !description) ? " disabled" : ""}`} disabled={!heading || !category || !description} onClick={addCourseClickHandler}>ADD</button>
            </div>
        </div>
    )
}

const EditCourse = ({id, courses, setCourses, setIsEditCourse, setIsPopupOpen}) => {
    const objIndex = courses.findIndex((obj => obj.id === id))
    const [heading, setHeading] = useState(courses[objIndex].heading)
    const [category, setCategory] = useState(courses[objIndex].category)
    const [description, setDescription] = useState(courses[objIndex].description)

    const dispatch = useDispatch()
    
    const editCourseClickHandler = () => {
        if(objIndex >= 0) {
            const coursesNew = [
                ...courses.slice(0, objIndex),
                {...courses[objIndex], heading, category, description},
                ...courses.slice(objIndex+1)
            ]
            dispatch(updateCourses(coursesNew))
            setCourses(coursesNew)
            setIsEditCourse({value: false, id: -1})
        }
    }

    const setDescriptionHandler = (value) => {
        if(value.length <= 65) {
            setDescription(value)
        }
    }

    const deleteHandler = () => {
        const confirmed = window.screen.width > 600 && window.confirm('Are you sure want to delete this course ?')
        if(confirmed) {
            const coursesNew = courses.filter(c => {
                if(c.id !== id) {
                    return c
                }
            })
            dispatch(updateCourses(coursesNew))
            setCourses(coursesNew)
            setIsEditCourse({value: false, id: -1})
        }
        else {
            setIsPopupOpen(true)
            setTimeout(() => {
                setIsPopupOpen(false)
            }, 5000)
        }
    }

    return (
        <div className="edit-course-dialog">
            <input type="text" className="heading" value={heading} onChange={(e) => setHeading(e.target.value)} placeholder="Heading" />
            <input type="text"className="category" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Enter Category (Eg: Robotics)" />
            <textarea className="description" style={{textAlign: description.length ? "initial" : "center"}} value={description} onChange={(e) => setDescriptionHandler(e.target.value)} placeholder="Description (65 characters)" />
            <div className="actions">
                <button className="cancel" onClick={() => setIsEditCourse(false)}>CANCEL</button>
                <button className="delete" onClick={deleteHandler}>DELETE</button>
                <button className="save" onClick={editCourseClickHandler}>SAVE</button>
            </div>
        </div>
    )
}

const StudentProfileCourses = () => {
    const {courses: coursesArr, isEditView} = useSelector(state => state.studentProfile)
    const [coursesTemp, setCoursesTemp] = useState(coursesArr ? coursesArr : [])

    const [isAddCourse, setIsAddCourse] = useState(false)

    const [isEditCourse, setIsEditCourse] = useState({value: false, id: -1})

    const [courses, setCourses] = useState(coursesArr ? coursesArr : []) 

    const [activePage, setActivePage] = useState(0)
    const [totalPagesLastIndex, setTotalPagesLastIndex] = useState(0)
    const [isPopupOpen, setIsPopupOpen] = useState(false)

    const updateCourseIsEnabled = (id) => {
        const objIndex = courses.findIndex((obj => obj.id === id))
        if(objIndex >= 0) {
            setCourses([
                ...courses.slice(0, objIndex),
                {...courses[objIndex], isEnabled: !courses[objIndex].isEnabled},
                ...courses.slice(objIndex+1)
            ])
        }
    }

    useEffect(() => {
        if(coursesArr) {
            if(!isEditView) {
                setCoursesTemp(coursesArr)
                setCourses(coursesArr.filter(c => {
                    if(c.isEnabled) {
                        return c
                    }
                }))
            }
            else {
                setCourses(coursesArr)
            }
        }
    }, [coursesArr])

    useEffect(() => {
        const totalPagesLastIndexTemp = parseInt((courses.length-(isEditView && (courses.length < rowsPerPage * maxPages) ? 0 : 1))/rowsPerPage)
        if(totalPagesLastIndexTemp != totalPagesLastIndex) {
            setTotalPagesLastIndex(totalPagesLastIndexTemp)
        }
        if(activePage > totalPagesLastIndexTemp) {
            setActivePage(totalPagesLastIndexTemp)
        }
    }, [courses, isEditView])

    useEffect(() => {
        if(!isEditView) {
            setCoursesTemp(courses)
            setCourses(courses.filter(c => {
                if(c.isEnabled) {
                    return c
                }
            }))
        }
        else {
            setCourses(coursesTemp)
        }
    }, [isEditView])

    const maxPages = 5

    const rowsPerPage = 2

    return (
        <div id="student-profile-courses" className="student-profile-courses">
            <img src={courseImage} className="icon" />
            {isPopupOpen && <span className="popuptext">Please open the site in Desktop, Laptop or Tablet to add/delete your profile!</span>}
            {isAddCourse ? (
                <AddCourse courses={courses} setCourses={setCourses} setIsAddCourse={setIsAddCourse} />
            ) : isEditCourse.value ? (
                <EditCourse id={isEditCourse.id} courses={courses} setCourses={setCourses} setIsEditCourse={setIsEditCourse} setIsPopupOpen={setIsPopupOpen} />
            ) : (
                <div className="courses-container">
                    <div className="courses">
                        {(isEditView && activePage === 0 && courses.length < rowsPerPage * maxPages) && (
                            <div className="add-course-btn" onClick={() => {
                                if(window.screen.width > 600) {
                                    setIsAddCourse(true)
                                }
                                else {
                                    setIsPopupOpen(true)
                                    setTimeout(() => {
                                        setIsPopupOpen(false)
                                    }, 5000)
                                }
                            }}>
                                <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="plus" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="svg-inline--fa fa-plus fa-w-12 fa-3x plus-icon"><path fill="currentColor" d="M368 224H224V80c0-8.84-7.16-16-16-16h-32c-8.84 0-16 7.16-16 16v144H16c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h144v144c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16V288h144c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16z" className=""></path></svg>
                                <div>ADD COURSE</div>
                            </div>
                        )}
                        {courses.slice(activePage === 0 && (courses.length < rowsPerPage * maxPages) ? activePage * rowsPerPage : activePage * rowsPerPage - (isEditView ? 1 : 0), (activePage+1) * rowsPerPage - (isEditView && (courses.length < rowsPerPage * maxPages) ? 1 : 0) ).map(c => {
                            return (
                                <div key={c.id}>
                                    {isEditView && <StudentProfileEditIcon onClickHandler={() => setIsEditCourse({value:true, id: c.id})} />}
                                    <div className="course-content">
                                        <div className="category">{c.category}</div>
                                        <div className="heading">{c.heading}</div>
                                        <div className="description">{c.description}</div>
                                    </div>
                                    {isEditView && (window.screen.width > 600) && (
                                        <button onClick={() => updateCourseIsEnabled(c.id)} className={c.isEnabled ? "enabled" : "disabled"}>
                                            <div className="circle"></div>
                                        </button>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                    <div className="dots">
                        {[...Array(1 + totalPagesLastIndex).keys()]
                        .map(i => 
                            <div 
                            key={i} 
                            onClick={() => setActivePage(i)}
                            className={`dot-${i}${i === activePage ? " active" : ""}`}>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default StudentProfileCourses
