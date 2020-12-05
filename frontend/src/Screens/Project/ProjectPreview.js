import React from 'react'
import './css/ProjectPreview.css'
import Logo from './../../Components/img/logo.png'
import {faWhatsappSquare, faFacebookF, faTwitterSquare,} from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector } from 'react-redux'

const ProjectPreview = ({previewCloseHandler}) => {

    const {header, brief, components, steps, conclusion, user} = useSelector((state) => state.projectPreview)
    const name = user ? user.name.first : ''

    return (
        <div className="project-preview">
            <img src={header && header.image ? header.image.filePath : ''} className="project-image" />
            <div className="close-preview">
                <svg onClick={() => previewCloseHandler()} aria-hidden="true" focusable="false" data-prefix="fal" data-icon="times" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="svg-inline--fa fa-times fa-w-10 fa-3x close-icon"><path fill="currentColor" d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z" className=""></path></svg>
            </div>
            <div className="watermark">
                <div className="box">
                    <div className="before-top"></div>
                    <div className="box-container">
                        <div>
                            <img src={Logo} className="image" />
                            <div className="name">RANCHO LABS</div>
                        </div>
                    </div>
                    <div className="before-bottom"></div>
                </div>
            </div>
            <div className="project-heading">{header && header.heading ? header.heading : ''}</div>
            <div className="project-category">
                <div>
                    <div className="arrow-stick">
                        <div className="point"></div>
                        <div className="stick"></div>
                    </div>
                    <div className="name">{header && header.category ? header.category : ''}</div>
                    <div className="arrow-stick">
                        <div className="stick"></div>
                        <div className="point"></div>
                    </div>
                </div>
            </div>
            <div className="project-by">
                <div>
                    <div className="text">Project By</div>
                    <div className="name">{name}</div>
                </div>
            </div>
            <div className="project-brief-heading">BRIEF</div>
            <div className="project-brief">{brief ? brief : ''}</div>
            <video className="project-video" controls={true}>
                <source src={header && header.video ? header.video.filePath : ''} />
            </video>
            <div className="components-heading">COMPONENTS</div>
            {components && (
                <div className="components">
                    {
                        components.map((c, idx) => {
                            return (
                                <div key={idx}>
                                    <div className="bullet"></div>
                                    <div className="text">{c.value}</div>
                                </div>
                            )
                        })
                    }
                </div>
            )}
            <div className="project-steps-heading">STEPS</div>
            {steps && (
                <div className="project-steps">
                    {
                        steps.map((s, idx) => {
                            return (
                                <div key={idx}>
                                    <div className="step-heading">
                                        <span className="step-no">STEP {idx+1}</span>
                                        {s.heading}
                                    </div>
                                    <img src={s.image && s.image.filePath ? s.image.filePath : ''} className="image" />
                                    <div className="sdesc">{s.description}</div>
                                </div>
                            )
                        })
                    }
                </div>
            )}
            <div className="project-conclusion-heading">CONCLUSION</div>
            {conclusion && (
                <div className="project-conclusion">
                    {
                        conclusion.map((c, idx) => {
                            return (
                                <div key={idx}>
                                    <div className="conclusion-heading">
                                        {c.heading}
                                    </div>
                                    <div className="conclusion-sub-heading">
                                        {c.subHeading}
                                    </div>
                                    <img src={c.image && c.image.filePath ? c.image.filePath : ''} className="image" />
                                    <div className="desc">{c.description}</div>
                                </div>
                            )
                        })
                    }
                </div>
            )}
            <div className="social-btns">
                {
                    [{className: 'twitter', icon: faTwitterSquare },
                    {className: 'fb', icon: faFacebookF },
                    {className: 'gmail', icon: faEnvelope },
                    {className: 'wa', icon: faWhatsappSquare }].map((sb, idx) => {
                        return (
                            <div key={idx} className={`social-btn ${sb.className}`}>
                                <FontAwesomeIcon className="icon" icon={sb.icon} />
                                <div className="text">Share</div>
                            </div>
                        )
                    })
                }
            </div>
            <div className="profile">
                <img src={user && user.profilePic ? user.profilePic.filePath : ''} className="pic" />
                <div className="name-about">
                    <div className="name">{name}</div>
                    <div className="about">About {name} {user && user.description ? user.description : ''}</div>
                </div>
            </div>
        </div>
    )
}

export default ProjectPreview
