import React, { useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import AdminBatch from "./AdminBatch";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

import "./AdminDashboard.css";

function AdminDashboardFreeClass({
  allStudentData,
  assignBatch,
  allAssignedBatchesData,
  allInstructors,
  filterDate,
  filterStudentName,
  filterBatch,
}) {
  const [filteredStudents, setfilteredStudents] = useState([]);
  React.useEffect(() => {
    let _filter = [];
    if (filterStudentName !== "" && filterDate === "") {
      allStudentData.forEach((stud) => {
        let fullname = stud.studentDetails?.name?.first
          ? stud.studentDetails?.name?.first
          : "" + " " + stud.studentDetails?.name?.last
          ? stud.studentDetails?.name?.last
          : "";
        if (fullname.toString().toLowerCase().includes(filterStudentName)) {
          _filter.push(stud);
        }
      });
    }
    if (filterDate !== "" && filterStudentName === "") {
      allStudentData.forEach((stud) => {
        if (
          new Date(filterDate).getDate() ===
            new Date(stud.studentDetails?.createdAt).getDate() &&
          new Date(filterDate).getMonth() ===
            new Date(stud.studentDetails?.createdAt).getMonth() &&
          new Date(filterDate).getFullYear() ===
            new Date(stud.studentDetails?.createdAt).getFullYear()
        ) {
          _filter.push(stud);
        }
      });
    }
    if (filterDate !== "" && filterStudentName !== "") {
      allStudentData.forEach((stud) => {
        let fullname = stud.studentDetails?.name?.first
          ? stud.studentDetails?.name?.first
          : "" + " " + stud.studentDetails?.name?.last
          ? stud.studentDetails?.name?.last
          : "";
        if (
          new Date(filterDate).getDate() ===
            new Date(stud.studentDetails?.createdAt).getDate() &&
          new Date(filterDate).getMonth() ===
            new Date(stud.studentDetails?.createdAt).getMonth() &&
          new Date(filterDate).getFullYear() ===
            new Date(stud.studentDetails?.createdAt).getFullYear() &&
          fullname.toString().toLowerCase().includes(filterStudentName)
        ) {
          _filter.push(stud);
        }
      });
    }
    if (filterDate === "" && filterStudentName === "") {
      _filter = [...allStudentData];
    }
    setfilteredStudents(_filter);
  }, [filterStudentName, filterDate, allStudentData]);
  return (
    <>
      <TableHead>
        <TableRow>
          <TableCell>Timestamp</TableCell>
          <TableCell>Student ID</TableCell>
          <TableCell>Student Name</TableCell>
          <TableCell>Class</TableCell>
          <TableCell>Email ID</TableCell>
          <TableCell>Parents Name</TableCell>
          <TableCell>Parents Email ID</TableCell>
          <TableCell>Parents Phone Number</TableCell>
          <TableCell>Assign Batch</TableCell>
          <TableCell>Date and Time</TableCell>
          <TableCell>Instructor</TableCell>
          <TableCell>Class Status</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {filteredStudents?.map((stud) => {
          let singleStudentbatchObj = allAssignedBatchesData.filter(
            (obj) => obj.userId === stud.userId
          );
          let singleInstructor;
          if (singleStudentbatchObj.length > 0) {
            singleStudentbatchObj = singleStudentbatchObj.filter(
              (singleB) => singleB?.batchData?.batchType === "freeclass"
            )[0]
              ? singleStudentbatchObj.filter(
                  (singleB) => singleB?.batchData?.batchType === "freeclass"
                )[0]
              : {};
            singleInstructor = allInstructors.filter(
              (sintruct) =>
                sintruct._id === singleStudentbatchObj?.batchData?.instructor
            );
            if (singleInstructor.length > 0)
              singleInstructor = singleInstructor[0];
          }
          if (
            stud.studentDetails?.role === "student" &&
            stud.loginfor === "freeclass"
          ) {
            if (filterBatch !== "") {
              if (
                singleStudentbatchObj?.batchData?.name
                  .toString()
                  .toLowerCase()
                  .includes(filterBatch.toString())
              ) {
                var utcTime = new Date(stud.studentDetails?.createdAt);
                var hour =
                  utcTime.getHours() == 0
                    ? 12
                    : utcTime.getHours() > 12
                    ? utcTime.getHours() - 12
                    : utcTime.getHours();
                var min =
                  utcTime.getMinutes() < 10
                    ? "0" + utcTime.getMinutes()
                    : utcTime.getMinutes();
                var ampm = utcTime.getHours() < 12 ? "AM" : "PM";
                var time = hour + ":" + min + " " + ampm;

                var today = new Date();
                var status = "";
                var startingDate = new Date(
                  singleStudentbatchObj?.batchData?.singleDate
                ).setHours(
                  singleStudentbatchObj?.batchData?.singleTime
                    .toString()
                    .split(":")[0],
                  singleStudentbatchObj?.batchData?.singleTime
                    .toString()
                    .split(":")[1],
                  0,
                  0
                );
                var endingDate = new Date(
                  singleStudentbatchObj?.batchData?.singleDate
                ).setHours(
                  singleStudentbatchObj?.batchData?.singleTime
                    .toString()
                    .split(":")[0],
                  singleStudentbatchObj?.batchData?.singleTime
                    .toString()
                    .split(":")[1],
                  0,
                  0
                );
                if (startingDate && endingDate) {
                  if (new Date(startingDate) > today) {
                    status = "upcoming";
                  } else if (new Date(endingDate) < today) {
                    status = "completed";
                  } else if (
                    new Date(startingDate) < today &&
                    new Date(endingDate) > today
                  ) {
                    status = "active";
                  } else {
                    status = "completed";
                  }
                } else {
                  status = "N/A";
                }

                return (
                  <TableRow>
                    <TableCell>{time}</TableCell>
                    <TableCell>Student ID</TableCell>
                    <TableCell>
                      {" "}
                      {(stud.studentDetails?.name?.first
                        ? stud.studentDetails?.name?.first
                        : "") +
                        " " +
                        (stud.studentDetails?.name?.last
                          ? stud.studentDetails?.name?.last
                          : "")}
                    </TableCell>
                    <TableCell>{stud.grade}</TableCell>
                    <TableCell>{stud.studentDetails?.email}</TableCell>
                    <TableCell>
                      {(stud.parentDetails?.name?.first
                        ? stud.parentDetails?.name?.first
                        : "") +
                        " " +
                        (stud.parentDetails?.name?.last
                          ? stud.parentDetails?.name?.last
                          : "")}
                    </TableCell>
                    <TableCell>{stud.parentDetails?.email}</TableCell>
                    <TableCell>
                      {stud.parentDetails?.mobileNo?.code +
                        "-" +
                        stud.parentDetails?.mobileNo?.number}
                    </TableCell>
                    <TableCell>
                      {singleStudentbatchObj._id ? (
                        singleStudentbatchObj.batchData?.name
                      ) : (
                        <button onClick={() => assignBatch(stud.userId)}>
                          Assign
                        </button>
                      )}
                    </TableCell>
                    <TableCell>
                      {singleStudentbatchObj?.batchData?.singleDate
                        ? (new Date(
                            singleStudentbatchObj.batchData.singleDate
                          ).getDate() < 10
                            ? "0" +
                              new Date(
                                singleStudentbatchObj.batchData.singleDate
                              ).getDate()
                            : new Date(
                                singleStudentbatchObj.batchData.singleDate
                              ).getDate()) +
                          "/" +
                          (new Date(
                            singleStudentbatchObj.batchData.singleDate
                          ).getMonth() +
                            1 <
                          10
                            ? "0" +
                              (new Date(
                                singleStudentbatchObj.batchData.singleDate
                              ).getMonth() +
                                1)
                            : new Date(
                                singleStudentbatchObj.batchData.singleDate
                              ).getMonth() + 1) +
                          "/" +
                          new Date(
                            singleStudentbatchObj.batchData.singleDate
                          ).getFullYear() +
                          " - " +
                          singleStudentbatchObj?.batchData?.singleTime
                        : "n/a"}
                    </TableCell>
                    <TableCell>
                      {singleInstructor?._id
                        ? (singleInstructor?.fname
                            ? singleInstructor?.fname
                            : "") +
                          " " +
                          (singleInstructor?.mname
                            ? singleInstructor?.mname
                            : "") +
                          " " +
                          (singleInstructor?.lname
                            ? singleInstructor?.lname
                            : "")
                        : "n/a"}
                    </TableCell>
                    <TableCell>{status}</TableCell>
                  </TableRow>
                );
              }
            } else {
              var utcTime = new Date(stud.studentDetails?.createdAt);
              var hour =
                utcTime.getHours() == 0
                  ? 12
                  : utcTime.getHours() > 12
                  ? utcTime.getHours() - 12
                  : utcTime.getHours();
              var min =
                utcTime.getMinutes() < 10
                  ? "0" + utcTime.getMinutes()
                  : utcTime.getMinutes();
              var ampm = utcTime.getHours() < 12 ? "AM" : "PM";
              var time = hour + ":" + min + " " + ampm;

              var today = new Date();
              var status = "";
              var startingDate = new Date(
                singleStudentbatchObj?.batchData?.singleDate
              ).setHours(
                singleStudentbatchObj?.batchData?.singleTime
                  .toString()
                  .split(":")[0],
                singleStudentbatchObj?.batchData?.singleTime
                  .toString()
                  .split(":")[1],
                0,
                0
              );
              var endingDate = new Date(
                singleStudentbatchObj?.batchData?.singleDate
              ).setHours(
                singleStudentbatchObj?.batchData?.singleTime
                  .toString()
                  .split(":")[0],
                singleStudentbatchObj?.batchData?.singleTime
                  .toString()
                  .split(":")[1],
                0,
                0
              );
              if (startingDate && endingDate) {
                if (new Date(startingDate) > today) {
                  status = "upcoming";
                } else if (new Date(endingDate) < today) {
                  status = "completed";
                } else if (
                  new Date(startingDate) < today &&
                  new Date(endingDate) > today
                ) {
                  status = "active";
                } else {
                  status = "completed";
                }
              } else {
                status = "N/A";
              }

              return (
                <TableRow>
                  <TableCell>{time}</TableCell>
                  <TableCell>Student ID</TableCell>
                  <TableCell>
                    {" "}
                    {(stud.studentDetails?.name?.first
                      ? stud.studentDetails?.name?.first
                      : "") +
                      " " +
                      (stud.studentDetails?.name?.last
                        ? stud.studentDetails?.name?.last
                        : "")}
                  </TableCell>
                  <TableCell>{stud.grade}</TableCell>
                  <TableCell>{stud.studentDetails?.email}</TableCell>
                  <TableCell>
                    {(stud.parentDetails?.name?.first
                      ? stud.parentDetails?.name?.first
                      : "") +
                      " " +
                      (stud.parentDetails?.name?.last
                        ? stud.parentDetails?.name?.last
                        : "")}
                  </TableCell>
                  <TableCell>{stud.parentDetails?.email}</TableCell>
                  <TableCell>
                    {stud.parentDetails?.mobileNo?.code +
                      "-" +
                      stud.parentDetails?.mobileNo?.number}
                  </TableCell>
                  <TableCell>
                    {singleStudentbatchObj._id ? (
                      singleStudentbatchObj.batchData?.name
                    ) : (
                      <button onClick={() => assignBatch(stud.userId)}>
                        Assign
                      </button>
                    )}
                  </TableCell>
                  <TableCell>
                    {singleStudentbatchObj?.batchData?.singleDate
                      ? (new Date(
                          singleStudentbatchObj.batchData.singleDate
                        ).getDate() < 10
                          ? "0" +
                            new Date(
                              singleStudentbatchObj.batchData.singleDate
                            ).getDate()
                          : new Date(
                              singleStudentbatchObj.batchData.singleDate
                            ).getDate()) +
                        "/" +
                        (new Date(
                          singleStudentbatchObj.batchData.singleDate
                        ).getMonth() +
                          1 <
                        10
                          ? "0" +
                            (new Date(
                              singleStudentbatchObj.batchData.singleDate
                            ).getMonth() +
                              1)
                          : new Date(
                              singleStudentbatchObj.batchData.singleDate
                            ).getMonth() + 1) +
                        "/" +
                        new Date(
                          singleStudentbatchObj.batchData.singleDate
                        ).getFullYear() +
                        " - " +
                        singleStudentbatchObj?.batchData?.singleTime
                      : "n/a"}
                  </TableCell>
                  <TableCell>
                    {singleInstructor?._id
                      ? (singleInstructor?.fname
                          ? singleInstructor?.fname
                          : "") +
                        " " +
                        (singleInstructor?.mname
                          ? singleInstructor?.mname
                          : "") +
                        " " +
                        (singleInstructor?.lname ? singleInstructor?.lname : "")
                      : "n/a"}
                  </TableCell>
                  <TableCell>{status}</TableCell>
                </TableRow>
              );
            }
          }
        })}
      </TableBody>
    </>
  );
}

function AdminDashboardFreeWorkshop({
  allStudentData,
  assignBatch,
  allAssignedBatchesData,
  allInstructors,
  filterDate,
  filterStudentName,
  filterBatch,
}) {
  const [filteredStudents, setfilteredStudents] = useState([]);
  React.useEffect(() => {
    let _filter = [];
    if (filterStudentName !== "" && filterDate === "") {
      allStudentData.forEach((stud) => {
        let fullname = stud.studentDetails?.name?.first
          ? stud.studentDetails?.name?.first
          : "" + " " + stud.studentDetails?.name?.last
          ? stud.studentDetails?.name?.last
          : "";
        if (fullname.toString().toLowerCase().includes(filterStudentName)) {
          _filter.push(stud);
        }
      });
    }
    if (filterDate !== "" && filterStudentName === "") {
      allStudentData.forEach((stud) => {
        if (
          new Date(filterDate).getDate() ===
            new Date(stud.studentDetails?.createdAt).getDate() &&
          new Date(filterDate).getMonth() ===
            new Date(stud.studentDetails?.createdAt).getMonth() &&
          new Date(filterDate).getFullYear() ===
            new Date(stud.studentDetails?.createdAt).getFullYear()
        ) {
          _filter.push(stud);
        }
      });
    }
    if (filterDate !== "" && filterStudentName !== "") {
      allStudentData.forEach((stud) => {
        let fullname = stud.studentDetails?.name?.first
          ? stud.studentDetails?.name?.first
          : "" + " " + stud.studentDetails?.name?.last
          ? stud.studentDetails?.name?.last
          : "";
        if (
          new Date(filterDate).getDate() ===
            new Date(stud.studentDetails?.createdAt).getDate() &&
          new Date(filterDate).getMonth() ===
            new Date(stud.studentDetails?.createdAt).getMonth() &&
          new Date(filterDate).getFullYear() ===
            new Date(stud.studentDetails?.createdAt).getFullYear() &&
          fullname.toString().toLowerCase().includes(filterStudentName)
        ) {
          _filter.push(stud);
        }
      });
    }
    if (filterDate === "" && filterStudentName === "") {
      _filter = [...allStudentData];
    }
    setfilteredStudents(_filter);
  }, [filterStudentName, filterDate, allStudentData]);
  return (
    <>
      <TableHead>
        <TableRow>
          <TableCell>Timestamp</TableCell>
          <TableCell>Student ID</TableCell>
          <TableCell>Student Name</TableCell>
          <TableCell>Class</TableCell>
          <TableCell>Email ID</TableCell>
          <TableCell>Parents Name</TableCell>
          <TableCell>Parents Email ID</TableCell>
          <TableCell>Parents Phone Number</TableCell>
          <TableCell>Assigned Batch</TableCell>
          <TableCell>Instructor</TableCell>
          {/* <TableCell>Class Status</TableCell> */}
        </TableRow>
      </TableHead>
      <TableBody>
        {filteredStudents?.map((stud) => {
          let singleStudentbatchObj = allAssignedBatchesData.filter(
            (obj) => obj.userId === stud.userId
          );
          let singleInstructor;
          if (singleStudentbatchObj.length > 0) {
            singleStudentbatchObj = singleStudentbatchObj.filter(
              (singleB) => singleB?.batchData?.batchType === "workshop"
            )[0]
              ? singleStudentbatchObj.filter(
                  (singleB) => singleB?.batchData?.batchType === "workshop"
                )[0]
              : {};
            singleInstructor = allInstructors.filter(
              (sintruct) =>
                sintruct._id === singleStudentbatchObj?.batchData?.instructor
            );
            if (singleInstructor.length > 0)
              singleInstructor = singleInstructor[0];
          }
          if (
            stud.studentDetails?.role === "student" &&
            stud.loginfor === "workshop"
          ) {
            if (filterBatch !== "") {
              if (
                singleStudentbatchObj?.batchData?.name
                  .toString()
                  .toLowerCase()
                  .includes(filterBatch.toString())
              ) {
                var utcTime = new Date(stud.studentDetails?.createdAt);
                var hour =
                  utcTime.getHours() == 0
                    ? 12
                    : utcTime.getHours() > 12
                    ? utcTime.getHours() - 12
                    : utcTime.getHours();
                var min =
                  utcTime.getMinutes() < 10
                    ? "0" + utcTime.getMinutes()
                    : utcTime.getMinutes();
                var ampm = utcTime.getHours() < 12 ? "AM" : "PM";
                var time = hour + ":" + min + " " + ampm;

                var today = new Date();
                var status = "";
                var startingDate = new Date(
                  singleStudentbatchObj?.batchData?.singleDate
                ).setHours(
                  singleStudentbatchObj?.batchData?.singleTime
                    .toString()
                    .split(":")[0],
                  singleStudentbatchObj?.batchData?.singleTime
                    .toString()
                    .split(":")[1],
                  0,
                  0
                );
                var endingDate = new Date(
                  singleStudentbatchObj?.batchData?.singleDate
                ).setHours(
                  singleStudentbatchObj?.batchData?.singleTime
                    .toString()
                    .split(":")[0],
                  singleStudentbatchObj?.batchData?.singleTime
                    .toString()
                    .split(":")[1],
                  0,
                  0
                );
                if (startingDate && endingDate) {
                  if (new Date(startingDate) > today) {
                    status = "upcoming";
                  } else if (new Date(endingDate) < today) {
                    status = "completed";
                  } else if (
                    new Date(startingDate) < today &&
                    new Date(endingDate) > today
                  ) {
                    status = "active";
                  } else {
                    status = "completed";
                  }
                } else {
                  status = "N/A";
                }

                return (
                  <TableRow>
                    <TableCell>{time}</TableCell>
                    <TableCell>Student ID</TableCell>
                    <TableCell>
                      {" "}
                      {(stud.studentDetails?.name?.first
                        ? stud.studentDetails?.name?.first
                        : "") +
                        " " +
                        (stud.studentDetails?.name?.last
                          ? stud.studentDetails?.name?.last
                          : "")}
                    </TableCell>
                    <TableCell>{stud.grade}</TableCell>
                    <TableCell>{stud.studentDetails?.email}</TableCell>
                    <TableCell>
                      {(stud.parentDetails?.name?.first
                        ? stud.parentDetails?.name?.first
                        : "") +
                        " " +
                        (stud.parentDetails?.name?.last
                          ? stud.parentDetails?.name?.last
                          : "")}
                    </TableCell>
                    <TableCell>{stud.parentDetails?.email}</TableCell>
                    <TableCell>
                      {stud.parentDetails?.mobileNo?.code +
                        "-" +
                        stud.parentDetails?.mobileNo?.number}
                    </TableCell>
                    <TableCell>
                      {singleStudentbatchObj._id ? (
                        singleStudentbatchObj.batchData?.name
                      ) : (
                        <>N/A</>
                      )}
                    </TableCell>

                    <TableCell>
                      {singleInstructor?._id
                        ? (singleInstructor?.fname
                            ? singleInstructor?.fname
                            : "") +
                          " " +
                          (singleInstructor?.mname
                            ? singleInstructor?.mname
                            : "") +
                          " " +
                          (singleInstructor?.lname
                            ? singleInstructor?.lname
                            : "")
                        : "n/a"}
                    </TableCell>
                    {/* <TableCell>{status}</TableCell> */}
                  </TableRow>
                );
              }
            } else {
              var utcTime = new Date(stud.studentDetails?.createdAt);
              var hour =
                utcTime.getHours() == 0
                  ? 12
                  : utcTime.getHours() > 12
                  ? utcTime.getHours() - 12
                  : utcTime.getHours();
              var min =
                utcTime.getMinutes() < 10
                  ? "0" + utcTime.getMinutes()
                  : utcTime.getMinutes();
              var ampm = utcTime.getHours() < 12 ? "AM" : "PM";
              var time = hour + ":" + min + " " + ampm;

              var today = new Date();
              var status = "";
              var startingDate = new Date(
                singleStudentbatchObj?.batchData?.singleDate
              ).setHours(
                singleStudentbatchObj?.batchData?.singleTime
                  .toString()
                  .split(":")[0],
                singleStudentbatchObj?.batchData?.singleTime
                  .toString()
                  .split(":")[1],
                0,
                0
              );
              var endingDate = new Date(
                singleStudentbatchObj?.batchData?.singleDate
              ).setHours(
                singleStudentbatchObj?.batchData?.singleTime
                  .toString()
                  .split(":")[0],
                singleStudentbatchObj?.batchData?.singleTime
                  .toString()
                  .split(":")[1],
                0,
                0
              );
              if (startingDate && endingDate) {
                if (new Date(startingDate) > today) {
                  status = "upcoming";
                } else if (new Date(endingDate) < today) {
                  status = "completed";
                } else if (
                  new Date(startingDate) < today &&
                  new Date(endingDate) > today
                ) {
                  status = "active";
                } else {
                  status = "completed";
                }
              } else {
                status = "N/A";
              }

              return (
                <TableRow>
                  <TableCell>{time}</TableCell>
                  <TableCell>Student ID</TableCell>
                  <TableCell>
                    {" "}
                    {(stud.studentDetails?.name?.first
                      ? stud.studentDetails?.name?.first
                      : "") +
                      " " +
                      (stud.studentDetails?.name?.last
                        ? stud.studentDetails?.name?.last
                        : "")}
                  </TableCell>
                  <TableCell>{stud.grade}</TableCell>
                  <TableCell>{stud.studentDetails?.email}</TableCell>
                  <TableCell>
                    {(stud.parentDetails?.name?.first
                      ? stud.parentDetails?.name?.first
                      : "") +
                      " " +
                      (stud.parentDetails?.name?.last
                        ? stud.parentDetails?.name?.last
                        : "")}
                  </TableCell>
                  <TableCell>{stud.parentDetails?.email}</TableCell>
                  <TableCell>
                    {stud.parentDetails?.mobileNo?.code +
                      "-" +
                      stud.parentDetails?.mobileNo?.number}
                  </TableCell>
                  <TableCell>
                    {singleStudentbatchObj._id ? (
                      singleStudentbatchObj.batchData?.name
                    ) : (
                      <>N/A</>
                    )}
                  </TableCell>
                  <TableCell>
                    {singleInstructor?._id
                      ? (singleInstructor?.fname
                          ? singleInstructor?.fname
                          : "") +
                        " " +
                        (singleInstructor?.mname
                          ? singleInstructor?.mname
                          : "") +
                        " " +
                        (singleInstructor?.lname ? singleInstructor?.lname : "")
                      : "n/a"}
                  </TableCell>
                  {/* <TableCell>{status}</TableCell> */}
                </TableRow>
              );
            }
          }
        })}
      </TableBody>
    </>
  );
}

function AdminDashboardPayment({
  allStudentData,
  allAssignedBatchesData,
  allPayments,
  allInstructors,
  allCouponsData,
  assignBatch,
}) {
  return (
    <>
      <TableHead>
        <TableRow>
          <TableCell>Timestamp</TableCell>
          <TableCell>Transaction ID</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Student ID</TableCell>
          <TableCell>Class</TableCell>
          <TableCell>Email ID</TableCell>
          <TableCell>Parents Name</TableCell>
          <TableCell>Parents Email ID</TableCell>
          <TableCell>Parents Phone Number</TableCell>
          <TableCell>Email ID for transaction</TableCell>
          <TableCell>Payment Phone Number</TableCell>
          <TableCell>Course</TableCell>
          <TableCell>Starting Date</TableCell>
          <TableCell>Amount</TableCell>
          <TableCell>Coupon</TableCell>
          <TableCell>Batch</TableCell>
          <TableCell>Instructor</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {allPayments?.map((payment) => {
          // if (stud.studentDetails?.role === "student") {
          // var utcTime = new Date(stud.studentDetails?.createdAt);
          // var hour =
          //   utcTime.getHours() == 0
          //     ? 12
          //     : utcTime.getHours() > 12
          //     ? utcTime.getHours() - 12
          //     : utcTime.getHours();
          // var min =
          //   utcTime.getMinutes() < 10
          //     ? "0" + utcTime.getMinutes()
          //     : utcTime.getMinutes();
          // var ampm = utcTime.getHours() < 12 ? "AM" : "PM";
          // var time = hour + ":" + min + " " + ampm;

          var singleStudentOBJ = allStudentData.filter(
            (stud) => stud.userId === payment.userId
          );
          if (singleStudentOBJ.length > 0) {
            singleStudentOBJ = singleStudentOBJ[0];

            var singleStudentbatchObj = allAssignedBatchesData.filter(
              (studBatch) =>
                studBatch.userId === singleStudentOBJ.userId &&
                studBatch.payment?.orderId ===
                  payment.payload.payment.entity.order_id
            );

            if (singleStudentbatchObj.length > 0) {
              singleStudentbatchObj = singleStudentbatchObj[0];
              // var singleStudentPaymentObj = allPayments.filter(
              //   (studPay) =>
              //     studPay.payload.payment.entity.order_id ===
              //     singleStudentbatchObj.payment.orderId
              // );
              // if (singleStudentPaymentObj.length > 0) {
              //   singleStudentPaymentObj = singleStudentPaymentObj[0];
              // }
              var singleInstructor = allInstructors.filter(
                (sintruct) =>
                  sintruct._id === singleStudentbatchObj?.batchData?.instructor
              );
              if (singleInstructor.length > 0)
                singleInstructor = singleInstructor[0];

              var singleCoupon = allCouponsData.filter(
                (sCoup) => sCoup._id === payment?.couponId
              );
              if (singleCoupon.length > 0) singleCoupon = singleCoupon[0];

              let timestamp = payment._id?.toString().substring(0, 8);
              let payDate = new Date(parseInt(timestamp, 16) * 1000);

              // payDate = (payDate.getDate()<10?'0'+payDate.getDate():payDate.getDate()) + "/" + (payDate.getMonth()+1<10?'0'+payDate.getMonth()+1:payDate.getMonth()+1) + "/" + payDate.getFullYear()

              let userSelectedDate = payment?.selectedDate
                ? (new Date(payment?.selectedDate).getDate() < 10
                    ? "0" + new Date(payment?.selectedDate).getDate()
                    : new Date(payment?.selectedDate).getDate()) +
                  "/" +
                  (new Date(payment?.selectedDate).getMonth() + 1 < 10
                    ? "0" + (new Date(payment?.selectedDate).getMonth() + 1)
                    : new Date(payment?.selectedDate).getMonth() + 1) +
                  "/" +
                  new Date(payment?.selectedDate).getFullYear()
                : "n/a";

              return (
                <TableRow>
                  <TableCell>{payDate.toString().split("GMT")[0]}</TableCell>
                  <TableCell>
                    {singleStudentbatchObj?.payment?.orderId}
                  </TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Student ID</TableCell>
                  <TableCell>{singleStudentOBJ.grade}</TableCell>
                  <TableCell>
                    {singleStudentOBJ.studentDetails?.email}
                  </TableCell>
                  <TableCell>
                    {(singleStudentOBJ.parentDetails?.name?.first
                      ? singleStudentOBJ.parentDetails?.name?.first
                      : "") +
                      " " +
                      (singleStudentOBJ.parentDetails?.name?.last
                        ? singleStudentOBJ.parentDetails?.name?.last
                        : "")}
                  </TableCell>
                  <TableCell>{singleStudentOBJ.parentDetails?.email}</TableCell>
                  <TableCell>
                    {singleStudentOBJ.parentDetails?.mobileNo?.code +
                      "-" +
                      singleStudentOBJ.parentDetails?.mobileNo?.number}
                  </TableCell>
                  <TableCell>
                    {payment?.payload?.payment?.entity?.email}
                  </TableCell>
                  <TableCell>
                    {payment?.payload?.payment?.entity?.contact}
                  </TableCell>
                  <TableCell>
                    {singleStudentbatchObj?.courseData?.name}
                  </TableCell>
                  <TableCell>{userSelectedDate}</TableCell>
                  <TableCell>
                    {payment?.payload?.payment?.entity?.amount / 100}
                  </TableCell>
                  <TableCell>{singleCoupon?.code}</TableCell>
                  <TableCell>
                    {singleStudentbatchObj.batchData ? (
                      singleStudentbatchObj.batchData?.name
                    ) : (
                      <button
                        onClick={() =>
                          assignBatch(
                            singleStudentOBJ.userId,
                            singleStudentbatchObj?.payment
                          )
                        }
                      >
                        Assign
                      </button>
                    )}
                  </TableCell>
                  <TableCell>
                    {singleInstructor?._id
                      ? (singleInstructor?.fname
                          ? singleInstructor?.fname
                          : "") +
                        " " +
                        (singleInstructor?.mname
                          ? singleInstructor?.mname
                          : "") +
                        " " +
                        (singleInstructor?.lname ? singleInstructor?.lname : "")
                      : "n/a"}
                  </TableCell>
                </TableRow>
              );
            }
            // }
          }
        })}
      </TableBody>
    </>
  );
}

function AdminDashboardTotalSignUp({ allStudentData }) {
  return (
    <>
      <TableHead>
        <TableRow>
          <TableCell>Timestamp</TableCell>
          <TableCell>Student ID</TableCell>
          <TableCell>Student Name</TableCell>
          <TableCell>Class</TableCell>
          <TableCell>Email ID</TableCell>
          <TableCell>Parents Name</TableCell>
          <TableCell>Parents Email ID</TableCell>
          <TableCell>Parents Phone Number</TableCell>
          <TableCell>Reason</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {allStudentData?.map((stud) => {
          if (stud.studentDetails?.role === "student") {
            var utcTime = new Date(stud.studentDetails?.createdAt);
            var hour =
              utcTime.getHours() == 0
                ? 12
                : utcTime.getHours() > 12
                ? utcTime.getHours() - 12
                : utcTime.getHours();
            var min =
              utcTime.getMinutes() < 10
                ? "0" + utcTime.getMinutes()
                : utcTime.getMinutes();
            var ampm = utcTime.getHours() < 12 ? "AM" : "PM";
            var time = hour + ":" + min + " " + ampm;
            return (
              <TableRow>
                <TableCell>{time}</TableCell>
                <TableCell>Student ID</TableCell>
                <TableCell>
                  {" "}
                  {(stud.studentDetails?.name?.first
                    ? stud.studentDetails?.name?.first
                    : "") +
                    " " +
                    (stud.studentDetails?.name?.last
                      ? stud.studentDetails?.name?.last
                      : "")}
                </TableCell>
                <TableCell>{stud.grade}</TableCell>
                <TableCell>{stud.studentDetails?.email}</TableCell>
                <TableCell>
                  {(stud.parentDetails?.name?.first
                    ? stud.parentDetails?.name?.first
                    : "") +
                    " " +
                    (stud.parentDetails?.name?.last
                      ? stud.parentDetails?.name?.last
                      : "")}
                </TableCell>
                <TableCell>{stud.parentDetails?.email}</TableCell>
                <TableCell>
                  {stud.parentDetails?.mobileNo?.code +
                    "-" +
                    stud.parentDetails?.mobileNo?.number}
                </TableCell>
                <TableCell>{stud.loginfor}</TableCell>
              </TableRow>
            );
          }
        })}
      </TableBody>
    </>
  );
}

function AdminDashboard({
  allStudentData,
  courseGroups,
  allAssignedBatchesData,
  allInstructors,
  allPayments,
  allCouponsData,
}) {
  const [currentSection, setCurrentSection] = useState("freeclass");
  const [setbatchWindow, setsetbatchWindow] = useState(false);
  const [setBatchUserId, setsetBatchUserId] = useState("");
  const [paymentObj, setpaymentObj] = useState({});

  const [filterDate, setfilterDate] = useState("");
  const [filterStudentName, setfilterStudentName] = useState("");
  const [filterBatch, setfilterBatch] = useState("");

  const assignBatch = (userId, paymentObj) => {
    setsetbatchWindow(true);
    setsetBatchUserId(userId);
    if (paymentObj) {
      setpaymentObj(paymentObj);
    }
  };
  const backtoDashboard = () => {
    setsetbatchWindow(false);
    setsetBatchUserId("");
  };
  return (
    <>
      {setbatchWindow ? (
        <AdminBatch
          setBatchUserId={setBatchUserId}
          paymentObj={paymentObj}
          allStudentData={allStudentData}
          courseGroups={courseGroups}
          backtoDashboard={backtoDashboard}
          allInstructors={allInstructors}
        />
      ) : (
        <div className="adminDashboard">
          <div className="adminDashboard__cards">
            <div
              className={
                currentSection === "freeclass"
                  ? "adminDashboard__singleCard active"
                  : "adminDashboard__singleCard"
              }
              onClick={() => setCurrentSection("freeclass")}
            >
              <label>Free Class</label>
            </div>
            <div
              className={
                currentSection === "freeworkshop"
                  ? "adminDashboard__singleCard active"
                  : "adminDashboard__singleCard"
              }
              onClick={() => setCurrentSection("freeworkshop")}
            >
              <label>Free Workshops</label>
            </div>
            <div
              className={
                currentSection === "payment"
                  ? "adminDashboard__singleCard active"
                  : "adminDashboard__singleCard"
              }
              onClick={() => setCurrentSection("payment")}
            >
              <label>Payments</label>
            </div>
            <div
              className={
                currentSection === "totalsignup"
                  ? "adminDashboard__singleCard active"
                  : "adminDashboard__singleCard"
              }
              onClick={() => setCurrentSection("totalsignup")}
            >
              <label>Total Sign up</label>
            </div>
          </div>
          <div className="adminDashboard__body">
            <div className="adminDashboard__body__header">
              <div className="adminDashboard__body__headerSection">
                <div></div>
                <label>Completed</label>
              </div>
              <div className="adminDashboard__body__headerSection">
                <div></div>
                <label>Absent/Not Completed</label>
              </div>
              <div className="adminDashboard__body__headerSection">
                <div></div>
                <label>Scheduled</label>
              </div>
              <div className="adminDashboard__body__headerSection">
                <div></div>
                <label>Not Scheduled</label>
              </div>
            </div>
            <div className="adminDashboard__body__filters">
              <input
                type="date"
                className="adminDashboard__body__input__colored"
                value={filterDate}
                onChange={(e) => setfilterDate(e.target.value)}
              />
              <input type="text" placeholder="Student ID" />
              <input
                type="text"
                placeholder="Student Name"
                value={filterStudentName}
                onChange={(e) => setfilterStudentName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Batch Name"
                value={filterBatch}
                onChange={(e) => setfilterBatch(e.target.value)}
              />
              {/* <button className="adminDashboard__body__input__colored">
                Download Sheet
              </button> */}
              <ReactHTMLTableToExcel
                className="adminDashboard__body__input__colored"
                table="adminDashboardUserDataTable"
                filename="user_data"
                sheet="Sheet"
                buttonText="Download Sheet"
              />
            </div>
            <div className="adminDashboard__body__tableContainer">
              <TableContainer component={Paper}>
                <Table
                  className="adminDashboard__body__table"
                  size="small"
                  id="adminDashboardUserDataTable"
                >
                  {currentSection === "freeclass" && (
                    <AdminDashboardFreeClass
                      allStudentData={allStudentData}
                      allAssignedBatchesData={allAssignedBatchesData}
                      allInstructors={allInstructors}
                      assignBatch={assignBatch}
                      filterDate={filterDate}
                      filterStudentName={filterStudentName}
                      filterBatch={filterBatch}
                    />
                  )}
                  {currentSection === "freeworkshop" && (
                    <AdminDashboardFreeWorkshop
                      allStudentData={allStudentData}
                      allAssignedBatchesData={allAssignedBatchesData}
                      allInstructors={allInstructors}
                      assignBatch={assignBatch}
                      filterDate={filterDate}
                      filterStudentName={filterStudentName}
                      filterBatch={filterBatch}
                    />
                  )}
                  {currentSection === "payment" && (
                    <AdminDashboardPayment
                      allStudentData={allStudentData}
                      allAssignedBatchesData={allAssignedBatchesData}
                      allPayments={allPayments}
                      allInstructors={allInstructors}
                      allCouponsData={allCouponsData}
                      assignBatch={assignBatch}
                    />
                  )}
                  {currentSection === "totalsignup" && (
                    <AdminDashboardTotalSignUp
                      allStudentData={allStudentData}
                      filterDate={filterDate}
                      filterStudentName={filterStudentName}
                    />
                  )}
                </Table>
              </TableContainer>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AdminDashboard;
