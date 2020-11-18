import React from "react";
import "./css/CoursesFaq.css";

const faqs = [
  {
    id: 1,
    id: 1,
    question: "What is Rancho Labs?",
    answer:
      "Lido provides India’s best LIVE online classes with the country’s top 0.1% tutors and a 6:1 student-teacher ratio, so every student can score better marks and look forward to a bright future! Lido has live classes in Maths, Science, English, and Coding, and more. We cater to students of KG, class 1st, class 2nd, class 3rd, all the way to class 10th.",
  },
  {
    id: 2,
    question: "How does Rancho Labs help my child?",
    answer:
      "Lido is the best solution for your child. For the best learning experience, a student needs face-to-face interaction with rockstar teachers, interactive content, and a personalized platform. Lido combines these three in its classroom for the 21st century, which is guaranteed to improve results. Personalized attention: With face-to-face interaction with tutors and a maximum of 6 students per class, your child receives personalized attention, regular feedback, and enough opportunities to clarify doubts. Engaging content: Designed by Harvard, Stanford, and IIT alums, every live online class has HD animated videos, interactive games, live quiz competitions, and more. This helps your child learn concepts better and fall in love with learning. Real-world skills: Lido covers full school curriculum AND extra-curricular skills like problem-solving, technical skills, communication, and creativity through its live online classes.",
  },
  {
    id: 3,
    question: "What does a week at Rancho Labs look like?",
    answer:
      "Every week at Lido is filled with fun and learning. We conduct 9 live online classes a week - our Maths classes are conducted on Monday, Wednesday, and Friday; English and Science on Tuesday and Thursday, and Coding on Saturday and Sunday. Additionally, all our students have access to a video library covering all key concepts, and an unlimited question bank for extra practice.",
  },
  {
    id: 4,
    question: "Will Rancho Labs help with homework and clearing doubts?",
    answer:
      "Our 6:1 student-teacher ratio allows every student enough time with the teacher to clarify doubts before the class ends. Further, our AI-driven homework solutions help students practice and learn independently, even without the teacher around!",
  },
  {
    id: 5,
    question: "What happens if my child misses a class?",
    answer:
      "In case of a missed class, we’ll provide all the content and homework assignments for that class to your child. Alternatively, your child can book an extra (paid) 1:1 session with the tutor.",
  },
  {
    id: 6,
    question: "Do I have to sign up for all the subjects?",
    answer:
      "Lido offers live classes in Maths, Science, English, Coding, and more. Based on your child’s needs, you can choose to sign up for as many courses as you want - one subject, or two, or three, or all four! You can also sign up for any of the new courses we offer at any time. Lido will soon be launching live online classes for extracurricular subjects like Vedic Maths, Public Speaking, Robotics, and more!",
  },
  {
    id: 7,
    question: "How does Rancho Labs select teachers?",
    answer:
      "We select only the top 0.1% teachers in India from the world’s best institutes like the IITs, MIT, Stanford, and Harvard, among others to teach your child in our live online classes. We guarantee that every teacher is well-trained to ensure excellent results for your child. Instead of you having to search for an online tutor for your child, our advanced AI algorithm finds the perfect teacher for your child.",
  },
  {
    id: 8,
    question: "Start learning with us!",
    answer:
      "If you are a motivated parent and want to empower your child to learn skills, master concepts, and change the world, join Lido now. If you or your child want to learn more about the opportunities provided by our live online classes/programs, explore the Maths, Science, English, and Coding classes/courses offered by Lido Learning Jr. and enroll for a free class now! Remember, the trial is totally free!",
  },
];

const Faq = (props) => {
  return (
    <>
      <div className="faq-question">{props.question}</div>
      <div className="faq-ans">{props.answer}</div>
    </>
  );
};

const CoursesFaq = () => {
  return (
    <>
      <div className="courses-faq">
        <div className="courses-faq-title">FAQ</div>
        {faqs.map((faq) => {
          return (
            <Faq key={faq.id} question={faq.question} answer={faq.answer} />
          );
        })}
      </div>
    </>
  );
};

export default CoursesFaq;
