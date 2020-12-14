import React from "react";
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";

export default function SocialMediaButtons(props) {
  return (
    <>
      {props.icon.name === "Facebook" ? (
        <FacebookShareButton
          url={props.sharelink ? props.sharelink : "https://rancholabs.com"}
          quote={props.shareText ? props.shareText : "Check out Rancho Labs!"}
          hashtag="#rancholabs"
          onClick={props.copyShareLink ? props.copyShareLink : null}
        >
          <img src={props.icon.icon}></img>
        </FacebookShareButton>
      ) : props.icon.name === "WhatsApp" ? (
        <WhatsappShareButton
          url={props.sharelink ? props.sharelink : "https://rancholabs.com"}
          title={props.shareText ? props.shareText : "Check out Rancho Labs!"}
          onClick={props.copyShareLink ? props.copyShareLink : null}
        >
          <img src={props.icon.icon}></img>
        </WhatsappShareButton>
      ) : props.icon.name === "LinkedIn" ? (
        <LinkedinShareButton
          url={props.sharelink ? props.sharelink : "https://rancholabs.com"}
          title={props.shareText ? props.shareText : "Check out Rancho Labs!"}
          onClick={props.copyShareLink ? props.copyShareLink : null}
        >
          <img src={props.icon.icon}></img>
        </LinkedinShareButton>
      ) : props.icon.name === "Twitter" ? (
        <TwitterShareButton
          url={props.sharelink ? props.sharelink : "https://rancholabs.com"}
          title={props.shareText ? props.shareText : "Check out Rancho Labs!"}
          onClick={props.copyShareLink ? props.copyShareLink : null}
        >
          <img src={props.icon.icon}></img>
        </TwitterShareButton>
      ) : null}
    </>
  );
}
