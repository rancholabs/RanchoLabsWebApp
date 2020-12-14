const schedule = require("node-schedule");
const Batch = require("../model/Batch");
const StudentCourse = require("../model/StudentCourse");
const User = require("../model/User");
const { sendMail } = require("../Utils/Email");

const handleWorkshopClassMails = async () => {
  const batches = await Batch.find({ batchType: "workshop" });
  batches.forEach(async (singleBatch) => {
    let studCourse = await StudentCourse.find({ batchId: singleBatch._id });

    let dayOne = new Date(singleBatch.singleDate).setHours(
      singleBatch.singleTime.toString().split(":")[0],
      singleBatch.singleTime.toString().split(":")[1],
      0,
      0
    );
    let daytwo = new Date(singleBatch.doubleDate).setHours(
      singleBatch.doubleTime.toString().split(":")[0],
      singleBatch.doubleTime.toString().split(":")[1],
      0,
      0
    );

    function formatDate(d) {
      var date = new Date(d);

      if (isNaN(date.getTime())) {
        return d;
      } else {
        var month = new Array();
        month[0] = "Jan";
        month[1] = "Feb";
        month[2] = "Mar";
        month[3] = "Apr";
        month[4] = "May";
        month[5] = "Jun";
        month[6] = "Jul";
        month[7] = "Aug";
        month[8] = "Sept";
        month[9] = "Oct";
        month[10] = "Nov";
        month[11] = "Dec";

        day = date.getDate();

        if (day < 10) {
          day = "0" + day;
        }

        return day + " " + month[date.getMonth()] + " " + date.getFullYear();
      }
    }

    let date_responseDay1 = formatDate(singleBatch.singleDate);
    let date_responseDay2 = formatDate(singleBatch.doubleDate);

    const timeconvert24to12 = (time) => {
      var suffix = parseInt(time.toString().split(":")[0]) >= 12 ? "PM" : "AM";
      var hours = ((parseInt(time.toString().split(":")[0]) + 11) % 12) + 1;
      var convertedTime =
        hours + ":" + time.toString().split(":")[1] + " " + suffix;
      return convertedTime;
    };

    const day1__time = timeconvert24to12(singleBatch.singleTime);
    const day2__time = timeconvert24to12(singleBatch.doubleTime);

    const twoHours = 60 * 60 * 2 * 1000;
    const oneDay = 60 * 60 * 24 * 1000;
    let now = new Date();

    studCourse.forEach((singleStudent) => {
      User.findById(singleStudent.userId).then((docs) => {
        let count = 0;
        if (singleBatch.emails) {
        } else {
          singleBatch.emails = [];
        }
        let studEmails = singleBatch.emails.filter(
          (singleStudEmail) =>
            singleStudEmail.userId.toString() === docs._id.toString()
        );
        if (studEmails && studEmails.length > 0) {
          studEmails = studEmails[0];
        } else {
          studEmails = {
            userId: docs._id,
            day1Mail: false,
            day1TwoHoursMail: false,
            day2TwoHoursMail: false,
          };
        }
        // DAY 1 24HOUR MAIL
        if (!studEmails.day1Mail) {
          let day1 = new Date(dayOne);
          var day1_Difference = day1 - now > 0 && day1 - now < oneDay;
          if (day1_Difference) {
            // SEND DAY 1 24HOUR EMAIL
            console.log("day 1 email sent for " + docs.name.first);

            sendMail([docs.email], {
              type: "WORKSHOP_EMAIL",
              args: {
                name: docs.name.first,
                day: 1,
                date: date_responseDay1,
                time: day1__time,
              },
            });

            // CREATE A CHECK FOR STUDENT DAY 1 MAIL SENT
            studEmails.day1Mail = true;
            // docs.day1Mail = true;
            count++;
          }
        }

        // DAY 1 2HOUR MAIL
        if (!studEmails.day1TwoHoursMail) {
          let day1 = new Date(dayOne);
          var day1TwoHour_Difference = day1 - now > 0 && day1 - now < twoHours;
          if (day1TwoHour_Difference) {
            // SEND DAY 1 2HOUR EMAIL
            console.log("day 1 two hours email sent for " + docs.name.first);

            sendMail([docs.email], {
              type: "WORKSHOP_EMAIL",
              args: {
                name: docs.name.first,
                day: 1,
                date: date_responseDay1,
                time: day1__time,
              },
            });

            // CREATE A CHECK FOR STUDENT DAY 1 MAIL SENT
            studEmails.day1TwoHoursMail = true;
            // docs.day1Mail = true;
            count++;
          }
        }

        // DAY 2 2HOUR MAIL
        if (!studEmails.day2TwoHoursMail) {
          let day2 = new Date(daytwo);
          var day2TwoHour_Difference = day2 - now > 0 && day2 - now < twoHours;
          if (day2TwoHour_Difference) {
            // SEND DAY 2 2HOUR EMAIL
            console.log("day 2 two hour email sent for " + docs.name.first);
            sendMail([docs.email], {
              type: "WORKSHOP_EMAIL",
              args: {
                name: docs.name.first,
                day: 2,
                date: date_responseDay2,
                time: day2__time,
              },
            });

            // CREATE A CHECK FOR STUDENT DAY 2 2HOUR MAIL SENT
            studEmails.day2TwoHoursMail = true;
            // docs.day2TwoHoursMail = true;
            count++;
          }
        }

        if (count > 0) {
          let index = singleBatch.emails.findIndex(
            (semail) => semail.userId.toString() === docs._id.toString()
          );
          if (index !== -1) {
            singleBatch.emails[index] = studEmails;
          } else {
            singleBatch.emails.push(studEmails);
          }
          Batch.findByIdAndUpdate(
            {
              _id: singleBatch._id,
            },
            singleBatch
          ).then((result) => {
            console.log("Batch updated for " + docs.name.first);
          });
        }
      });
    });
  });
};

module.exports = handleWorkshopClassMails;
