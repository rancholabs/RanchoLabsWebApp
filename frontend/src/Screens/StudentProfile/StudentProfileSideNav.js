import { faShare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useRef, useState } from 'react'
import './css/StudentProfileSideNav.css'
import StudentProfileEditIcon from './StudentProfileEditIcon'
import CameraImg from './img/camera.png'
import CameraBackgroundImg from './img/camera-background.png'
import ExtracurricularImg from './img/extracurricular_small.png'
import SkillsImg from './img/skills_small.png'
import ProjectImg from './img/project_small.png'
import InnovationImg from './img/innovation_small.png'
import CourseImg from './img/courses_small.png'
import CertificateImg from './img/certificate_small.png'
import { enableEditing, setIsShareOpen, updateProfile, updateProfilePic } from '../../Actions/StudentProfile'
import { useDispatch, useSelector } from 'react-redux'
import StudentProfileShareBtns from './StudentProfileShareBtns'

const NavItem = ({props}) => {
    const {ref, label, iconImg : icon} = props
    const redirectToHash = () => {
        const element = document.getElementById(ref)
        if(element) {
            element.scrollIntoView()
        }
    }
    return (
        <div onClick={redirectToHash} className="nav-item" >
            <img src={icon} />
            <div>{label}</div>
        </div>
    )
}

const StudentProfileSideNav = () => {
    const {_id, user: {profilePic, name}, aim, isEditView} = useSelector(state => state.studentProfile)
    const [isEditNameAim, setIsEditNameAim] = useState(false)
    const [nameState, setNameState] = useState({name: name ? name : '', aim: aim ? aim : ''})
    const [editNameState, setEditNameState] = useState({})
    const [image, setImage] = useState(profilePic ? profilePic : '')
    const nameContainerRef = useRef()
    const navRef = useRef()

    const dispatch = useDispatch()

    useEffect(() => {
        setNameState({name: name ? name : '', aim: aim ? aim : ''})
    }, [name, aim])

    useEffect(() => {
        if(profilePic) {
            setImage(profilePic)
        }
    }, [profilePic])

    useEffect(() => {
        const hideNameRefOnMatch = () => {
            if(((nameContainerRef.current.scrollHeight > 0) && (window.scrollY > nameContainerRef.current.scrollHeight)) || ((navRef.current.scrollHeight > 0) && (window.scrollY > navRef.current.scrollHeight))) {
                nameContainerRef.current.style.display = "none";
                navRef.current.style.display = "block";
            }
            else {
                nameContainerRef.current.style.display = "block";
                navRef.current.style.display = "none";
            }
        }
        window.addEventListener('scroll', hideNameRefOnMatch)
        hideNameRefOnMatch()

        return () => {
            window.removeEventListener('scroll', hideNameRefOnMatch)
        }
    }, [])

    const editNameStateHandler = (key, value) => {
        setEditNameState({...editNameState, [key]: value})
    }

    const cancelNameEditHandler = () => {
        setEditNameState({})
        setIsEditNameAim(false)
    }

    const saveNameEditHandler = () => {
        if(editNameState.name && (typeof editNameState.name !== "object")) {
            const nameArr = editNameState.name.split(' ')
            const name = {
                first: '',
                last: ''
            }
            if(nameArr.length > 1) {
                name.first = nameArr.slice(0, -1).join(' ')
                name.last = nameArr.slice(-1).join(' ')
            }
            const newState = {...editNameState, name}
            dispatch(updateProfile(newState))
            setNameState(newState)
        }
        else {
            dispatch(updateProfile(editNameState))
            setNameState(editNameState)
        }
        setIsEditNameAim(false)
    }

    const changeImageHandler = (image) => {
        dispatch(updateProfilePic(image))
        setImage(image)
    }

    const openEditNameMode = () => {
        setEditNameState(nameState)
        setIsEditNameAim(true)
    }

    const readURL = (file, id) => {
        const reader = new FileReader()
        reader.onload = () => {
            document.getElementById(id).src = reader.result
        }
        reader.readAsDataURL(file)
    }

    const readImage = image => {
        readURL(image, "profile-image")
        return ''
    }

    const shareWebsite = () => {
        dispatch(setIsShareOpen({type: 'profile', id: _id}))
    }

    const navItems = [
        {
            iconImg: ExtracurricularImg,
            label: 'EXTRACURRICULAR',
            ref: 'student-profile-extracurricular'
        },
        {
            iconImg: SkillsImg,
            label: 'SKILLS',
            ref: 'student-profile-skills'
        },
        {
            iconImg: ProjectImg,
            label: 'PROJECTS',
            ref: 'student-profile-projects'
        },
        {
            iconImg: InnovationImg,
            label: 'INNOVATION',
            ref: 'student-profile-innovations'
        },
        {
            iconImg: CourseImg,
            label: 'COURSES',
            ref: 'student-profile-courses'
        },
        {
            iconImg: CertificateImg,
            label: 'CERTIFICATE',
            ref: 'student-profile-certificates'
        }
    ]

    return (
        <div className="student-profile-side-nav">
            <div className="image-container">
                <div className="image">
                    {image || image.filePath ? (
                        <img id="profile-image" className="main-image" src={image.filePath ? image.filePath : typeof image === "object" ? readImage(image) : ''} />
                    ) : (
                        <>
                            <img src={CameraBackgroundImg} className="back-image" />
                            <div className="front-circle" />
                            <img src={CameraImg} className="front-image" />
                        </>
                    )}
                    <input type="file" className="image-file" accept="image/*" 
                    onChange={(e) => {
                        let files = e.target.files
                        changeImageHandler(files[0])
                    }} />
                </div>
            </div>
            <div ref={nameContainerRef} className="name-container">
                <div className="label">HELLO I'AM</div>
                <div className="box">
                    {isEditNameAim ? (
                        <>
                            <input type="text" placeholder="YOUR NAME" value={(typeof editNameState.name === "object") ? `${editNameState.name.first} ${editNameState.name.last}` : editNameState.name ? editNameState.name : ''} onChange={(e) => editNameStateHandler('name', e.target.value) }/>
                            <input type="text" placeholder="I want to become a Coder" value={editNameState.aim} onChange={(e) => editNameStateHandler('aim', e.target.value) }/>
                            <div className="actions">
                                <button className="cancel" onClick={cancelNameEditHandler}>CANCEL</button>
                                <button className="save" onClick={saveNameEditHandler}>SAVE</button>
                            </div>
                        </>
                    ) : (
                        <>
                            {isEditView && <StudentProfileEditIcon onClickHandler={openEditNameMode} />}
                            <div className="name">{nameState.name ? `${nameState.name.first} ${nameState.name.last}` : 'YOUR NAME'}</div>
                            <div className="aim">{nameState.aim ? nameState.aim : 'I want to become a Coder'}</div>
                        </>
                    )}
                </div>
            </div>
            <div ref={navRef} className="nav">
                {navItems.map((item, idx) => <NavItem key={idx} props={item} />)}
            </div>
            {isEditView && <button onClick={() => {dispatch(enableEditing(false))}} className="preview-website">Preview your website</button>}
            <div className="share-website" onClick={() => shareWebsite()}>
                <div>Share {isEditView ? "your " : ""}website</div>
                <button><FontAwesomeIcon className="share-icon" icon={faShare} /></button>
            </div>
        </div>
    )
}

export default StudentProfileSideNav
