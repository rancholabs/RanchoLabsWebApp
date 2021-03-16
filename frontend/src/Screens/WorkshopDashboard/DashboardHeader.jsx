import React, {useState, useEffect} from 'react'
import './css/DashboardHeader.css'
import quotesym from './img/quote.svg'
import { useSelector } from 'react-redux'
import quotes from './Quotes'


const DashboardHeaderUpper = (quote) => {
        const day = new Date()
        var date =  day.getDate()
        const year = day.getFullYear()
        var options = {month : 'long'}
        const month = new Intl.DateTimeFormat('en-US', options).format(day).toUpperCase()
        //console.log(quote);
        const [quoteCurr, setQuotesCurr] = useState(quote.quote[Math.floor(Math.random() * quote.quote.length)])
        //console.log(quoteCurr);

        // useEffect(() => {
        //     changeQuote()
        // }, [quote])

        useEffect(() => {
            setInterval(() => {
                let num = Math.floor(Math.random() * quote.quote.length)
            //console.log(num);

            let newQuote = quote.quote[num];
            setQuotesCurr(newQuote)
            //console.log(newQuote)
            }, 6*10000)
        }, [quote])
        
       // console.log(quoteCurr)
        
        
            

            // setTimeout(() => setQuotes(newQuote.quote), 5000)
            // setTimeout(() => setQuotesAuth(newQuote.author), 5000)
        

        

        // const shuffleQuotes = (quotes) => {
        //     return quotes.sort(function() {
        //         return 0.5 - Math.random()
        //     })
        // }

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
                        <div className="quote-text align-self-self-start">"{quoteCurr.quote}"
                            {/* "Imagination is more important than knowledge. For knowledge is limited, whereas imagination embraces the entire world, stimulating progress, giving birth to evolution." */}
                            <img src={quotesym} className="quote2" style={{width:"2.11vw", margin:"1.8vw 0 0vw 2vw", position:"absolute"}}></img>
                            <br/> <br/>— {quoteCurr.author}
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
                <DashboardHeaderUpper quote={quotes}/>
                </>
            
    )
}

export default DashboardHeader