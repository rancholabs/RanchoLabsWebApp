const express = require("express");
const router = express.Router();
const StudentProfile = require("../../../model/StudentProfile");
const User = require("../../../model/User");
const Student = require("../../../model/Student");
const mongoose = require("mongoose");
const { getFilePath } = require("../../../Utils/File");
const isAuthenticated = require("../../../controller/requestAuthenticator");
const isAuthorized = require("../../../controller/requestAuthorizer");
const studentProjectRouter = require("./StudentProject");
const studentInnovationRouter = require("./StudentInnovation");
const studentExtracurricularRouter = require("./StudentExtracurricular");
const studentSkillRouter = require("./StudentSkill");
const studentCourseRouter = require("./StudentCourse");
const studentCertificateRouter = require("./StudentCertificate");

router.use("/projects", studentProjectRouter);
router.use("/innovations", studentInnovationRouter);
router.use("/extracurriculars", studentExtracurricularRouter);
router.use("/skills", studentSkillRouter);
router.use("/courses", studentCourseRouter);
router.use("/certificates", studentCertificateRouter);

router.get(
  "/",
  isAuthenticated,
  isAuthorized(["student"]),
  async (req, res) => {
    StudentProfile.findOne({ userId: req.userId })
      .select({ __v: 0 })
      .exec()
      .then(async (profile) => {
        profile = profile.toObject();
        profile.user = await User.findOne({ _id: profile.userId })
          .select({
            _id: 0,
            name: 1,
            profilePic: 1,
            description: 1,
          })
          .then(async (user) => {
            if (user.profilePic)
              user.profilePic = await getFilePath(user.profilePic);
            return user;
          });
        profile.academic = await Student.findOne({ userId: profile.userId })
          .select({
            _id: 0,
            grade: 1,
            schoolDetails: 1,
          })
          .then((academic) => academic)
          .catch((err) => {});
        if (profile.projects) {
          profile.projects = await Promise.all(
            profile.projects.map(async (p) => {
              if (p.header && p.header.image) {
                p.header.image = await getFilePath(p.header.image);
              }
              return p;
            })
          );
        }
        if (profile.innovations) {
          profile.innovations = await Promise.all(
            profile.innovations.map(async (i) => {
              if (i.header && i.header.image) {
                i.header.image = await getFilePath(i.header.image);
              }
              return i;
            })
          );
        }
        if (profile.certificates) {
          profile.certificates = await Promise.all(
            profile.certificates.map(async (c) => {
              if (c.file) {
                c.file = await getFilePath(c.file);
              }
              return c;
            })
          );
        }
        res.status(200).send(profile);
      })
      .catch((err) => {
        console.log(err);
        res
          .status(500)
          .send({ message: "Error in retreiving student profile" });
      });
  }
);

router.get("/:profileId", async (req, res) => {
  const profileId = req.params.profileId;
  StudentProfile.findOne({ _id: profileId })
    .select({ __v: 0 })
    .exec()
    .then(async (profile) => {
      profile = profile.toObject();
      profile.user = await User.findOne({ _id: profile.userId })
        .select({
          _id: 0,
          name: 1,
          profilePic: 1,
          description: 1,
        })
        .then(async (user) => {
          if (user.profilePic)
            user.profilePic = await getFilePath(user.profilePic);
          return user;
        })
        .catch((err) => {});
      profile.academic = await Student.findOne({ userId: profile.userId })
        .select({
          _id: 0,
          grade: 1,
          schoolDetails: 1,
        })
        .then((academic) => academic)
        .catch((err) => {});
      delete profile.userId;
      if (profile.projects) {
        profile.projects = await Promise.all(
          profile.projects.map(async (p) => {
            if (p.header && p.header.image) {
              p.header.image = await getFilePath(p.header.image);
            }
            return p;
          })
        );
      }
      if (profile.innovations) {
        profile.innovations = await Promise.all(
          profile.innovations.map(async (i) => {
            if (i.header && i.header.image) {
              i.header.image = await getFilePath(i.header.image);
            }
            return i;
          })
        );
      }
      if (profile.certificates) {
        profile.certificates = await Promise.all(
          profile.certificates.map(async (c) => {
            if (c.file) {
              c.file = await getFilePath(c.file);
            }
            return c;
          })
        );
      }
      res.status(200).send(profile);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: "Error in retreiving student profile" });
    });
});

