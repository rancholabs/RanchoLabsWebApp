const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Certificate = require("../model/Certificate");
const CertTemp = require("../Utils/certHTML/certHtml");
const nodeHtmlToImage = require("node-html-to-image");
const path = require("path");
var fs = require("fs");

// background
const certificatedesign2 = fs.readFileSync(
  path.resolve(__dirname, "../Utils/certHTML/certificate-design-2.png")
);
const certificatedesign2base64Image = new Buffer.from(
  certificatedesign2
).toString("base64");
const certificatedesign2dataURI =
  "data:image/jpeg;base64," + certificatedesign2base64Image;

// logo
const logoimage = fs.readFileSync(
  path.resolve(__dirname, "../Utils/certHTML/logo_2.png")
);
const logoimagebase64Image = new Buffer.from(logoimage).toString("base64");
const logoimagedataURI = "data:image/jpeg;base64," + logoimagebase64Image;

// untitled35
const untitled35 = fs.readFileSync(
  path.resolve(__dirname, "../Utils/certHTML/Untitled_design_35.png")
);
const untitled35base64Image = new Buffer.from(untitled35).toString("base64");
const untitled35dataURI = "data:image/jpeg;base64," + untitled35base64Image;

// untitled36
const untitled36 = fs.readFileSync(
  path.resolve(__dirname, "../Utils/certHTML/Untitled_design_36.png")
);
const untitled36base64Image = new Buffer.from(untitled36).toString("base64");
const untitled36dataURI = "data:image/jpeg;base64," + untitled36base64Image;

// certQR
const certQR = fs.readFileSync(
  path.resolve(__dirname, "../Utils/certHTML/cert__qr.png")
);
const certQRbase64Image = new Buffer.from(certQR).toString("base64");
const certQRdataURI = "data:image/jpeg;base64," + certQRbase64Image;

function dataURLtoFile(dataurl, filename) {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

router.post("/", async (req, res) => {
  if (req.body.file) {
    req.body.file = mongoose.Types.ObjectId(req.body.file);
  }
  if (req.body.userId) {
    req.body.userId = mongoose.Types.ObjectId(req.body.userId);
  }
  if (req.body.courseId) {
    req.body.courseId = mongoose.Types.ObjectId(req.body.courseId);
  }
  const { name, file, userId, courseId, from, to } = req.body;

  const allCerts = await Certificate.find({});

  let certID = "RLCT";
  if (allCerts.length) {
    certID = certID + parseInt(allCerts.length + 1);
  } else {
    certID = certID + "1";
  }

  const newCertificate = new Certificate({
    id: certID,
    name,
    file,
    userId,
    courseId,
    from,
    to,
  });
  newCertificate
    .save()
    .then((doc) => {
      res.status(200).send({ message: "Certificate added successfuly!" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ error: "Certificate not added" });
    });
});

router.get("/", async (req, res) => {
  const error = {
    message: "Error in retrieving blogs",
    error: "Bad Request",
  };
  Certificate.aggregate([
    {
      $lookup: {
        from: "courses",
        let: { courseId: "$courseId" },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$groupId", "$$courseId"],
              },
            },
          },
          {
            $project: {
              name: 1,
              groupId: 1,
              _id: 1,
            },
          },
        ],
        as: "courseData",
      },
    },
    {
      $unwind: {
        path: "$courseData",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "files",
        let: { file: "$file" },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$_id", "$$file"],
              },
            },
          },
          {
            $project: {
              originalName: 1,
              filePath: 1,
              _id: 1,
            },
          },
        ],
        as: "filedata",
      },
    },
    {
      $unwind: {
        path: "$filedata",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "users",
        let: { userId: "$userId" },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$_id", "$$userId"],
              },
            },
          },
          {
            $project: {
              name: 1,
              _id: 1,
              email: 1,
            },
          },
        ],
        as: "userData",
      },
    },
    {
      $unwind: {
        path: "$userData",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $project: {
        __v: 0,
      },
    },
  ])
    .exec()
    .then((certificates) => {
      res.status(200).send(certificates);
    })
    .catch((err) => {
      console.log("Error:", err);
      res.status(400).send(error);
    });
});

