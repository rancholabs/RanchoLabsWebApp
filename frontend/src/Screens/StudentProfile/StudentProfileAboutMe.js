import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { updateAboutMe } from '../../Actions/StudentProfile'
import './css/StudentProfileAboutMe.css'
import Book from './img/book.png'
import Studied from './img/studied.png'
import StudentProfileEditIcon from './StudentProfileEditIcon'

const StudentProfileAboutMe = () => {
    const {user: {description}, academic: {grade, schoolDetails}, isEditView} = useSelector(state => state.studentProfile)
    const [isEditing, setIsEditing] = useState(false)
    const [editingState, setEditingState] = useState({})
    const [state, setState] = useState({about: description ? description : '', grade: grade ? grade : '', school: schoolDetails ? `${schoolDetails.name} - ${schoolDetails.location}` : ''})
    
    const dispatch = useDispatch()

    const cancelHandler = () => {
        setEditingState({})
        setIsEditing(false)
    }

    const saveHandler = () => {
        dispatch(updateAboutMe(editingState))
        setState(editingState)
        setIsEditing(false)
    }

    const openEditingMode = () => {
        setEditingState(state)
        setIsEditing(true)
    }

    const editingStateHandler = (key, value) => {
        setEditingState({...editingState, [key]: value})
    }

    useEffect(() => {
        setState({about: description ? description : '', grade: grade ? grade : "", school: schoolDetails ? `${schoolDetails.name} - ${schoolDetails.location}` : ''})
    }, [description, grade, schoolDetails])

    return (
        <div id="student-profile-about-me" className="student-profile-about-me">
            <div className={isEditing ? "editing-mode" : ""}>
                {!isEditing && isEditView && <StudentProfileEditIcon onClickHandler={openEditingMode} />}
                <div className="about">
                    {
                        !isEditing ? 
                        state.about ? state.about : 'About Me' 
                        : 
                        <textarea 
                            value={editingState.about ? editingState.about : ''} 
                            placeholder="About Me" 
                            onChange={(e) => editingStateHandler('about', e.target.value)} 
                        />
                    }
                </div>
                <div className="agrade">
                    <img className="icon" src={Book} />
                    <div className="desc">
                        {
                            !isEditing ? 
                            state.grade ? state.grade : "Class you study in (eg:10th)"
                            : 
                            <select
                                value={editingState.grade ? editingState.grade : ""}
                                onChange={(e) => editingStateHandler('grade', e.target.value)} 
                            >
                                <option value="">Class you study in (eg:10th)</option>
                                {[...Array(7).keys()].map((o, idx) => {
                                    return <option key={idx} value={o+6}>{o+6}</option>
                                })}
                            </select>
                        }
                    </div>
                </div>
                <div className="school">
                    <img className="icon" src={Studied} />
                    <div className="desc">
                        {
                            !isEditing ? 
                            state.school ? state.school : "School you study in (eg:Delhi Public School)"
                            : 
                            <input 
                                type="text" 
                                value={editingState.school ? editingState.school : ''} 
                                placeholder="School you study in (eg:Delhi Public School)" 
                                onChange={(e) => editingStateHandler('school', e.target.value)}
                            />
                        }
                    </div>
                </div>
                {isEditing && (
                    <div className="btns">
                        <div>
                            <button onClick={cancelHandler} className="cancel-btn">CANCEL</button>
                            <button onClick={saveHandler} className="save-btn">SAVE {window.screen.width <= 800 ? "" : "CHANGES"}</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default StudentProfileAboutMe
