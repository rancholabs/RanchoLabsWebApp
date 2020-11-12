const { Mongoose } = require("mongoose");

const mongoose = require('mongoose')
const db = require('./db')
const Student = require('./model/UserCourse')
db.connect()

/*
const userData = new Student({
    _id: new mongoose.Types.ObjectId(),
    groupId: new mongoose.Types.ObjectId('5f5d2175bfcae04a94a9ad3f'),
    name: 'AI-1',
    description: 'bla bla',
    durationInHours: 5,
    NoOfWeeks: 2,
    price: {
        currency: 5000
    },
    overview: 'o1',
    detailedView: 'dv1',
    learn: [{topic: 'A1', description: 'd1'}, {topic: 'A2', description: 'd2'}],
    build: [
        {topic: 'A1', description: 'd1', image: new mongoose.Types.ObjectId('5f5d288a3bfece4e144d6e0d')},
        {topic: 'A2', description: 'd2', image: new mongoose.Types.ObjectId('5f5d288a3bfece4e144d6e0d')}
    ],
    innovate: [
        {description: 'd1', image: new mongoose.Types.ObjectId('5f5d288a3bfece4e144d6e0d')}, 
        {description: 'd2', image: new mongoose.Types.ObjectId('5f5d288a3bfece4e144d6e0d')}
    ],
    courseStructure: new mongoose.Types.ObjectId('5f5d288a3bfece4e144d6e0d'),
    outcomes: ['o1','o2'],
    instructors: [new mongoose.Types.ObjectId('5f5d29fd52b899434c7e0887'), new mongoose.Types.ObjectId('5f5d295552b899434c7e0885')],
    reviews: [{userId: new mongoose.Types.ObjectId('5f5d1bfb1b09f83d188efb58'), review: 'R1'}],
    gradeRange: {
        minG: 6,
        maxG: 8
    },
    materials: [
        {
            slides: new mongoose.Types.ObjectId('5f5d288a3bfece4e144d6e0d'),
            quizLink: 'q1',
            assignmentLink: 'a1'
        },
        {
            slides: new mongoose.Types.ObjectId('5f5d288a3bfece4e144d6e0d'),
            quizLink: 'q2',
            assignmentLink: 'a2'
        }
    ]
});
*/

const userData = new Student({
    userId: new mongoose.Types.ObjectId('5f5d1bfb1b09f83d188efb58'),
    batchId: new mongoose.Types.ObjectId('5f5d2f3451325b51307d7267'),
    payment: {
        paid: true,
        transactionId: 't1'
    }
});

/*
const userData = new Student({
    _id: new mongoose.Types.ObjectId(),
    courseId: new mongoose.Types.ObjectId('5f5d2b018c07ce4a5c00736c'),
    classLink: 'cl1',
    notes: [
        {
            note: 'n1',
            createdAt: new Date().toISOString()
        },
        {
            note: 'n2',
            createdAt: new Date().toISOString()
        }
    ],
    weeklyView: [
        {
            quizResults: [{userId: new mongoose.Types.ObjectId('5f5d1bfb1b09f83d188efb58'), score: 98}],
            assignments: [{userId: new mongoose.Types.ObjectId('5f5d1bfb1b09f83d188efb58'), score: 96}],
            attendance: [{userId: new mongoose.Types.ObjectId('5f5d1bfb1b09f83d188efb58'), present: true}]
        },
        {
            quizResults: [],
            assignments: [],
            attendance: [{userId: new mongoose.Types.ObjectId('5f5d2b018c07ce4a5c00736c'), present: false}]
        }
    ]
});
*/

userData.save()
.then(doc => {
    console.log('Saved!')
})
.catch(err => {
    console.log('Failed', err)
})
