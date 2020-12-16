import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";

function Coupon({ allCouponsData }) {
  const [allCoupons, setallCoupons] = useState(allCouponsData);
  const [updateCoupon, setupdateCoupon] = useState(false);
  const [tobeEditedCoupon, settobeEditedCoupon] = useState({});
  const [showEditForm, setshowEditForm] = useState(false);

  const [code, setcode] = useState("");
  const [amount, setamount] = useState(0);
  const [minAmount, setminAmount] = useState(0);
  const [frequency, setfrequency] = useState(0);
  const [active, setactive] = useState(false);

  console.log(allCouponsData);

  useEffect(() => {
    setallCoupons(allCouponsData);
  }, [allCouponsData]);

  const editCoupon = (coupon) => {
    settobeEditedCoupon(coupon);
    setupdateCoupon(true);
    setshowEditForm(true);
    setcode(coupon.code);
    setamount(coupon.amount);
    setminAmount(coupon.minAmount);
    setfrequency(coupon.frequency);
    setactive(coupon.active);
  };

  const addNewCoupon = () => {
    settobeEditedCoupon({});
    setupdateCoupon(false);
    setshowEditForm(true);
    setcode("");
    setamount(0);
    setminAmount(0);
    setfrequency(0);
    setactive(false);
  };

  const goBack = () => {
    setupdateCoupon(false);
    settobeEditedCoupon({});
    setshowEditForm(false);
    setcode("");
    setamount(0);
    setminAmount(0);
    setfrequency(0);
    setactive(false);
  };

  const deleteCoupon = async (coupon) => {
    if (window.confirm("Deleted Coupon?")) {
      const userInfo = localStorage.getItem("userInfo");
      const token = userInfo ? JSON.parse(userInfo).token : "";
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      };

      // delete coupon
      await axios
        .delete(`/api/coupon/${coupon._id}`, config)
        .then((res) => {
          console.log(res.data);
          alert("coupon deleted!");
          return res.data;
        })
        .catch((err) => console.log(err));
    }
  };

  const submitData = async () => {
    const userInfo = localStorage.getItem("userInfo");
    const token = userInfo ? JSON.parse(userInfo).token : "";
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    };

    if (updateCoupon) {
      //   update
      const body = {
        code,
        amount,
        active,
        minAmount,
        frequency,
      };

      axios
        .put(`/api/coupon/${tobeEditedCoupon._id}`, body, config)
        .then((res) => {
          console.log(res);
          var newallCoupons = [...allCoupons];
          for (var i in newallCoupons) {
            if (newallCoupons[i]._id == tobeEditedCoupon._id) {
              newallCoupons[i] = tobeEditedCoupon;
              break;
            }
          }
          setallCoupons(newallCoupons);
          goBack();
        });
    } else {
      //   new
      const body = {
        code,
        amount,
        active,
        minAmount,
        frequency,
      };

      console.log(body);

      axios.post("/api/coupon", body, config).then((res) => {
        console.log(res);
        alert("coupon added");
      });
    }
  };

  return (
    <div className="blog" style={{ backgroundColor: "transparent" }}>
      {showEditForm ? (
        <div className="blog__form">
          <p className="blog__form__back" onClick={goBack}>
            ←
          </p>
          <div className="blog__form__input__section">
            <div className="blog__form__inputs">
              <div className="blogAdmin__inputSection">
                <label>Coupon Code</label>
                <input
                  type="text"
                  onChange={(e) => setcode(e.target.value)}
                  value={code}
                ></input>
              </div>
              <div className="blogAdmin__inputSection">
                <label>Coupon Amount</label>
                <input
                  type="number"
                  onChange={(e) => setamount(e.target.value)}
                  value={amount}
                ></input>
              </div>
              <div className="blogAdmin__inputSection">
                <label>Coupon Min Amount</label>
                <input
                  type="number"
                  onChange={(e) => setminAmount(e.target.value)}
                  value={minAmount}
                ></input>
              </div>
              <div className="blogAdmin__inputSection">
                <label>Coupon Frequency</label>
                <input
                  type="number"
                  onChange={(e) => setfrequency(e.target.value)}
                  value={frequency}
                ></input>
              </div>
              <div className="blogAdmin__inputSection">
                <label>Coupon Status</label>
                <select
                  onChange={(e) => setactive(e.target.value)}
                  value={active}
                >
                  <option value={true}>Enabled</option>
                  <option value={false}>Disabled</option>
                </select>
              </div>
            </div>
          </div>
          <button className="blogAdmin__submitBtn" onClick={submitData}>
            Add
          </button>
        </div>
      ) : (
        <div className="blog__table">
          <button className="blog__table__addBtn" onClick={addNewCoupon}>
            Add New
          </button>
          <TableContainer component={Paper}>
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Code</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Minimum Amount</TableCell>
                  <TableCell>Frequency</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allCoupons?.map((singleCoupon) => (
                  <TableRow key={singleCoupon._id}>
                    <TableCell component="th" scope="row">
                      {singleCoupon.code}
                    </TableCell>
                    <TableCell>{singleCoupon.amount}</TableCell>
                    <TableCell>{singleCoupon.minAmount}</TableCell>
                    <TableCell>{singleCoupon.frequency}</TableCell>
                    <TableCell>
                      {singleCoupon.active ? "Enabled" : "Disabled"}
                    </TableCell>
                    <TableCell>
                      <button
                        className="blog__table__editBtn"
                        onClick={() => editCoupon(singleCoupon)}
                      >
                        Edit
                      </button>
                    </TableCell>
                    <TableCell>
                      <button
                        className="blog__table__editBtn"
                        onClick={() => deleteCoupon(singleCoupon)}
                      >
                        Delete
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </div>
  );
}

export default Coupon;
