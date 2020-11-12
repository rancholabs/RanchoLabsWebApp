import React, {useRef, useEffect} from 'react'
import './css/CourseInnovate.css'
import RaiseHandImg from './img/raised-hands.png'

const CourseInnovateItem = ({desc, img}) => {
    return (
        <div className="course-innovate-item">
            <p>{desc}</p>
            <img src={img} />
        </div>
    )
}

const CourseInnovationStep = ({stepNo, step}) => {
    return (
        <div className="course-innovation-step">
            <div className="step-no">{stepNo}</div>
            <div className="step">{step}</div>
        </div>
    )
}

const CourseInnovate = ({innovates, steps}) => {
    const myCanvas = useRef()

    useEffect( () => {
        const onresize = () => {
            let ctx = myCanvas.current.getContext("2d");
            let i;
            ctx.strokeStyle = "#3CFAFF";
            if(window.screen.width <= 600)
                ctx.lineWidth = 10;
            else
                ctx.lineWidth = 2;

            let counter = 0, x=0,y=-180;


            //100 iterations
            let increase = 90/180*Math.PI / 9;
            for(i=0; i<=360; i+=10){
                
                
                x = i;
                y =  180 + Math.sin(counter) * 120;
                counter += increase;
                if(window.screen.width <= 600)
                    ctx.moveTo(x+10,y);
                else
                    ctx.moveTo(x+4,y);
                ctx.lineTo(x,y);
                ctx.stroke();
            }
        }
        window.addEventListener('resize', onresize)
        onresize()

        return () => window.removeEventListener('resize', onresize)
    }, [])

    return (
        <div className="course-main course-margin course-innovate">
            <div className="course-sub-topic">
                <div>WHAT YOU'LL INNOVATE?</div>
            </div>
            <div className="course-innovate-items">
                {
                    innovates.map((item, li) => {
                        const {description, image} = item
                        return (<CourseInnovateItem key={li} desc={description} img={image ? image.filePath : ''} />)
                    })
                }
            </div>
            <div className="course-steps-dotted">
                <h4>YOUR INNOVATION</h4>
                <canvas ref={myCanvas} border="0" width="360" height="360"></canvas>
                <h3>HOW IT WORKS?</h3>
            </div>
            <div className="course-innovation-steps">
                <div>
                    {
                        steps.map((step, si) => {
                            return (<CourseInnovationStep key={si} stepNo={si+1} step={step} />)
                        })
                    }
                </div>
            </div>
            <div className="course-innovate-end">
                <p>Hurray! Your innovation is ready.</p>
                <img src={RaiseHandImg} />
            </div>
        </div>
    )
}

export default CourseInnovate
