import React from 'react'

import './css/WorkshopTeam.css'
import user from './img/user2.png'

function Member(){
    return(
        <div className="col-md-6 team-member">
            <div className="row">
                <div className="col-4">
                    <div>
                        <img className="img-fluid" src={user}></img>
                    </div>
                </div>
                <div className="col-8" style={{alignSelf:"center"}}>
                    <div className="member-name">Aman Kumar</div>
                    <div className="member-desc">Co-founder, Rancho Labs B.Tech, IIT Delhi</div>
                </div>
            </div>
        </div>
    )
}

function Team(){
    return(
        <div className="WorkshopTeam">
            <div className="team-title">A TEAM OF IITians</div>
            <div className="row">
                <Member />
                <Member />
            </div>
        </div>
    )
}

export default Team