router.post(
  "/profile",
  isAuthenticated,
  isAuthorized(["student"]),
  async (req, res) => {
    const reqData = req.body;
    const updateUserData = async () => {
      const studentData = await User.findOne({ _id: req.userId });
      if (reqData.name) {
        studentData.name = reqData.name;
      }
      if (reqData.profilePic) {
        studentData.profilePic = mongoose.Types.ObjectId(reqData.profilePic);
      }
      await studentData
        .save()
        .then((studentData) => {
          res.status(201).send("Student about info updated successfully");
        })
        .catch((err) => {
          console.log(err);
          res.status(400).send("Error in updating student about info");
        });
    };
    try {
      if (reqData.aim) {
        let studentProfile = await StudentProfile.findOne({
          userId: req.userId,
        });
        if (studentProfile) {
          studentProfile.aim = reqData.aim;
          await studentProfile
            .save()
            .then((studentProfile) => {
              if (Object.keys(reqData).length === 1) {
                res.status(201).send("Student about info updated successfully");
              }
            })
            .catch((err) => {
              console.log(err);
              res.status(400).send("Error in updating student about info");
            });
        } else {
          studentProfile = new StudentProfile({
            userId: mongoose.Types.ObjectId(req.userId),
            aim: reqData.aim,
          });
          await studentProfile
            .save()
            .then((studentProfile) => {
              if (Object.keys(reqData).length === 1) {
                res.status(201).send("Student about info added successfully");
              }
            })
            .catch((err) => {
              console.log(err);
              res.status(400).send("Error in adding student about info");
            });
        }
      }

      if (reqData.name || reqData.profilePic) {
        updateUserData();
      }
    } catch (e) {
      console.log(e);
      res.status(400).send("Error in updating student certificates");
    }
  }
);

router.post(
  "/academic",
  isAuthenticated,
  isAuthorized(["student"]),
  async (req, res) => {
    const reqData = req.body;
    const updateUserData = async () => {
      const studentData = await User.findOne({ _id: req.userId });
      studentData.description = reqData.about;
      await studentData
        .save()
        .then((studentData) => {
          res.status(201).send("Student about info updated successfully");
        })
        .catch((err) => {
          console.log(err);
          res.status(400).send("Error in updating student about info");
        });
    };
    try {
      if (reqData.grade || reqData.school) {
        let school;
        if (reqData.school) {
          const schoolArr = reqData.school.split(/[-,]+/);
          if (schoolArr.length > 1) {
            school = {
              name: schoolArr.slice(0, -1).join(" "),
              location: schoolArr.slice(-1).join(""),
            };
          } else {
            school = { name: reqData.school };
          }
        }
        let studentProfile = await Student.findOne({ userId: req.userId });
        if (studentProfile) {
          if (reqData.grade) studentProfile.grade = reqData.grade;
          if (reqData.school) {
            if (school.location) {
              studentProfile.schoolDetails = school;
            } else {
              studentProfile.schoolDetails = {
                ...studentProfile.school,
                name: school.name,
              };
            }
          }
          await studentProfile
            .save()
            .then((studentProfile) => {})
            .catch((err) => {
              console.log(err);
              res.status(400).send("Error in updating student about info");
            });
        } else {
          studentProfile = new Student({
            userId: mongoose.Types.ObjectId(req.userId),
          });
          if (reqData.grade) studentProfile.grade = reqData.grade;
          if (reqData.school) {
            if (school.location) {
              studentProfile.school = school;
            } else {
              studentProfile.school = {
                ...studentProfile.school,
                name: school.name,
              };
            }
          }
          await studentProfile
            .save()
            .then((studentProfile) => {})
            .catch((err) => {
              console.log(err);
              res.status(400).send("Error in adding student about info");
            });
        }
      }

      if (reqData.about) {
        updateUserData();
      }
    } catch (e) {
      console.log(e);
      res.status(400).send("Error in updating student about info");
    }
  }
);

module.exports = router;
