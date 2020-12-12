const schedule = require("node-schedule");
const Batch = require("../model/Batch");

const handleWorkshopClassMails = async () => {
  const batches = await Batch.find({ batchType: "workshop" });
  batches.forEach((singleBatch) => {
    let dayOne = new Date(singleBatch.singleDate).setHours(
      singleBatch.singleTime.toString().split(":")[0],
      singleBatch.singleTime.toString().split(":")[1],
      0,
      0
    );
    let daytwo = new Date(singleBatch.doubleDate).setHours(
      singleBatch.singleTime.toString().split(":")[0],
      singleBatch.singleTime.toString().split(":")[1],
      0,
      0
    );

    const getYesterday = (today) => {
      var yesterday = new Date(new Date(today).getTime());
      yesterday.setDate(new Date(today).getDate() - 1);
      return yesterday;
    };
    const get2hoursBefore = (today) => {
      var twoHoursBefore = new Date(today).setHours(
        new Date(today).getHours() - 2
      );
      return new Date(twoHoursBefore);
    };

    var day1Mail = schedule.scheduleJob(getYesterday(dayOne), function () {
      console.log("day 1 24hr mail");
    });

    var day2Mail = schedule.scheduleJob(getYesterday(daytwo), function () {
      console.log("day 2 24hr mail");
    });

    var day2TwoHoursMail = schedule.scheduleJob(
      get2hoursBefore(daytwo),
      function () {
        console.log("day 2 2hr mail");
      }
    );
  });
};

module.exports = handleWorkshopClassMails;
