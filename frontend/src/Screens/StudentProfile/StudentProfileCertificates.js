import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateCertificates } from '../../Actions/StudentProfile'
import './css/StudentProfileCertificates.css'
import certificateImage from './img/top-rated.png'

const StudentProfileCertificates = () => {
    const {certificates: certificatesArr, isEditView} = useSelector(state => state.studentProfile)

    const [certificates, setCertificates] = useState(certificatesArr ? certificatesArr : [])
    const [certificatesTemp, setCertificatesTemp] = useState(certificatesArr ? certificatesArr : [])

    const [activePage, setActivePage] = useState(0)
    const [totalPagesLastIndex, setTotalPagesLastIndex] = useState(0)
    const dispatch = useDispatch()

    const addCertificateHandler = (file) => {
        if(file) {
            const maxId = Math.max.apply(Math, certificates.map(function(c) { return c.id; }))
            const certificatesNew = [
                ...certificates,
                {
                    id: maxId === -Infinity ? 0 : maxId+1,
                    file: file,
                    isEnabled: true
                }
            ]
            dispatch(updateCertificates(certificatesNew))
            setCertificates(certificatesNew)
        }
    }

    const updateCertificateIsEnabled = (id) => {
        const objIndex = certificates.findIndex((obj => obj.id === id))
        if(objIndex >= 0) {
            const certificatesNew = [
                ...certificates.slice(0, objIndex),
                {...certificates[objIndex], isEnabled: !certificates[objIndex].isEnabled},
                ...certificates.slice(objIndex+1)
            ]
            dispatch(updateCertificates(certificatesNew))
            setCertificates(certificatesNew)
        }
    }

    const delCertificateHandler = (id) => {
        if(window.confirm('Are you sure want to delete this Certificate ?')) {
            const certificatesNew = certificates.filter(c => {
                if(c.id !== id) {
                    return c
                }
            })
            dispatch(updateCertificates(certificatesNew))
            setCertificates(certificatesNew)
        }
    }

    const readURL = (file, id) => {
        const reader = new FileReader()
        reader.onload = () => {
            document.getElementById(id).src = reader.result
        }
        reader.readAsDataURL(file)
    }

    const readFile = (file, id) => {
        readURL(file, `certificate-file-${id}`)
        return ''
    }

    useEffect(() => {
        if(certificatesArr) {
            if(!isEditView) {
                setCertificatesTemp(certificatesArr)
                setCertificates(certificatesArr.filter(c => {
                    if(c.isEnabled) {
                        return c
                    }
                }))
            }
            else {
                setCertificates(certificatesArr)
            }
        }
    }, [certificatesArr])

    useEffect(() => {
        const totalPagesLastIndexTemp = parseInt((certificates.length-(isEditView && (certificates.length < rowsPerPage * maxPages) ? 0 : 1))/rowsPerPage)
        if(totalPagesLastIndexTemp != totalPagesLastIndex) {
            setTotalPagesLastIndex(totalPagesLastIndexTemp)
        }
        if(activePage > totalPagesLastIndexTemp) {
            setActivePage(totalPagesLastIndexTemp)
        }
    }, [certificates, isEditView])

    useEffect(() => {
        if(!isEditView) {
            setCertificatesTemp(certificates)
            setCertificates(certificates.filter(c => {
                if(c.isEnabled) {
                    return c
                }
            }))
        }
        else {
            setCertificates(certificatesTemp)
        }
    }, [isEditView])

    const maxPages = 5

    const rowsPerPage = 2

    return (
        <div id="student-profile-certificates" className="student-profile-certificates">
            <img src={certificateImage} className="icon" />
            <div className="certificates-container">
                <div className="certificates">
                    {(isEditView && activePage === 0 && certificates.length < rowsPerPage * maxPages) && (
                        <div className="add-certificate-btn">
                            <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="plus" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="svg-inline--fa fa-plus fa-w-12 fa-3x plus-icon"><path fill="currentColor" d="M368 224H224V80c0-8.84-7.16-16-16-16h-32c-8.84 0-16 7.16-16 16v144H16c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h144v144c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16V288h144c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16z" className=""></path></svg>
                            <div>ADD CERTIFICATE</div>
                            <div className="info">Add certificates in Image or PDF format</div>
                            <input type="file" className="file-upload" accept="application/pdf, image/*"
                            onChange={(e) => {
                                let files = e.target.files
                                console.log(files)
                                if(files.length) {
                                    addCertificateHandler(files[0])
                                    e.target.value = null
                                }
                            }} />
                        </div>
                    )}
                    {certificates.slice(activePage === 0 && (certificates.length < rowsPerPage * maxPages) ? activePage * rowsPerPage : activePage * rowsPerPage - (isEditView ? 1 : 0), (activePage+1) * rowsPerPage - (isEditView && (certificates.length < rowsPerPage * maxPages) ? 1 : 0) ).map(c => {
                        return (
                            <div key={c.id}>
                                {isEditView && <svg onClick={() => delCertificateHandler(c.id)} aria-hidden="true" focusable="false" data-prefix="fal" data-icon="times" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="svg-inline--fa fa-times fa-w-10 fa-3x certificate-remove-icon"><path fill="currentColor" d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z" className=""></path></svg>}
                                {c.file && ((c.file.filePath && c.file.filePath.split('.').pop().toLowerCase() === 'pdf') || (c.file.name && c.file.name.split('.').pop().toLowerCase() === 'pdf')) ? (
                                    <embed className="file" id={`certificate-file-${c.id}`} src={c.file.filePath ? c.file.filePath : typeof c.file === "object" ? readFile(c.file, c.id) : ''} />
                                ) : (
                                    <img className="file" id={`certificate-file-${c.id}`} src={c.file.filePath ? c.file.filePath : typeof c.file === "object" ? readFile(c.file, c.id) : ''} />
                                )}
                                {isEditView && (
                                    <button onClick={() => updateCertificateIsEnabled(c.id)} className={c.isEnabled ? "enabled" : "disabled"}>
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
        </div>
    )
}

export default StudentProfileCertificates
