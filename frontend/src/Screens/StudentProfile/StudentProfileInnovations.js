import { faShare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { setIsShareOpen, updateInnovations } from '../../Actions/StudentProfile'
import './css/StudentProfileInnovations.css'
import innovationImage from './img/innovation.png'
import StudentProfileEditIcon from './StudentProfileEditIcon'

const StudentProfileInnovations = () => {
    const {innovations: innovationsArr, isEditView} = useSelector(state => state.studentProfile)
    const [innovations, setInnovations] = useState(innovationsArr ? innovationsArr : [])
    const [innovationsTemp, setInnovationsTemp] = useState(innovationsArr ? innovationsArr : [])

    const dispatch = useDispatch()

    const shareWebsite = (id) => {
        dispatch(setIsShareOpen({type: 'innovation', id: id}))
    }

    const updateInnovationIsEnabled = (id, attr, value) => {
        const objIndex = innovations.findIndex((obj => obj._id === id))
        if(objIndex >= 0) {
            const innovationsNew = [
                ...innovations.slice(0, objIndex),
                {...innovations[objIndex], isEnabled: !innovations[objIndex].isEnabled},
                ...innovations.slice(objIndex+1)
            ]
            dispatch(updateInnovations(id, !innovations[objIndex].isEnabled))
            setInnovations(innovationsNew)
        }
    }

    const delInnovationHandler = (id) => {
        if(window.confirm('Are you sure want to delete this Innovation ?')) {
            const innovationsNew = innovations.filter(i => {
                if(i._id !== id) {
                    return i
                }
            })
            dispatch(updateInnovations(id))
            setInnovations(innovationsNew)
        }
    }

    useEffect(() => {
        if(innovationsArr) {
            if(!isEditView) {
                setInnovationsTemp(innovationsArr)
                setInnovations(innovationsArr.filter(i => {
                    if(i.isEnabled) {
                        return i
                    }
                }))
            }
            else {
                setInnovations(innovationsArr)
            }
        }
    }, [innovationsArr])

    useEffect(() => {
        const totalPagesLastIndexTemp = parseInt((innovations.length-(isEditView && (innovations.length < rowsPerPage * maxPages) ? 0 : 1))/rowsPerPage)
        if(totalPagesLastIndexTemp != totalPagesLastIndex) {
            setTotalPagesLastIndex(totalPagesLastIndexTemp)
        }
        if(activePage > totalPagesLastIndexTemp) {
            setActivePage(totalPagesLastIndexTemp)
        }
    }, [innovations, isEditView])

    useEffect(() => {
        if(!isEditView) {
            setInnovationsTemp(innovations)
            setInnovations(innovations.filter(i => {
                if(i.isEnabled) {
                    return i
                }
            }))
        }
        else {
            setInnovations(innovationsTemp)
        }
    }, [isEditView])

    const [activePage, setActivePage] = useState(0)
    const [totalPagesLastIndex, setTotalPagesLastIndex] = useState(0)

    const maxPages = 5

    const rowsPerPage = 3

    const history = useHistory()

    return (
        <div id="student-profile-innovations" className="student-profile-innovations">
            <img src={innovationImage} className="icon" />
            <div className="innovations-container">
                <div className="innovations">
                    {(isEditView && activePage === 0 && innovations.length < rowsPerPage * maxPages) && (
                        <div className="add-innovation" onClick={() => {history.push('/innovation')}}>
                            <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="plus" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="svg-inline--fa fa-plus fa-w-12 fa-3x plus-icon"><path fill="currentColor" d="M368 224H224V80c0-8.84-7.16-16-16-16h-32c-8.84 0-16 7.16-16 16v144H16c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h144v144c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16V288h144c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16z" className=""></path></svg>
                            <div>ADD INNOVATION</div>
                        </div>
                    )}
                    {innovations.slice(activePage === 0 && (innovations.length < rowsPerPage * maxPages) ? activePage * rowsPerPage : activePage * rowsPerPage - (isEditView ? 1 : 0), (activePage+1) * rowsPerPage - (isEditView && (innovations.length < rowsPerPage * maxPages) ? 1 : 0) ).map(i => {
                        return (
                            <div key={i._id} onClick={() => {window.open(`/innovation/${i._id}`, '_blank')}} className={!i.isUploaded ? "draft" : ""}>
                                {isEditView && (
                                    <>
                                        <svg onClick={(e) => {
                                            delInnovationHandler(i._id)
                                            e.stopPropagation()
                                        }} aria-hidden="true" focusable="false" data-prefix="fal" data-icon="times" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="svg-inline--fa fa-times fa-w-10 fa-3x innovation-remove-icon"><path fill="currentColor" d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z" className=""></path></svg>
                                        <StudentProfileEditIcon onClickHandler={() => history.push(`/innovation?innovationId=${i._id}`)} />
                                    </>
                                )}
                                {i.isUploaded ? <img className="image" src={i.header.image && i.header.image.filePath ? i.header.image.filePath : ''} /> : <div className="image">DRAFT</div>}
                                <div className="innovation-content">
                                    <div className="category">{i.header.category}</div>
                                    <div className="heading">{i.header.heading}</div>
                                    <div className="brief">{i.brief}</div>
                                </div>
                                {(isEditView && i.isUploaded) && (
                                    <div className="enable-share">
                                        <button onClick={(e) => {
                                            updateInnovationIsEnabled(i._id)
                                            e.stopPropagation()
                                        }} className={i.isEnabled ? "enabled" : "disabled"}>
                                            <div className="circle"></div>
                                        </button>
                                        <FontAwesomeIcon onClick={(e) => {
                                            shareWebsite(i._id)
                                            e.stopPropagation()
                                        }} className="share-icon" icon={faShare} />
                                    </div>
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
        </div>
    )
}

export default StudentProfileInnovations
