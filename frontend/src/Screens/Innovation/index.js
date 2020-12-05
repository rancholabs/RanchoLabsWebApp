import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setDefaultHeader, updateHeader } from '../../Actions/Header'
import { AddPreviewOpenHandler, AddUploadHandler, FormUploadedHandler, GetInnovation, UpdatePreviewSaveHandler, UploadInnovation } from '../../Actions/InnovationPreview'
import './css/index.css'
import InnovationBrief from './InnovationBrief'
import InnovationComments from './InnovationComments'
import InnovationHeading from './InnovationHeading'
import InnovationPreview from './InnovationPreview'
import InnovationSteps from './InnovationSteps'

const Innovation = ({history, location}) => {
    const {userInfo} = useSelector((state) => state.userLogin)
    const dispatch = useDispatch()
    const navBar = useRef()
    const innovationIdParams = location.search ? location.search.split("=")[1] : ''

    useEffect(() => {

        if(!userInfo) {
            history.replace('/login?redirect=/innovation')
        }
        else {
            if(innovationIdParams) {
                dispatch(GetInnovation(innovationIdParams))
            }
        }

    }, [userInfo])
    useEffect(() => {

        dispatch(updateHeader({isVisible: false}))

        return () => {
            dispatch(setDefaultHeader())
        }
    }, [])

    useEffect(() => {
        if(userInfo) {
            const currentScrollTop = navBar.current.offsetTop
            const handleScroll = () => {
                if(window.scrollY >= currentScrollTop) {
                navBar.current.classList.add('fixed')  
                }
                else {
                    navBar.current.classList.remove('fixed')
                }
            }
            window.addEventListener('scroll', handleScroll)

            return () => {
                window.removeEventListener('scroll', handleScroll)
            }
        }
    }, [])

    const {previewSaveHandler, innovationId, isFormUploaded, isUploaded: isUploadedState} = useSelector((state) => state.innovationPreview)

    const navItems = [
        {className: 'head', displayName: 'HEADING', getComponent: () => <InnovationHeading />},
        {className: 'brief', displayName: 'BRIEF', getComponent: () => <InnovationBrief />},
        {className: 'steps', displayName: 'STEPS', getComponent: () => <InnovationSteps />},
        {className: 'comments', displayName: 'COMMENTS', getComponent: () => <InnovationComments />}
    ]

    const [activeNav, setActiveNav] = useState(0)
    const [isPreviewOpen, setIsPreviewOpen] = useState(false)
    const [isUploaded, setIsUploaded] = useState(false)

    const previewOpenHandler = () => {
        setIsPreviewOpen(true)
    }

    const previewCloseHandler = () => {
        setIsPreviewOpen(false)
    }

    const uploadHandler = () => {
        dispatch(UploadInnovation())
    }

    useEffect(() => {
        dispatch(AddPreviewOpenHandler(previewOpenHandler))
        dispatch(AddUploadHandler(uploadHandler))
    }, [])

    useEffect(() => {
        if(isFormUploaded && isUploadedState) {
            setIsUploaded(true)
            setTimeout(() => {
                setIsUploaded(false)
                dispatch(FormUploadedHandler(false))
            }, 5000)
        }
    }, [isUploadedState, isFormUploaded])
    
    const navClickHandler = (idx) => {
        setActiveNav(idx)
        window.scrollTo(0, 0)
    }

    const navPrevHandler = () => {
        setActiveNav(activeNav-1)
        window.scrollTo(0, 0)
    }

    const navNextHandler = () => {
        if(activeNav + 1 < navItems.length) {
            setActiveNav(activeNav+1)
            window.scrollTo(0, 0)
        }
        else {
            previewOpenHandler()
        }
    }

    const saveHandler = () => {
        previewSaveHandler()
        navNextHandler()
    }

    return (
        <>
        {userInfo && (
            <div className="stud-innovation">
                <div className="stud-innovation-nav">
                    <div className="fixed-wrapper">
                        <div ref={navBar}>
                            {
                                navItems.map((item, idx) => {
                                    return <div key={idx} className={item.className} onClick={() => navClickHandler(idx)}>{item.displayName}</div>
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="stud-innovation-main">
                    {
                        navItems[activeNav].getComponent()
                    }
                </div>
                <div className="stud-innovation-footer">
                    <div>
                        {activeNav !== 0 && <svg onClick={navPrevHandler} aria-hidden="true" focusable="false" data-prefix="far" data-icon="arrow-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="svg-inline--fa fa-arrow-left fa-w-14 fa-3x left-arrow"><path fill="currentColor" d="M229.9 473.899l19.799-19.799c4.686-4.686 4.686-12.284 0-16.971L94.569 282H436c6.627 0 12-5.373 12-12v-28c0-6.627-5.373-12-12-12H94.569l155.13-155.13c4.686-4.686 4.686-12.284 0-16.971L229.9 38.101c-4.686-4.686-12.284-4.686-16.971 0L3.515 247.515c-4.686 4.686-4.686 12.284 0 16.971L212.929 473.9c4.686 4.686 12.284 4.686 16.971-.001z" className=""></path></svg>}
                        <div className="btns">
                            <div onClick={saveHandler}>Save</div>
                            <div>Cancel</div>
                        </div>
                        {activeNav !== navItems.length-1 && <svg onClick={navNextHandler} aria-hidden="true" focusable="false" data-prefix="far" data-icon="arrow-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="svg-inline--fa fa-arrow-right fa-w-14 fa-3x right-arrow"><path fill="currentColor" d="M218.101 38.101L198.302 57.9c-4.686 4.686-4.686 12.284 0 16.971L353.432 230H12c-6.627 0-12 5.373-12 12v28c0 6.627 5.373 12 12 12h341.432l-155.13 155.13c-4.686 4.686-4.686 12.284 0 16.971l19.799 19.799c4.686 4.686 12.284 4.686 16.971 0l209.414-209.414c4.686-4.686 4.686-12.284 0-16.971L235.071 38.101c-4.686-4.687-12.284-4.687-16.97 0z" className=""></path></svg>}
                    </div>
                    {(activeNav === navItems.length-1 && innovationId) && <div className="upload-btn" onClick={uploadHandler}>UPLOAD</div>}
                </div>
                {isPreviewOpen && <InnovationPreview previewCloseHandler={previewCloseHandler} />}
                {isUploaded && <div className="uploaded">Innovation Uploaded Successfully.</div>}
            </div>
        )}
        </>
    )
}

export default Innovation
