import React, { useState } from 'react'
import './css/WorkshopBatch.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faDotCircle } from '@fortawesome/free-regular-svg-icons'

const WorkshopBatchItem = ({ batch, durationPerWeek, noOfWeeks, isSelected, clickHandler }) => {
    return (
        <div className="col-md-6">
            <div className="workshop-batch-item" onClick={() => !isSelected ? clickHandler(batch) : ''}>
                <div>
                    {
                        (!isSelected) ? (
                            <div>
                                <FontAwesomeIcon className="icon" icon={faCircle} size="3x" color="#3CFAFF" />
                            </div>
                        ) : (
                                <div>
                                    <FontAwesomeIcon className="icon" icon={faDotCircle} size="3x" color="#3CFAFF" />
                                </div>
                            )
                    }

                    <div className="name">{batch}</div>
                </div>
            </div>
        </div>
    )
}

const WorkshopBatches = ({ batch }) => {
    const { durationInHours, durationPerWeek, noOfWeeks, batches } = batch
    const [WorkshopBatch, setWorkshopBatch] = useState(batches.length ? batches[0] : '')
    const clickHandler = (batc) => {
        setWorkshopBatch(batc)
    }
    return (
        <div className="workshop-batch" id="batches">
            <div className="name">PICK A BATCH</div>
            <div className="row">
                {
                    batches.map((batch, bi) => {
                        return (
                            <WorkshopBatchItem
                                key={bi}
                                batch={batch}
                                durationPerWeek={durationPerWeek}
                                noOfWeeks={noOfWeeks}
                                isSelected={batch === WorkshopBatch}
                                clickHandler={clickHandler}
                            />)
                    })
                }
            </div>
            <div className="">
                <div className="btn enroll">ENROLL NOW</div>
            </div>
        </div>
    )
}

export default WorkshopBatches