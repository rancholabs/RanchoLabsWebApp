import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector} from 'react-redux'
import ProgressBar from 'react-progressbar';
import './css/DashboardLearn.css'

function over(e) {
    var now = new Date().toISOString()
    if (e < now)
        return 1
    else 
    return 0
}

function ongoing(s , e) {
    var now = new Date().toISOString()
    if(s < now && e > now)
        return 1
    else
        return 0
}

const DLlistItem = (dlitem) => {
    return ( 
        <>
        <li>- &nbsp;{dlitem}</li>
        </>
    )
} 

const getDate = (d) => {
    var date =  new Date(d)
    var day = date.getDay()
    var options = {month : 'long'}
    const month = new Intl.DateTimeFormat('en-US', options).format(date)
    console.log(month)
    var year = date.getFullYear()

    var rdate = {
        "date" : day, "month" : month, "year" : year
    }

    console.log(rdate)
    return rdate
}

const MaterialItem = (matitem) => {
    return(
        <div className="row">
            <div className="col-2">hi</div>
            <div className="col-2 pl-0">lesson</div>
            <div className="col-8">imagelessonlessonlesson</div>
        </div>
    )
}


const Daywise = (dayData) => {

    const isOver = true

    var sdate = getDate(dayData.classTime.startTime)
    var edate = getDate(dayData.classTime.endTime)

    return(
        <>
        {
            dayData &&
            <div>
                <div className="row session-titles" style={{marginBottom:"0.8vw", marginTop:"0.5vw"}}>
                    <div className="section-day pl-4 pr-4">Session {dayData.classNo}</div>
                    <div className="section-title pl-0 align-self-center">{dayData.topic}
                        <span className="status">{ongoing(dayData.classTime.startTime, dayData.classTime.endTime)}</span>
                    </div>
                </div>
                <div className="inner-card">
                    {
                        !isOver ? <>
                        {/* <MaterialItem material = {dayData.materials}></MaterialItem> */}
                        </>:
                        <>
                        
                    <div className="row joining-details">
                        <div className="pl-3 pr-3">
                            <button className="join"><a href={dayData.classLink}>Join Class</a></button>
                        </div>
                        <div className="align-self-center join-date">
                        {sdate.date} {sdate.month} {sdate.year}- {edate.date} {edate.month} {edate.year}
                        </div>
                    </div>
                        </>
                    }
                </div>
        </div>
        }
        </>
    )
}


const NotEnrolled = () =>{
    return(
        <div className="text-center not-enrolled" style={{margin:"auto", marginTop:"16%"}}>
        <div> Start learning today!</div>
        <div><a href='/FreeWorkshop'>
            <button>Enroll now</button></a></div>
        </div>
    )
}

const DashboardLearnCard = (props) => {

    var Dlearn = props.learn
    

    function getProgress (){

        if(Dlearn)
        {
            var c = 0;

            for(var i =0 ;i< Dlearn.classes.length; i++)
            {
                if(over(Dlearn.classes[i].classend))
                {
                    c++;
                }
            }
            return (c/Dlearn.classes.length)
        }
        else return 0
    }

    var progress = getProgress()
    
    return(
        <>
        <div className="card learncard">
            <div className="card-content">
            <div className="card-title">{Dlearn && Dlearn.courseDetails.name}</div>
            {
                Dlearn ?
                <>
                <div className="section-intro">{Dlearn.classes.map(Daywise)}</div>
                </> :
                 <NotEnrolled />
            }
            </div>
            <ProgressBar completed={progress} />
        </div>
        </>
    )
}

export default DashboardLearnCard