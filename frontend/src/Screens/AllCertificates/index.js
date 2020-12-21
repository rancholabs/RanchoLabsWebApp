import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import "./index.css";
import axios from "axios";

function Certificates() {
  const [certId, setCertId] = useState("");
  const [singleCert, setSingleCert] = useState({});
  const [certError, setCertError] = useState(false);

  const handleClick = () => {
    if (certId !== "") {
      axios
        .get(`/api/certificate/single/${certId}`)
        .then((res) => {
          setSingleCert(res.data[0]);
          setCertError(false);
        })
        .catch((err) => {
          setCertError(true);
          setSingleCert({});
        });
    } else {
      setSingleCert({});
    }
  };

  return (
    <div
      className="searchCertificate"
      style={{ backgroundColor: "transparent" }}
    >
      <div className="searchCertificate__searchHeader">
        <input
          type="text"
          id="certId"
          placeholder="Search by Certificate ID"
          value={certId}
          onChange={(e) => setCertId(e.target.value)}
        ></input>
        <button onClick={handleClick}>Search</button>
      </div>
      {certError && (
        <p className="searchCertificate__errorMessage">Invalid ID</p>
      )}
      {singleCert._id ? (
        <div className="searchCertificate__table">
          <TableContainer component={Paper}>
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow key={singleCert._id}>
                  <TableCell component="th" scope="row">
                    {singleCert.id}
                  </TableCell>
                  <TableCell>
                    {(singleCert.name?.first ? singleCert.name?.first : "") +
                      " " +
                      (singleCert.name?.last ? singleCert.name?.last : "")}
                  </TableCell>
                  <TableCell>
                    {new Date(singleCert.date).toString().split("GMT")[0]}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ) : null}
    </div>
  );
}

export default Certificates;
