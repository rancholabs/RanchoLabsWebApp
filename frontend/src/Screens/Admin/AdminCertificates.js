import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import "./AdminCertificates.css";

function Certificates({ allCertificateData }) {
  const [certId, setCertId] = useState("");
  return (
    <div className="blog" style={{ backgroundColor: "transparent" }}>
      <div className="certificate__searchHeader">
        <label for="certId">Search by Certificate ID</label>
        <input
          type="text"
          id="certId"
          value={certId}
          onChange={(e) => setCertId(e.target.value)}
        ></input>
      </div>
      <div className="blog__table">
        <TableContainer component={Paper}>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Payment</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allCertificateData?.map((singleCert) => {
                let date = new Date(singleCert.date).toString().split("GMT")[0];
                if (certId !== "") {
                  if (
                    singleCert.id
                      .toString()
                      .toLowerCase()
                      .includes(certId.toString().toLowerCase())
                  ) {
                    return (
                      <TableRow key={singleCert._id}>
                        <TableCell component="th" scope="row">
                          {singleCert.id}
                        </TableCell>
                        <TableCell>
                          {(singleCert.name?.first
                            ? singleCert.name?.first
                            : "") +
                            " " +
                            (singleCert.name?.last
                              ? singleCert.name?.last
                              : "")}
                        </TableCell>
                        <TableCell>{date}</TableCell>
                        <TableCell>
                          {singleCert.payment?.paymentId ? "Paid" : "Unpaid"}
                        </TableCell>
                      </TableRow>
                    );
                  } else return null;
                } else {
                  return (
                    <TableRow key={singleCert._id}>
                      <TableCell component="th" scope="row">
                        {singleCert.id}
                      </TableCell>
                      <TableCell>
                        {(singleCert.name?.first
                          ? singleCert.name?.first
                          : "") +
                          " " +
                          (singleCert.name?.last ? singleCert.name?.last : "")}
                      </TableCell>
                      <TableCell>{date}</TableCell>
                      <TableCell>
                        {singleCert.payment?.paymentId ? "Paid" : "Unpaid"}
                      </TableCell>
                    </TableRow>
                  );
                }
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default Certificates;
