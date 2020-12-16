import React, { useState } from "react";
import axios from "axios";

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

const __DEV__ = document.domain === "localhost";

function Razorpay() {
  const [name, setName] = useState("Mehul");

  async function displayRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    // const data = await fetch('http://localhost:1337/razorpay', { method: 'POST' }).then((t) =>
    // 	t.json()
    // )

    const paymentBody = {
      price: {
        amount: 1,
        currencyCode: "INR",
      },
    };

    const data = await axios
      .post("/api/payment/order", paymentBody)
      .then((res) => {
        return res.data;
      });

    console.log(data);

    const options = {
      key: __DEV__ ? "rzp_test_uGoq5ABJztRAhk" : "PRODUCTION_KEY",
      currency: data.currency,
      amount: data.amount.toString(),
      order_id: data.id,
      name: "Rancho Labs",
      description: "Thank you for choosing Rancho Labs.",
      image:
        "https://rancho-labs-app.s3.amazonaws.com/images/logo-1607930535803.png",
      prefill: {
        name,
        email: "sdfdsjfh2@ndsfdf.com",
        phone_number: "9899999999",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  return (
    <div className="razorpay">
      <button onClick={displayRazorpay}>Pay Now</button>
    </div>
  );
}

export default Razorpay;
