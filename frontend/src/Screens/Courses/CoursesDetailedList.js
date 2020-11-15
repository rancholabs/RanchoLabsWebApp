import React, { useEffect, useState } from 'react'
import './css/CoursesDetailedList.css'
import CoursesDetailedListCards from './CoursesDetailedListCards'
import { useParams } from 'react-router-dom'

const CoursesDetailedListItem = ({courseGroup, parentIndex, isActive, clickHandler}) => {
    const {name, image} = courseGroup
    return (
        <div className={`courses-detailed-list-item${isActive ? " active" : ""}`} onClick={() => !isActive ? clickHandler(courseGroup, parentIndex) : ""}>
            <div className="img">
                <img src={image.filePath} alt={name} />
            </div>
            <div className="name-line">
                <div className="name">{name}</div>
                <div className="line"></div>
            </div>
            <div className="name">{name}</div>
        </div>
    )
}

const CoursesDetailedList = ({courseGroups}) => {
    let subMatrixLen = (window.screen.width <= 600) ? 2 : 3
    const {groupId} = useParams()
    const [activeCourseGroup, setActiveCourseGroup] = useState(courseGroups.length ? {
        index: courseGroups.map((cg, idx) => {
            if(cg._id === groupId) {
                return parseInt(idx/subMatrixLen)
            }
            else {
                return 0
            }
        }).reduce((a, b) => a + b), courseGroup: !groupId ? courseGroups[0] 
        : courseGroups.filter(cg => cg._id === groupId)[0]
    } : undefined)
    const [courseGroupsList, setCourseGroupsList] = useState([])
    const onclickHandler = (courseGroup, parentIndex) => {
        setActiveCourseGroup({index: parentIndex, courseGroup: courseGroup})
    }
    console.log(courseGroups, groupId, activeCourseGroup)
    const listToMatrix = (list, elementsPerSubArray) => {
        var matrix = [], i, k;
    
        for (i = 0, k = -1; i < list.length; i++) {
            if (i % elementsPerSubArray === 0) {
                k++;
                matrix[k] = [];
            }
    
            matrix[k].push(list[i]);
        }
    
        return matrix;
    }

    useEffect(() => {
        const onResize = () => {
            subMatrixLen = (window.screen.width <= 600) ? 2 : 3
            setActiveCourseGroup(courseGroups.length ? {
                index: courseGroups.map((cg, idx) => {
                    if(cg._id === groupId) {
                        return parseInt(idx/subMatrixLen)
                    }
                    else {
                        return 0
                    }
                }).reduce((a, b) => a + b), courseGroup: !groupId ? courseGroups[0] 
                : courseGroups.filter(cg => cg._id === groupId)[0]
            } : undefined)
            setCourseGroupsList(listToMatrix(courseGroups, subMatrixLen))
        }
        window.addEventListener('resize', onResize)
        onResize()

        return () => window.removeEventListener('resize', onResize)
    }, [courseGroups])

    return (
        <div className="courses-detailed-lists">
        {
            courseGroupsList.map((subCourseGroupsList, sci) => {
                return (
                    <div key={sci}>
                        {/* <div className="courses-detailed-list">
                            <div className="courses-items">
                                {
                                    subCourseGroupsList.map((courseGroup, ci) => {
                                        return (<CoursesDetailedListItem key={courseGroup._id} parentIndex={sci} courseGroup={courseGroup} isActive={activeCourseGroup && (activeCourseGroup.courseGroup._id === courseGroup._id)} clickHandler={onclickHandler} />)
                                    })
                                }
                            </div>
                            {(activeCourseGroup && activeCourseGroup.index === sci) && (
                                <div className="active-line"></div>
                            )}
                        </div> */}
                        {(activeCourseGroup && activeCourseGroup.index === sci) && (
                            <CoursesDetailedListCards coursesDetails={activeCourseGroup.courseGroup.courses} />
                        )}
                    </div>
                )
            })
        }
        
        </div>
    )
}

export default CoursesDetailedList
