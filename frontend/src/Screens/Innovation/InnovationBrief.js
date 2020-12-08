import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UpdatePreviewBrief, UpdatePreviewComponents, UpdatePreviewSaveHandler } from '../../Actions/InnovationPreview'
import './css/InnovationBrief.css'

const InnovationBrief = () => {
    const {brief: sBrief, components: sComponents} = useSelector((state) => state.innovationPreview)
    const [brief, setBrief] = useState(sBrief ? sBrief : '')
    const [components, setComponents] = useState(sComponents ? sComponents : [{id: 0, value: ''}])
    const updateComponentHandler = (id, value) => {
        const objIndex = components.findIndex((obj => obj.id === id))
        if(objIndex >= 0) {
            setComponents([
                ...components.slice(0, objIndex),
                {...components[objIndex], value: value},
                ...components.slice(objIndex+1)
            ])
        }
    }

    const addComponent = () => {
        const maxId = Math.max.apply(Math, components.map(function(o) { return o.id; }))
        setComponents([...components, {id: maxId === -Infinity ? 0 : maxId+1, value: ''}])
    }

    const delComponent = (id) => {
        setComponents(components.filter(c => {
            if(c.id !== id) {
                return c;
            }
        }))
    }

    const dispatch = useDispatch()

    useEffect(() => {
        const previewSaveHandler = () => {
            dispatch(UpdatePreviewBrief(brief))
            dispatch(UpdatePreviewComponents(components))
        }
        dispatch(UpdatePreviewSaveHandler(previewSaveHandler))
    }, [brief, components])

    return (
        <div className="innovation-brief">
            <div className="long-top-arrow"></div>
            <div className="brief">
                <div className="label">
                    <div className="box">
                        <div className="text">
                            ADD INNOVATION BRIEF
                        </div>
                    </div>
                </div>
                <textarea className="value" type="text" placeholder="Write here" value={brief} onChange={(e) => setBrief(e.target.value)} />
            </div>
            <div>
                <div className="label">
                    <div className="box">
                        <div className="text">
                            ADD COMPONENTS
                        </div>
                    </div>
                </div>
                <div className="components">
                    {
                        components.map((c) => {
                            return (
                                <div key={c.id}>
                                    <div className="bullet"></div>
                                    <input className="value" type="text" placeholder="Name of the Component (eg: Sensors, Board, Aurdino, etc)" value={c.value} onChange={(e) => updateComponentHandler(c.id, e.target.value)} />
                                    <svg onClick={() => delComponent(c.id)} aria-hidden="true" focusable="false" data-prefix="fad" data-icon="trash-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="svg-inline--fa fa-trash-alt fa-w-14 fa-3x trash-icon"><g className="fa-group"><path fill="currentColor" d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V96H32zm272-288a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0z" className="fa-secondary"></path><path fill="currentColor" d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM128 160a16 16 0 0 0-16 16v224a16 16 0 0 0 32 0V176a16 16 0 0 0-16-16zm96 0a16 16 0 0 0-16 16v224a16 16 0 0 0 32 0V176a16 16 0 0 0-16-16zm96 0a16 16 0 0 0-16 16v224a16 16 0 0 0 32 0V176a16 16 0 0 0-16-16z" className="fa-primary" style={{color: '#3A3C4A'}}></path></g></svg>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className="add-component" onClick={() => addComponent()}>
                <div className="text">ADD COMPONENT</div>
                <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="plus" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="svg-inline--fa fa-plus fa-w-12 fa-3x plus-icon"><path fill="currentColor" d="M368 224H224V80c0-8.84-7.16-16-16-16h-32c-8.84 0-16 7.16-16 16v144H16c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h144v144c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16V288h144c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16z" className=""></path></svg>
            </div>
        </div>
    )
}

export default InnovationBrief
