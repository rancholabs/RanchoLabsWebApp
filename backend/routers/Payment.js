const express = require('express')
const router = express.Router()
const Student = require('../model/Student')
const isAuthenticated = require('../controller/requestAuthenticator')
const isAuthorized = require('../controller/requestAuthorizer')
const mongoose = require('mongoose')
const shortid = require('shortid')
const Razorpay = require('razorpay')
const {RAZOR_PAY_KEY_ID, RAZOR_PAY_KEY_SECRET} = require('./../config')

const instance = new Razorpay({
    key_id: RAZOR_PAY_KEY_ID,
    key_secret: RAZOR_PAY_KEY_SECRET,
})

router.post('/order', async (req, res) => {
	const payment_capture = 1
	const price = req.body.price
	if(price) {
		const amount = price.amount
		const currency = price.currencyCode

		const options = {
			amount: amount * 100,
			currency,
			receipt: shortid.generate(),
			payment_capture
		}

		try {
			const response = await instance.orders.create(options)
			console.log(response)
			res.json({
				id: response.id,
				currency: response.currency,
				amount: response.amount
			})
		} catch (error) {
			console.log(error)
			res.json({message: "Error in loading payment screen"})
		}
	}
	else {
		res.json({message: "Error in loading payment screen", error: "Bad Request"})
	}
})

router.post('/verification', (req, res) => {
	// do a validation
	const secret = '12345678'

	console.log(req.body)

	const crypto = require('crypto')

	const shasum = crypto.createHmac('sha256', secret)
	shasum.update(JSON.stringify(req.body))
	const digest = shasum.digest('hex')

	console.log(digest, req.headers['x-razorpay-signature'])

	if (digest === req.headers['x-razorpay-signature']) {
		console.log('request is legit')
		// process it
		console.log(req.body)
	} else {
		// pass it
	}
	res.json({ status: 'ok' })
})


module.exports = router