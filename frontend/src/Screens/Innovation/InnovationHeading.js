import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { courseGroups } from '../../Actions/courseActions'
import { UpdatePreviewHeader, UpdatePreviewSaveHandler } from '../../Actions/InnovationPreview'
import './css/InnovationHeading.css'

const InnovationHeading = () => {
    const {coursegroups: courseGroupsList} = useSelector((state) => state.courseGroups)
    const categories = courseGroupsList && courseGroupsList.length ? courseGroupsList.map(c => c.name) : []
    const {header} = useSelector((state) => state.innovationPreview)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [heading, setHeading] = useState(header && header.heading ? header.heading : '')
    const [category, setCategory] = useState(header && header.category ? categories.includes(header.category) ? header.category : 'Others' : '')
    const [categoryOthers, setCategoryOthers] = useState(header && header.category ? header.category : '')
    const [image, setImage] = useState(header && header.image ? header.image : null)
    const [video, setVideo] = useState(header && header.video ? header.video : null)

    const readURL = (file, id) => {
        const reader = new FileReader()
        reader.onload = () => {
            document.getElementById(id).src = reader.result
        }
        reader.readAsDataURL(file)
    }

    const readImage = image => {
        readURL(image, "innovation-heading-image")
        return ''
    }

    const readVideo = video => {
        readURL(video, "innovation-heading-video")
        return ''
    }

    const delImage = () => {
        setImage(null)
    }
    const delVideo = () => {
        setVideo(null)
    }

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen)
    }

    const dropdownClickHandler = (value) => {
        setIsDropdownOpen(false)
        setCategory(value)
    }

    const dispatch = useDispatch()

    useEffect(() => {
        setHeading(header && header.heading ? header.heading : '')
        setCategory(header && header.category ? categories.includes(header.category) ? header.category : 'Others' : '')
        setCategoryOthers(header && header.category ? header.category : '')
        setImage(header && header.image ? header.image : null)
        setVideo(header && header.video ? header.video : null)
    }, [header])

    useEffect(() => {
        const previewSaveHandler = () => {
            dispatch(UpdatePreviewHeader({heading, category: category !== 'Others' ? category : categoryOthers, image: image, video: video}))
        }
        dispatch(UpdatePreviewSaveHandler(previewSaveHandler))
    }, [heading, category, categoryOthers, image, video])

    useEffect(() => {
        dispatch(courseGroups())
    }, [])

    return (
        <div className="innovation-heading">
            <div className="long-top-arrow"></div>
            <div className="long-right-arrow"></div>
            <div className="heading">
                <div className="label">
                    <div className="box">
                        <div className="text">
                            ADD INNOVATION HEADING
                            <span className="imp">*</span>
                        </div>
                    </div>
                </div>
                <input className="value" type="text" placeholder="ADD HEADING HERE" value={heading} onChange={(e) => setHeading(e.target.value)} />
            </div>
            <div className="category">
                <div className="label">
                    <div className="box" onClick={() => toggleDropdown()}>
                        <div className="text">
                            {category ? category : "ADD INNOVATION CATEGORY"}
                            {!isDropdownOpen ? <span className="down-arrow"><FontAwesomeIcon icon={faCaretDown} /></span>
                            : <span className="up-arrow"><FontAwesomeIcon icon={faCaretUp} /></span>}
                            <span className="imp">*</span>
                        </div>
                    </div>
                    {isDropdownOpen && (
                        <div className="drop-down-menu">
                            {
                                [...categories, 'Others'].map((item, idx) => {
                                    return <div key={idx} className="item" onClick={() => dropdownClickHandler(item)}>{item}</div>
                                })
                            }
                        </div>
                    )}
                </div>
                {(category === 'Others') && <input className="value" type="text" placeholder="ADD CATEGORY HERE" value={categoryOthers} onChange={(e) => setCategoryOthers(e.target.value)} /> }
                {/*<div className="value"></div>*/}
            </div>
            <div className={`files${(!category || (category === 'Others' && !categoryOthers) ) ? " required" : ""}`}>
                <div className="fill-required-alert">
                    <div className="alert-box">
                        <div className="text">Fill the required category to perform the action</div>
                    </div>
                </div>
                <div>
                    {image ? (
                        <div className="uploaded">
                            <svg onClick={() => delImage()} aria-hidden="true" focusable="false" data-prefix="fal" data-icon="times" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="svg-inline--fa fa-times fa-w-10 fa-3x img-close"><path fill="currentColor" d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z" className=""></path></svg>
                            <img id="innovation-heading-image" src={image.filePath ? image.filePath : typeof image === "object" ? readImage(image) : ''} />
                        </div>
                    ) : (
                        <div className="image">
                            <input type="file" accept="image/*" onChange={(e) => {
                                let files = e.target.files
                                setImage(files[0])
                            }} />
                            <div className="detail">
                                {/* <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="plus" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="svg-inline--fa fa-plus fa-w-12 fa-3x plus-icon"><path fill="currentColor" d="M368 224H224V80c0-8.84-7.16-16-16-16h-32c-8.84 0-16 7.16-16 16v144H16c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h144v144c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16V288h144c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16z" className=""></path></svg> */}
                                <div className="icon">
                                    <div className="hbar"></div>
                                    <div className="vbar"></div>
                                </div>
                                <div className="info">Add cover Image of the Innovation</div>
                            </div>
                        </div>
                    )}
                    {video ? (
                        <div className="uploaded">
                            <svg onClick={() => delVideo()} aria-hidden="true" focusable="false" data-prefix="fal" data-icon="times" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="svg-inline--fa fa-times fa-w-10 fa-3x img-close"><path fill="currentColor" d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z" className=""></path></svg>
                            <video controls={true}>
                                <source id="innovation-heading-video" src={video.filePath ? video.filePath : typeof video === "object" ? readVideo(video) : ''} />
                            </video>
                        </div>
                    ) : (
                        <div className="video">
                            <input type="file" accept="video/*" onChange={(e) => {
                                let files = e.target.files
                                setVideo(files[0])
                            }} />
                            <div className="detail">
                                {/* <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="plus" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="svg-inline--fa fa-plus fa-w-12 fa-3x plus-icon"><path fill="currentColor" d="M368 224H224V80c0-8.84-7.16-16-16-16h-32c-8.84 0-16 7.16-16 16v144H16c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h144v144c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16V288h144c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16z" className=""></path></svg> */}
                                <div className="icon">
                                    <div className="hbar"></div>
                                    <div className="vbar"></div>
                                </div>
                                <div className="info">Add video of the Innovation</div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default InnovationHeading
