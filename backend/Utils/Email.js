const nodemailer = require("nodemailer");
const { MAIL: mailConfig } = require("./../config");
const template = require("./img/Sign Up - Welcome to RL/template");
const workshoptemplate = require("./WorkshopReminderTemplate");

const transporter = nodemailer.createTransport({
  host: mailConfig.host,
  port: 465,
  secure: true,
  auth: mailConfig.auth,
});

const getTemplate = (type) => {
  const day = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const ordinal_suffix_of = (i) => {
    var j = i % 10,
      k = i % 100;
    if (j == 1 && k != 11) {
      return i + "st";
    }
    if (j == 2 && k != 12) {
      return i + "nd";
    }
    if (j == 3 && k != 13) {
      return i + "rd";
    }
    return i + "th";
  };

  function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  }

  switch (type) {
    case "ACCOUNT_REGISTERED":
      return (args) => {
        return {
          subject: "Account Registered",
          mail: template.generate(args.name).toString(),
        };
      };
    case "WORKSHOP_EMAIL":
      return (args) => {
        return {
          subject: "Workshop Reminder",
          mail: workshoptemplate.generate(args).toString(),
        };
      };
    case "PASSWORD_SET":
      return (args) => {
        return {
          subject: "Set Password",
          mail: `Dear student,
                    <div style="text-indent:5em;padding-top:1em;">Your account password has been set successfully.</div><br>
                    Thanks,<br>
                    Rancho Labs`,
        };
      };

    case "PASSWORD_CHANGED":
      return (args) => {
        return {
          subject: "Changed Password",
          mail: `Dear student,
                    <div style="text-indent:5em;padding-top:1em;">Your account password has been changed successfully.</div><br>
                    Thanks,<br>
                    Rancho Labs`,
        };
      };

    case "COURSE_REGISTERED":
      return (args) => {
        const { courseName, startDate } = args;
        const date = new Date(startDate);
        const startsOn =
          ordinal_suffix_of(date.getDate()) +
          " " +
          month[date.getMonth()] +
          ", " +
          date.getFullYear() +
          " (" +
          day[date.getDay()] +
          ")";
        return {
          subject: "Course Registered Successfully",
          mail: `Dear student,
                    <div style="text-indent:5em;padding-top:1em;">You have successfully registered for the course <b>${courseName}</b> which starts on <i>${startsOn}</i>.</div><br>
                    Thanks,<br>
                    Rancho Labs`,
        };
      };

    case "RESET_PASSWORD":
      return (args) => {
        const { link } = args;
        return {
          subject: "Reset Password Link",
          mail: `Dear student,
                    <div style="text-indent:5em;padding-top:1em;">You can reset your password using the below link</div>
                    <div style="text-indent:5em;">${link}</div><br>
                    Thanks,<br>
                    Rancho Labs`,
        };
      };
    case "CLASSTIME_UPDATED":
      return (args) => {
        const { courseName, startDate } = args;
        const date = new Date(startDate);
        const startsOn =
          ordinal_suffix_of(date.getDate()) +
          " " +
          month[date.getMonth()] +
          ", " +
          date.getFullYear() +
          " " +
          formatAMPM(date) +
          " (" +
          day[date.getDay()] +
          ")";
        return {
          subject: "Class time update",
          mail: `Dear student,
                    <div style="text-indent:5em;padding-top:1em;">Your next class for course <b>${courseName}</b> is scheduled on <b><i>${startsOn}</i></b></div><br>
                    Thanks,<br>
                    Rancho Labs`,
        };
      };

    case "ABSENT":
      const { courseName, startDate } = args;
      const date = new Date(startDate);
      const conductedOn =
        ordinal_suffix_of(date.getDate()) +
        " " +
        month[date.getMonth()] +
        ", " +
        date.getFullYear() +
        " " +
        formatAMPM(date) +
        " (" +
        day[date.getDay()] +
        ")";
      return (args) => {
        return {
          subject: "Absent for the Class",
          mail: `Dear parent,
                    <div style="text-indent:5em;padding-top:1em;">Your son/daughter is <b><i>absent</i></b> for the class in <b>${courseName}</b> course conducted on <b><i>${conductedOn}</i></b>.</div><br>
                    Thanks,<br>
                    Rancho Labs`,
        };
      };

    case "SEND_MESSAGE":
      return (args) => {
        const { senderName, message } = args;
        return {
          subject: "Message from " + senderName,
          mail: `
                    <div style="padding-top:1em;">${message}</div>`,
        };
      };

    case "MESSAGE_ACKNOWLEDGEMENT":
      return (args) => {
        const { senderName } = args;
        return {
          subject: "We recieved your message",
          mail: `Hi ${senderName},
                    <div style="text-indent:5em;padding-top:1em;">We are glad to receive your message.</div><br>
                    Thanks,<br>
                    Rancho Labs`,
        };
      };

    case "CALLBACK_REQUEST":
      return (args) => {
        const { senderName, senderContact } = args;
        return {
          subject: "Callback request from " + senderName,
          mail: `Hi,
                    <div style="text-indent:5em;padding-top:1em;">${senderName} has requested for callback on number : ${senderContact}.</div><br>`,
        };
      };
  }
};

const sendMail = (toList, templateParams) => {
  const { type: templateType, args: templateArgs } = templateParams;
  const to = toList.join(",");
  const { subject, mail } = getTemplate(templateType)(templateArgs);
  const mailOptions = {
    from: '"Rancho Labs" <noreply@rancholabs.com>',
    to: to,
    subject: subject,
    html: mail,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

//sendMail(['gokulnathb.16cse@kongu.edu'], {type: 'RESET_PASSWORD', args: {link: 'http://hece.kongu.edu'}})

module.exports = { sendMail };
