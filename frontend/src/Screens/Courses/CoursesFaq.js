import React from "react";
import "./css/CoursesFaq.css";
import ReactHtmlParser from "react-html-parser";

const faqs = [
  {
    id: 1,
    id: 1,
    question: "What is Rancho Labs?",
    answer:
      "Started by IIT Delhi Alumni and Professors, Rancho Labs is a company that aims to ignite the curious minds of students and shine the light on lucrative career paths in AI, Coding, and Robotics, through practical knowledge. It provides India's best affordable LIVE online Coding, Robotics & AI classes by the country's top 0.1% tutors. Rancho Labs believe in practical learning and innovation; therefore, the curriculum is designed considering real-life examples. Project-based active learning helps students to grow their logical thinking. Students develop real-life projects under the guidance of experts from IITs that helps students build the entrepreneurial mindset from the early stage of life and set a strong foundation for their bright careers. ",
  },
  {
    id: 2,
    question: "Why should my child join the Young Innovators Program?",
    answer:
      "<p>If Driverless cars, new technologies, robots like Sophia and Alexa or AR/VR games like Pokémon excite your child, then Rancho Labs is the best place to turn his play into purpose. YIP entirely focuses on helping students follow their passion in technology. YIP is an early start to your child’s better future. We follow a unique methodology of Learn, Build, and Innovate to ensure that your ward surpasses others excel in this field. Let's understand this methodology.</p> <ol><li><strong>Learn</strong>: <i>Teach me and I may remember. Involve me and I learn.</i> Students learn via live classes taught by ubiquitous knowledge facilitators who ease all their doubts. Each class is designed distinctly based on the curiosity and interests of the students.</li><li><strong>Build</strong>: <i> “Bob the builder! Can we fix it? Bob the builder! Yes we can!”</i> Each class at Rancho Labs is followed by a live project to expand the student's understanding levels. Students master the skills that they have learned by building projects, the fun way. Just get started with the YIP already to know what wonders project-based learning can render :D</li><li><strong>Innovate</strong>: <i>“Fostering you to unleash the innovator within you is a built-in feature of our system.”</i> Students always come up with ingenious and unique ideas while learning at Rancho Labs. With the help of mentors from IITs and leading industry experts, they execute their ideas and develop amazing products. Many students end up featuring in national dailies. Guess what?! This led to their parents join our club as well. </li></ol>",
  },
  {
    id: 3,
    question:
      "Is it necessary to have physical components to learn robotics? How will my child learn robotics online?",
    answer:
      "No, it is not necessary to have physical components to start learning the concepts of robotics. Students learn via online simulation software in a safe and secure environment. Once students gain knowledge, they develop the final project in real life with the help of mentors. ",
  },
  {
    id: 4,
    question: "What does a week at Rancho Labs look like?",
    answer:
      "There is never a dull day at Rancho Labs. Every day is filled with fun, learning, and innovation. We conduct 3 live online classes a week. The classes are scheduled only after consulting the parents and children, considering their convenience and availability.",
  },
  {
    id: 5,
    question: "What happens if my child misses a class?",
    answer:
      "In case of missing class due to unexpected reasons, we provide the content and homework assignments for that particular class to the student. Students can also request the tutor to clarify his/her doubts 15 minutes prior to the start of next class. Alternatively, students can also book an extra 1:1(paid) session with the tutor.",
  },
  {
    id: 6,
    question: "How does Rancho Labs select teachers?",
    answer:
      "We select only the top 0.1% teachers from the best institutes like the IITs, NITs, and other top tier colleges via a 3-stage selection process to teach students. We guarantee that every tutor at Rancho Labs is well-trained to impart an abundance of knowledge into the young minds. ",
  },
  {
    id: 7,
    question:
      "What are you thinking about? The clock’s ticking. It’s time to awaken the innovators within your kid!",
    answer:
      "As a responsible parent, it is your duty to channelize children toward learning 21st-century skills, master coding concepts, and change the world for a better cause. Here comes Rancho Labs with its cutting edge technology to take your kid on a fun learning ride. To know more about the opportunities we provide, explore the AI, Robotics, and Programming courses offered, and enrol for a free class now! Remember, the trial is free!",
  },
  {
    id: 8,
    question: "Start learning with us!",
    answer:
      "Have further queries? Feel free to reach out to our customer support team or shoot a mail to us!",
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
