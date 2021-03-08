import React, {useState, useEffect} from 'react'
import './css/DashboardHeader.css'
import quotesym from './img/quote.svg'
import { useSelector } from 'react-redux'


const DashboardHeaderUpper = (quote) => {

        const day = new Date()
        var date =  day.getDate()
        const year = day.getFullYear()
        var options = {month : 'long'}
        const month = new Intl.DateTimeFormat('en-US', options).format(day).toUpperCase()
        console.log(quote);

        const userLogin = useSelector((state) => state.userLogin)
        const { userInfo } = userLogin

    return(
        <>
            {
            (userInfo) &&
                <>
                <div className="dashboard-header mr-0">
            <div className="row header-upper mr-0">
            <div className="col-xl-4 align-self-center">
                <div className="date">{date} {month} {year}</div>
                <div className="student-name">Hi, {userInfo.userName.first}</div>
                <div className="greeting">Have a nice day. keep learning,<br /> Building and Innovating</div>
            </div>
            <div className="col-xl-8 quote">
                <div className="row mr-0">
                    <div className="col-md-2"></div>
                    <div className="col-md-1 q1"><img src={quotesym} style={{width:"2.11vw"}}></img></div>
                    <div className="col-md-9">
                        <div className="quote-text align-self-self-start">"{quote.quote.quote}"
                            {/* "Imagination is more important than knowledge. For knowledge is limited, whereas imagination embraces the entire world, stimulating progress, giving birth to evolution." */}
                            <img src={quotesym} className="quote2" style={{width:"2.11vw", margin:"1.8vw 0 0vw 2vw", position:"absolute"}}></img>
                            <br/> <br/>— {quote.quote.by}
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div> 
            </>
        }
        </>
    )
}

const DashboardHeader = ( props ) => {

    return(
            
                <>
                <DashboardHeaderUpper quote={props.data.quote}/>
                </>
            
    )
}

export default DashboardHeader