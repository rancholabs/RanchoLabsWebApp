import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateExtracurricular } from '../../Actions/StudentProfile'
import './css/StudentProfileExtracurricular.css'
import extracurricularImg from './img/extracurricular.png'
import StudentProfileEditIcon from './StudentProfileEditIcon'

const ItemEdit = ({idx, value, changeHandler}) => {
    return <input onChange={(e) => changeHandler(e.target, idx)} type="text" value={value ? value : ''} placeholder="Football" />
}

const Item = ({value}) => {
    return <div>{value ? value : 'Football'}</div>
}

const Items = ({isEditing, items, setItems}) => {
    const changeHandler = (elem, idx) => {
        //elem.style.width = elem.value.length + 1 + "ch"
        setItems([...items.slice(0, idx),
            elem.value,
            ...items.slice(idx+1)
        ])
    }
    return (
        <div className="items">
            {isEditing ? (
                <>
                    <div>
                        <ItemEdit idx={0} value={items[0]} changeHandler={changeHandler} />
                        <ItemSeperator />
                        <ItemEdit idx={1} value={items[1]} changeHandler={changeHandler} />
                        <ItemSeperator />
                        <ItemEdit idx={2} value={items[2]} changeHandler={changeHandler} />
                    </div>
                    <div>
                        <ItemEdit idx={3} value={items[3]} changeHandler={changeHandler} />
                        <ItemSeperator />
                        <ItemEdit idx={4} value={items[4]} changeHandler={changeHandler} />
                    </div>
                </>
            ): (
                <>
                    <div>
                        <Item value={items[0]} />
                        <ItemSeperator />
                        <Item value={items[1]} />
                        <ItemSeperator />
                        <Item value={items[2]} />
                    </div>
                    <div>
                        <Item value={items[3]} />
                        <ItemSeperator />
                        <Item value={items[4]} />
                    </div>
                </> 
            )}
        </div>
    )
}

const ItemSeperator = () => {
    return (
        <div className="item-seperator">
            <div className="line"></div>
            <div className="circle"></div>
        </div>
    )
}

const StudentProfileExtracurricular = () => {
    const {extraCurriculars, isEditView} = useSelector(state => state.studentProfile)
    const [isEditing, setIsEditing] = useState(false)
    const [items, setItems] = useState(extraCurriculars ? extraCurriculars : ['', '', '', '', ''])
    const [itemsTemp, setItemsTemp] = useState([])

    const dispatch = useDispatch()

    const cancelHandler = () => {
        setItemsTemp([])
        setIsEditing(false)
    }

    const saveHandler = () => {
        dispatch(updateExtracurricular(itemsTemp))
        setItems(itemsTemp)
        setIsEditing(false)
    }

    const openEditingMode = () => {
        setItemsTemp(items)
        setIsEditing(true)
    }

    useEffect(() => {
        if(extraCurriculars) {
            setItems(extraCurriculars)
        }
    }, [extraCurriculars])

    return (
        <div id="student-profile-extracurricular" className="student-profile-extracurricular">
            <img src={extracurricularImg} className="icon" />
            <div className={isEditing ? "editing-mode" : ""}>
                {!isEditing && isEditView && <StudentProfileEditIcon onClickHandler={openEditingMode} />}
                <Items isEditing={isEditing} items={!isEditing ? items : itemsTemp} setItems={setItemsTemp} />
                {isEditing && (
                    <div className="btns">
                        <div>
                            <button onClick={cancelHandler} className="cancel-btn">CANCEL</button>
                            <button onClick={saveHandler} className="save-btn">SAVE CHANGES</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default StudentProfileExtracurricular
