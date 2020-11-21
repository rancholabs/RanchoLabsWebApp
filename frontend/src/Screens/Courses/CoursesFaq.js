import React from "react";
import "./css/CoursesFaq.css";
import ReactHtmlParser from "react-html-parser";

const faqs = [
  {
    id: 1,
    id: 1,
    question: "What is Rancho Labs?",
    answer:
      "Started by IIT Delhi Alumni and Professors, Rancho Labs is a company that aims to ignite the curious minds of students and shine the light on lucrative career paths in AI, Coding, and Robotics, through practical knowledge. It provides India's best affordable LIVE online Coding, Robotics & AI classes by the country's top 0.1% tutors. It gives a 1:1 and 3:1 student-teacher ratio LIVE classes. Rancho Labs believe in practical learning and innovation; therefore, the curriculum is designed considering real-life examples. Project-based active learning helps students to grow their logical thinking. Students develop real-life projects under the guidance of experts from IITs that helps students build the entrepreneurial mindset from the early stage of life and set a strong foundation for their bright careers.",
  },
  {
    id: 2,
    question: "Why should my child join Rancho Labs?",
    answer:
      "<p>If Driverless cars, new technologies, robots like Sophia and Alexa or AR/VR games like pokemon excites your child, then Rancho Labs is the best place for himher. Rancho Labs is developed from scratch to help students follow their curiosity in technology. We follow a unique methodology of Learn, Build, and Innovate to ensure your child's overall development. Let's understand this methodology.</p> <ol><li><strong>Learn</strong>: Students learn via live classes taught by highly qualified teachers. Each class is designed based on the curiosity and interests of the students.</li><li><strong>Build</strong>: Teach me and I may remember. Involve me and I learn. Each class at Rancho Labs is followed by a live project to maximize the student's learning. Students master the skills that they have learned by building projects, the fun way. </li><li><strong>Innovate</strong>: Students always come up with amazing and unique ideas while learning at Rancho Labs. With the help of mentors from IITs and leading industries they execute their ideas and develop amazing products. Many students end up featuring in newspapers and filing patents for their own innovation</li></ol>",
  },
  {
    id: 3,
    question:
      "Is it necessary to have physical components to learn robotics? How will my child learn robotics online?",
    answer:
      "No, It is not necessary to have physical components to start learning the concepts of robotics. Students learn via online simulation software in a safe environment. Once students good knowledge, they develop the final project in real life with the help of mentors.",
  },
  {
    id: 4,
    question: "What does a week at Rancho Labs look like?",
    answer:
      "There is never a dull day at Rancho Labs; every day is filled with fun, learning and innovation. We conduct 3 live online classes a week. The class timings and days are finalized in discussion with parents and child keeping their availability into consideration.",
  },
  {
    id: 5,
    question: "What happens if my child misses a class?",
    answer:
      "In case of a missed class, we provide the content and homework assignments for the class to the student. Students can also request a tutor for a 15min doubt class. (2 per month) Alternatively, students can book an extra 1:1(paid) session with the tutor",
  },
  {
    id: 6,
    question: "How does Rancho Labs select teachers?",
    answer:
      "We select only the top 0.1% teachers from the best institutes like the IITs, NITs, and other top tier colleges via a 3-stage selection process to teach students. We guarantee that every teacher is well-trained to ensure excellent results for your child.",
  },
  {
    id: 7,
    question:
      "Is there any refund policy available for the already bought curriculum/course?",
    answer:
      "Yes. We provide the same day 100% refund for the remaining classes. We believe in improving our services each day and are looking for constant feedback from our students and their parents. It is hardly a case when someone applies for a refund concerning our services.",
  },
  {
    id: 8,
    question: "Start learning with us!",
    answer:
      "If you are a motivated parent and want to empower your child to learn 21st-century skills, master coding concepts, and change the world, join Rancho Labs now. If you want to learn more about the opportunities provided, explore the AI, Robotics, and Programming courses offered, and enroll for a free class now! Remember, the trial is free!",
  },
];

const Faq = (props) => {
  return (
    <>
      <div className="faq-question">{props.question}</div>
      <div className="faq-ans"> {ReactHtmlParser(props.answer)}</div>
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
        <br />
        <div className="faq-ans">
          Have any queries? Feel free to reach out to our customer support or
          shoot a mail to us!
        </div>
      </div>
    </>
  );
};

export default CoursesFaq;
