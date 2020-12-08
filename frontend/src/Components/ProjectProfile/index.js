import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { GetUser } from '../../Actions/userAction'
import './index.css'

const ProjectProfile = () => {
    const [isProfileVisible, setIsProfileVisible] = useState(true)
    const history = useHistory()
    const navCloseHandler = () => {
        //setIsProfileVisible(false)
        history.goBack()
    }

    const {previewOpenHandler, projectUploadHandler} = useSelector((state) => state.projectPreview)
    const {userInfo : userLoginInfo} = useSelector((state) => state.userLogin)
    const {userInfo} = useSelector((state) => state.userInfoBasic)

    const dispatch = useDispatch()

    console.log(userInfo)

    useEffect(() => {
        if(userLoginInfo) {
            dispatch(GetUser())
        }
    }, [userLoginInfo])

    return (
        <>
        {isProfileVisible && (
            <div className="project-profile">
                <div>
                    <div className="box">
                        <img src={userInfo && userInfo.profilePic && userInfo.profilePic.filePath ? userInfo.profilePic.filePath : ''} className="profile" />
                        <div className="name-box">
                            <div className="name">Hi, {userInfo && userInfo.name && userInfo.name.first ? userInfo.name.first : ''.toUpperCase()}</div>
                            <div className="message">Start giving shape to your work</div>
                            <div className="upload-btn">
                                <div onClick={() => projectUploadHandler()} className="box">UPLOAD</div>
                            </div>
                        </div>
                    </div>
                    <svg onClick={() => navCloseHandler()} aria-hidden="true" focusable="false" data-prefix="fal" data-icon="times" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="svg-inline--fa fa-times fa-w-10 fa-3x nav-close"><path fill="currentColor" d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z" className=""></path></svg>
                    <div onClick={() => previewOpenHandler()} className="preview-btn">PREVIEW</div>
                </div>
            </div>
        )}
        </>
    )
}

export default ProjectProfile
