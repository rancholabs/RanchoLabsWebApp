import React, { useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import "./AdminDashboard.css";

function AdminMasterData({ allStudentData }) {
  return (
    <div className="adminDashboard">
      <div className="adminDashboard__body adminMasterData__body">
        <div className="adminDashboard__body__filters adminMasterData__body__filters">
          <input type="date" className="adminDashboard__body__input__colored" />
          <input type="text" placeholder="Student ID" />
          <input type="text" placeholder="Student Name" />
          <button className="adminDashboard__body__input__colored">
            Download Sheet
          </button>
        </div>
        <div className="adminDashboard__body__filters adminMasterData__body__filters">
          <input type="text" placeholder="Parents Name" />
          <input type="text" placeholder="School Name" />
          <input type="text" placeholder="City" />
        </div>
        <div className="adminDashboard__body__tableContainer">
          <TableContainer component={Paper}>
            <Table className="adminDashboard__body__table" size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Student ID</TableCell>
                  <TableCell>Student Name</TableCell>
                  <TableCell>Onboarding</TableCell>
                  <TableCell>Phone Number</TableCell>
                  <TableCell>Class</TableCell>
                  <TableCell>Email ID</TableCell>
                  <TableCell>Parents Name</TableCell>
                  <TableCell>Parents Email ID</TableCell>
                  <TableCell>Parents Phone Number</TableCell>
                  <TableCell>School</TableCell>
                  <TableCell>City and State</TableCell>
                  <TableCell>Free Class</TableCell>
                  <TableCell>Free Workshop</TableCell>
                  <TableCell>Payment 1</TableCell>
                  <TableCell>Payment 2</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allStudentData?.map((stud) => {
                  if (stud.studentDetails.role === "student") {
                    var utcTime = new Date(stud.studentDetails.createdAt);
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
                        <TableCell>Student ID</TableCell>
                        <TableCell>
                          {" "}
                          {(stud.studentDetails.name.first
                            ? stud.studentDetails.name.first
                            : "") +
                            " " +
                            (stud.studentDetails.name.last
                              ? stud.studentDetails.name.last
                              : "")}
                        </TableCell>
                        <TableCell>{time}</TableCell>
                        <TableCell>Phone Number</TableCell>
                        <TableCell>{stud.grade}</TableCell>
                        <TableCell>{stud.studentDetails.email}</TableCell>
                        <TableCell>
                          {(stud.parentDetails.name.first
                            ? stud.parentDetails.name.first
                            : "") +
                            " " +
                            (stud.parentDetails.name.last
                              ? stud.parentDetails.name.last
                              : "")}
                        </TableCell>
                        <TableCell>{stud.parentDetails.email}</TableCell>
                        <TableCell>
                          {stud.parentDetails.mobileNo.code +
                            "-" +
                            stud.parentDetails.mobileNo.number}
                        </TableCell>
                        <TableCell>School</TableCell>
                        <TableCell>City and State</TableCell>
                        <TableCell>Free Class</TableCell>
                        <TableCell>Free Workshop</TableCell>
                        <TableCell>Payment 1</TableCell>
                        <TableCell>Payment 2</TableCell>
                      </TableRow>
                    );
                  }
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}

export default AdminMasterData;
