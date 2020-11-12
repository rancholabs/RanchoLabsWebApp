import React from 'react'
import DashboardLearn from './DashboardLearn'
import DashboardInnovate from './DashboardInnovate'
import DashboardBuild from './DashboardBuild'

function DashboardCards(props) {

    const coursedata =  props.coursedata
    const activeCourse = props.activeCourse

    return (
        <>
            {
                activeCourse &&
                <>
                    <div className="dashboard-body">
                        <div className="row mx-0">
                            <div className="col p-0 dboard-learn">
                                <div className="dashboard-card-title">LEARN</div>
                                <DashboardLearn learn={coursedata} />
                            </div>
                            <div className="col p-0 dboard-build">
                                <div className="dashboard-card-title" style={{paddingLeft: "0.99vw"}}>BUILD</div>
                                <DashboardBuild build={coursedata} />
                            </div>
                            <div className="col p-0 dboard-innovate">
                                <div className="dashboard-card-title" style={{paddingLeft: "0.99vw"}}>INNOVATE</div>
                                <DashboardInnovate innovate={coursedata} />
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default DashboardCards