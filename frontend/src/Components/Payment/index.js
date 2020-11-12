import React from 'react'
import { useSelector } from 'react-redux'
import Logo from './../img/logo.png'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { getPaymentOrder } from '../../Actions/Payment'
import { enrollCourse } from '../../Actions/Student'

function loadScript(src) {
	return new Promise((resolve) => {
		const script = document.createElement('script')
		script.src = src
		script.onload = () => {
			resolve(true)
		}
		script.onerror = () => {
			resolve(false)
		}
		document.body.appendChild(script)
	})
}

const __DEV__ = document.domain === 'localhost'


const Payment = ({className, children }) => {
	const history = useHistory()
	const {courseId, batchId, coursePrice } = useSelector((state) => state.paymentDetails)
	const {userInfo} = useSelector((state) => state.userLogin)
	const {location} = useSelector((state) => state.appDetails)
	const redirectPath = location.pathname
	const goToPage = (path) => {
		history.push(`${path}?redirect=${redirectPath}`)
	}
    async function displayRazorpay() {
		if(!batchId) {
			alert('Please select the batch')
		}
		else {
			const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

			if (!res) {
				alert('Razorpay SDK failed to load. Are you online?')
				return
			}

			const data = await getPaymentOrder(coursePrice)
			if(data) {
				const options = {
					key: __DEV__ ? 'rzp_test_H9PqOjnhfVnjBH' : 'rzp_live_4BTZdyP12eBx3z',
					currency: data.currency,
					amount: data.amount.toString(),
					order_id: data.id,
					name: 'Course Registration',
					description: `Registered for the course "${courseId}" and batch "${batchId}"`,
					image: Logo,
					handler: async function (response) {
						const rData = await enrollCourse(courseId, batchId, response)
						if(rData) {
							history.push('/dashboard')
						}
					}
				}
				const paymentObject = new window.Razorpay(options)
				paymentObject.open()
			}
			else {
				console.log('Error in loading payment screen')
			}
		}
    }
    
    return (
        <div 
            className={className} 
			onClick={() => userInfo ? displayRazorpay() : goToPage('/login')}
        >
            {children}
        </div>
    )
}

export default Payment