router.post("/verify", (req, res) => {
  const { userId, courseId, name, payment } = req.body;
  Certificate.find({
    // userId: userId,
    // courseId: courseId,
    // name: name,
    "payment.orderId": payment.orderId,
  })
    .then((doc) => {
      if (doc.length > 0) {
        res.send("Valid payment");
      } else {
        res.status(404).send("invalid payment");
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("server error");
    });
});

router.get("/single/:id", (req, res) => {
  const certId = req.params.id;
  Certificate.find({ id: certId }).then((docs) => {
    if (docs.length > 0) {
      res.send(docs);
    } else {
      res.status(404).send("Not found!");
    }
  });
});

router.put("/", (req, res) => {
  const { userId, courseId, name, payment, file } = req.body;
  Certificate.findOneAndUpdate(
    {
      "payment.orderId": payment.orderId,
    },
    {
      file: file,
    }
  )
    .then((doc) => {
      res.send("certificate updated!");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("server error");
    });
});

router.post(`/certfile`, async function (req, res) {
  const { userInfo, from, to, month, year } = req.body;

  var today = new Date();

  today =
    (today.getDate() < 10 ? "0" + today.getDate() : today.getDate()) +
    "/" +
    (today.getMonth() + 1 < 10
      ? "0" + (today.getMonth() + 1)
      : today.getMonth() + 1) +
    "/" +
    today.getFullYear();

  const monthArray = [
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

  const allCerts = await Certificate.find({});

  let certID = "RLCT";
  if (allCerts.length) {
    certID = certID + parseInt(allCerts.length);
  } else {
    certID = certID + "1";
  }

  const data = {
    userInfo,
    from,
    to,
    month: monthArray[month],
    year,
    today,
    certID,
  };

  const strHTML = `
  <!DOCTYPE html>
  <html>
  <head>
  <meta charset="utf-8"/>
  <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>certificate design 2</title>
  <style class="applicationStylesheet" type="text/css">
    .mediaViewInfo {
      --web-view-name: certificate design 2;
      --web-view-id: certificatedesign;
      --web-scale-on-resize: true;
      --web-enable-deep-linking: true;
    }
    :root {
      --web-view-ids: certificatedesign;
    }
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      border: none;
    }
    body{
      width: 842px;
      height: 595px;
    }
    .certificatedesigncls {
      position: absolute;
      width: 842px;
      height: 595px;
      background-color: rgba(255,255,255,1);
      overflow: hidden;
      --web-view-name: certificate design 2;
      --web-view-id: certificatedesign;
      --web-scale-on-resize: true;
      --web-enable-deep-linking: true;
    }
    .certificate-design {
      position: absolute;
      width: 842px;
      height: 595.5px;
      left: 0px;
      top: 0px;
      overflow: visible;
    }
    .CERTIFICATEOFCOMPLETION {
      left: 191px;
      top: 40px;
      position: absolute;
      overflow: visible;
      width: 568px;
      white-space: nowrap;
      text-align: left;
      font-family: Microsoft Tai Le;
      font-style: normal;
      font-weight: bold;
      font-size: 40px;
      color: rgba(27,20,100,1);
    }
    .logo {
      position: absolute;
      width: 166px;
      height: 81px;
      left: 25px;
      top: 126px;
      overflow: visible;
    }
    .IDDATE {
      left: 697px;
      top: 95px;
      position: absolute;
      overflow: visible;
      width: 93px;
      white-space: nowrap;
      text-align: left;
      font-family: Gotham;
      font-style: normal;
      font-weight: normal;
      font-size: 18px;
      color: rgba(0,0,0,1);
    }
    .forcompletingthetwoDaysCo {
      left: 253px;
      top: 269px;
      position: absolute;
      overflow: visible;
      width: 507px;
      white-space: nowrap;
      text-align: center;
      font-family: Microsoft Tai Le;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      color: rgba(0,0,0,1);
    }
    .Thiscertificateisawardedto {
      left: 407px;
      top: 155px;
      position: absolute;
      overflow: visible;
      width: 227px;
      white-space: nowrap;
      text-align: center;
      font-family: Microsoft Tai Le;
      font-style: normal;
      font-weight: normal;
      font-size: 18px;
      color: rgba(0,0,0,1);
    }
    .AravSrivastava {
      left: 334px;
      top: 178px;
      position: absolute;
      overflow: visible;
      width: 371px;
      white-space: nowrap;
      text-align: center;
      font-family: Baby Lovely;
      font-style: normal;
      font-weight: normal;
      font-size: 56px;
      color: rgba(191,158,51,1);
      text-transform: capitalize;
    }
    .ANSHULAGRAWAL {
      left: 191px;
      top: 496px;
      position: absolute;
      overflow: hidden;
      width: 198px;
      height: 32px;
      text-align: left;
      font-family: Roboto;
      font-style: normal;
      font-weight: normal;
      font-size: 18px;
      color: rgba(0,0,0,1);
    }
    .IDCERT {
      left: 689px;
      top: 419px;
      position: absolute;
      overflow: hidden;
      width: 77px;
      height: 32px;
      text-align: left;
      font-family: Lato;
      font-style: normal;
      font-weight: normal;
      font-size: 15px;
      color: rgba(255,255,255,1);
    }
    .Founder {
      left: 216px;
      top: 524px;
      position: absolute;
      overflow: visible;
      width: 98px;
      height: 32px;
      text-align: center;
      font-family: Roboto;
      font-style: normal;
      font-weight: normal;
      font-size: 12px;
      color: rgba(0,0,0,1);
    }
    .IdRLCT {
      left: 655px;
      top: 443px;
      position: absolute;
      overflow: hidden;
      width: 84px;
      height: 12px;
      text-align: center;
      font-family: Microsoft Tai Le;
      font-style: normal;
      font-weight: normal;
      font-size: 12px;
      color: rgba(0,0,0,1);
    }
    .Co-Founder {
      left: 473px;
      top: 524px;
      position: absolute;
      overflow: visible;
      width: 133px;
      height: 32px;
      text-align: center;
      font-family: Roboto;
      font-style: normal;
      font-weight: normal;
      font-size: 12px;
      color: rgba(0,0,0,1);
    }
    .AMANKUMAR {
      left: 477px;
      top: 496px;
      position: absolute;
      overflow: hidden;
      width: 154px;
      height: 32px;
      text-align: left;
      font-family: Roboto;
      font-style: normal;
      font-weight: normal;
      font-size: 18px;
      color: rgba(0,0,0,1);
    }
    .Pathcls {
      fill: rgba(0,0,0,0);
      stroke: rgba(255,255,255,1);
      stroke-width: 5px;
      stroke-linejoin: miter;
      stroke-linecap: butt;
      stroke-miterlimit: 4;
      shape-rendering: auto;
    }
    .Path {
      overflow: visible;
      position: absolute;
      width: 1px;
      height: 1px;
      left: 777.5px;
      top: 391.5px;
      transform: matrix(1,0,0,1,0,0);
    }
    .ScrollGrouptwo {
      mix-blend-mode: normal;
      position: absolute;
      width: 285px;
      height: 55px;
      left: 388px;
      top: 441px;
      overflow: hidden;
    }
    .Untitleddesignthirtyfive {
      position: absolute;
      width: 285px;
      height: 285px;
      left: 0px;
      top: -115px;
      overflow: visible;
    }
    .ScrollGroupthree {
      mix-blend-mode: normal;
      position: absolute;
      width: 242px;
      height: 60px;
      left: 146px;
      top: 441px;
      overflow: hidden;
    }
    .Untitleddesignthirtysix {
      position: absolute;
      width: 242px;
      height: 242px;
      left: 0px;
      top: -88px;
      overflow: visible;
    }
    .CertificateQRone {
      position: absolute;
      width: 95px;
      height: 95px;
      left: 649px;
      top: 355px;
      overflow: visible;
    }
  </style>
  
  </head>
  <body>
  <div class="certificatedesign">
    <img class="certificate-design" src=${certificatedesign2dataURI}>
      
    <div class="CERTIFICATEOFCOMPLETION">
      <span>CERTIFICATE OF </span><span style="color:rgba(191,158,51,1);">COMPLETION</span>
    </div>
    <img class="logo" src=${logoimagedataURI}>
      
    <div class="IDDATE">
      <span>${data.today}</span>
    </div>
    <div class="forcompletingthetwoDaysCo">
      <span>for completing the two Days </span><span style="font-style:normal;font-weight:bold;">Coding, Robotics & AI Workshop</span><span> <br/>held on ${
        data.from
      } and ${data.to} ${data.month} ${data.year}. During the workshop, ${
    data.userInfo.first ? data.userInfo.first : ""
  } <br/>learned about Arduino, Arduino Programming, Electrical Concepts & AI.</span>
    </div>
    <div class="Thiscertificateisawardedto">
      <span>This certificate is awarded to</span>
    </div>
    <div class="AravSrivastava">
      <span>${data.userInfo.first ? data.userInfo.first : ""} ${
    data.userInfo.last ? data.userInfo.last : ""
  }</span>
    </div>
    <div class="ANSHULAGRAWAL">
      <span>ANSHUL AGRAWAL</span><br>
    </div>
    <div class="IDCERT">
      <span>ID #123</span><br>
    </div>
    <div class="Founder">
      <span>Founder</span>
    </div>
    <div class="IdRLCT">
      <span>Id #: ${data.certID}</span>
    </div>
    <div class="Co-Founder">
      <span>Co-Founder</span>
    </div>
    <div class="AMANKUMAR">
      <span>AMAN KUMAR</span><br>
    </div>
    <svg class="Pathcls" viewBox="0 0 5 5">
      <path class="Path" d="M 0 0">
      </path>
    </svg>
    <div class="ScrollGrouptwo">
      <img class="Untitleddesignthirtyfive" src=${untitled35dataURI}>
        
    </div>
    <div class="ScrollGroupthree">
      <img class="Untitleddesignthirtysix" src=${untitled36dataURI}>
        
    </div>
    <img class="CertificateQRone" src=${certQRdataURI}>
      
  </div>
  </body>
  </html>`;

  const image = await nodeHtmlToImage({
    html: strHTML.toString(),
  });
  const base64Image = new Buffer.from(image).toString("base64");
  const dataURI = "data:image/jpeg;base64," + base64Image;

  // Convert base 64 to file object
  // const certFileConverted = dataURLtoFile(
  //   dataURI,
  //   "coursecertificate.png"
  // );

  // upload to s3

  res.send(dataURI);
});

module.exports = router;
