import React, { useEffect } from "react";
import AboutUsMain from "./AboutUsMain";
import AboutUsWhatweDo from "./AboutUsWhatweDo";
import AboutUsThoughtprocess from "./AboutUsThoughtprocess";
import AboutUsInvest from "./AboutUsinvest";
import AboutUsWhereweStand from "./AboutUsWhereweStand";
import AboutUsFamily from "./AboutUsFamily";
import AboutUsContact from "./AboutUsContact";
import AbouUsGallery from "./AboutUsGallery";
import { useDispatch } from "react-redux";
import { updateHeader } from "../../Actions/Header";
// import AboutUsCallModal from './AboutUsCallModal'
import { Helmet } from "react-helmet";

const AboutUs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      updateHeader({
        backgroundColor: "#0A0E2A",
        color: "#FFFFFF",
        iconColor: "#3CAFF",
      })
    );
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>About Us</title>
        <meta
          name="description"
          content="We are a group of passionate individuals dedicated to making the learning experience of students, a memorable and impactful one. Started by IIT Delhi Alumni and Professors, are a company that aims to ignite the curious minds of students and shine the light on lucrative career paths in AI, Coding, and Robotics, through practical knowledge."
        />
      </Helmet>
      <AboutUsMain />
      <AboutUsWhatweDo />
      <AboutUsThoughtprocess />
      <AboutUsInvest />
      <AboutUsWhereweStand />
      <AboutUsFamily />
      <AbouUsGallery />
      <AboutUsContact />
      {/* <AboutUsCallModal /> */}
    </>
  );
};

export default AboutUs;
