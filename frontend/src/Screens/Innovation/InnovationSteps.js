import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UpdatePreviewSaveHandler, UpdatePreviewSteps } from '../../Actions/InnovationPreview'
import './css/InnovationSteps.css'

const InnovationSteps = () => {
    const {steps: sSteps} = useSelector((state) => state.innovationPreview)
    const [steps, setSteps] = useState(sSteps ? sSteps : [{id: 0, heading: '', image: '', description: ''}])
    const updateStepHandler = (id, attr, value) => {
        const objIndex = steps.findIndex((obj => obj.id === id))
        if(objIndex >= 0) {
            setSteps([
                ...steps.slice(0, objIndex),
                {...steps[objIndex], [attr]: value},
                ...steps.slice(objIndex+1)
            ])
        }
    }

    const readURL = (file, id) => {
        const reader = new FileReader()
        reader.onload = () => {
            document.getElementById(id).src = reader.result
        }
        reader.readAsDataURL(file)
    }

    const readImage = (image, id) => {
        readURL(image, `innovation-step-image-${id}`)
        return ''
    }

    const addStep = () => {
        const maxId = Math.max.apply(Math, steps.map(function(o) { return o.id; }))
        setSteps([...steps, {id: maxId === -Infinity ? 0 : maxId+1, heading: '', image: '', description: ''}])
    }

    const delStepImage = (id) => {
        updateStepHandler(id, 'image', '')
    }

    const delStep = (id) => {
        setSteps(steps.filter(s => {
            if(s.id !== id) {
                return s;
            }
        }))
    }

    const dispatch = useDispatch()

    useEffect(() => {
        const previewSaveHandler = () => {
            dispatch(UpdatePreviewSteps(steps))
        }

        dispatch(UpdatePreviewSaveHandler(previewSaveHandler))
    }, [steps])

    return (
        <div className="innovation-steps">
            <div className="long-top-arrow"></div>
            <div>
                <div className="label">
                    <div className="box">
                        <div className="text">
                            ADD STEPS
                        </div>
                    </div>
                </div>
                <div className="steps">
                    {
                        steps.map((s, idx) => {
                            return (
                                <div key={s.id}>
                                    <div>
                                        <div className="step-no">STEP {idx+1}</div>
                                        <input className="heading" type="text" placeholder={`Heading of step ${idx+1}`} value={s.heading} onChange={(e) => updateStepHandler(s.id, 'heading', e.target.value)} />
                                        <svg onClick={() => delStep(s.id)} aria-hidden="true" focusable="false" data-prefix="fad" data-icon="trash-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="svg-inline--fa fa-trash-alt fa-w-14 fa-3x trash-icon"><g className="fa-group"><path fill="currentColor" d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V96H32zm272-288a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0z" className="fa-secondary"></path><path fill="currentColor" d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM128 160a16 16 0 0 0-16 16v224a16 16 0 0 0 32 0V176a16 16 0 0 0-16-16zm96 0a16 16 0 0 0-16 16v224a16 16 0 0 0 32 0V176a16 16 0 0 0-16-16zm96 0a16 16 0 0 0-16 16v224a16 16 0 0 0 32 0V176a16 16 0 0 0-16-16z" className="fa-primary" style={{color: '#3A3C4A'}}></path></g></svg>
                                    </div>
                                    <div>
                                        <div className="image">
                                            <div>
                                                {s.image ? (
                                                    <>
                                                        <svg onClick={() => delStepImage(s.id)} aria-hidden="true" focusable="false" data-prefix="fal" data-icon="times" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="svg-inline--fa fa-times fa-w-10 fa-3x img-close"><path fill="currentColor" d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z" className=""></path></svg>
                                                        <img className="img" id={`innovation-step-image-${s.id}`} src={s.image.filePath ? s.image.filePath : typeof s.image === "object" ? readImage(s.image, s.id) : ''} />
                                                    </>
                                                ) : (
                                                    <>
                                                        <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="plus" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="svg-inline--fa fa-plus fa-w-12 fa-3x plus-icon"><path fill="currentColor" d="M368 224H224V80c0-8.84-7.16-16-16-16h-32c-8.84 0-16 7.16-16 16v144H16c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h144v144c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16V288h144c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16z" className=""></path></svg>
                                                        <div className="info">Add Image of the STEP</div>
                                                        <input type="file" accept="image/*" className="image-file" onChange={(e) => {
                                                            let files = e.target.files
                                                            updateStepHandler(s.id, 'image', files[0])
                                                        }} />
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                        <textarea className="desc" type="text" placeholder="Description of the step" value={s.description} onChange={(e) => updateStepHandler(s.id, 'description', e.target.value)} />
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className="add-step" onClick={() => addStep()}>
                <div className="text">ADD NEXT STEP</div>
                <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="plus" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="svg-inline--fa fa-plus fa-w-12 fa-3x plus-icon"><path fill="currentColor" d="M368 224H224V80c0-8.84-7.16-16-16-16h-32c-8.84 0-16 7.16-16 16v144H16c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h144v144c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16V288h144c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16z" className=""></path></svg>
            </div>
        </div>
    )
}

export default InnovationSteps
