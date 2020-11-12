import React from 'react'
import './css/StudentInfo.css'

function StudentInfo(){
    

    return(
        <div className="StudentInfo">
            <div className="row">
            <div>
            <div className="card">
                <form>
                    <label for="student-name">STUDENT'S NAME</label>
                    <input type="text" 
                    name="student-name"
                    placeholder="Name here"
                    ></input>
                    <label for="parent-name">PARENT'S NAME</label>
                    <input type="text" name="parent-name" id="parent-name" placeholder="Parent's Name here "></input>
                    <label for="parent-contact">PARENT'S CONTACT NUMBER</label>
                    <input type="text" name="parent-contact" id="parent-contact" placeholder="XXXXXXXXXX"></input>
                    <label for="class">CLASS YOU STUDY IN</label>
                    <select>
                        <option>10</option>
                        <option>11</option>
                        <option>12</option>
                    </select>
                    <button type="submit" className="submit d-flex mx-auto">SIGNUP</button>
                </form>
            </div>
            </div>
                <div style={{textAlign:"right"}}>
                    <div className="welcome">
                         WELCOME<br /> to Rancho Labs<br/><br/><span id="step">One more step for a <br />better learning experience</span><br/><br/>KEEP LEARNING<br/> BUILDING<br/> and <br/>INNOVATING
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentInfo