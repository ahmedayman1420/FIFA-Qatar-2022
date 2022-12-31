// ===== --- ===== ### React ### ===== --- ===== //
import React, { useEffect, useState } from "react";

// ===== --- ===== ### React-Bootstrap ### ===== --- ===== //
import Button from "react-bootstrap/Button";

// ===== --- ===== ### External-Components ### ===== --- ===== //
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";

// ===== --- ===== ### Style-Component ### ===== --- ===== //
const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "#fff",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "#fce883" },
      "::placeholder": { color: "#000" },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
};

// ===== --- ===== ### Component ### ===== --- ===== //
export default function PaymentForm() {
  // ===== --- ===== ### Component-States ### ===== --- ===== //
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  // ===== --- ===== ### Component-Functions ### ===== --- ===== //
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    alert("HERE");
    console.log({ error });
    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post("http://localhost:5000/payment", {
          amount: 50 * 100,
          id,
        });

        if (response.data.success) {
          console.log("Successful payment");
          setSuccess(true);
        }
      } catch (error) {
        console.log("Error", error);
      }
    } else {
      console.log(error.message);
    }
  };

  // ===== --- ===== ### Component-JSX ### ===== --- ===== //
  return (
    <>
      {!success ? (
        <form onSubmit={handleSubmit}>
          <fieldset className="FormGroupPay">
            <div className="FormRowPay">
              <CardElement options={CARD_OPTIONS} />
            </div>
          </fieldset>
          <Button
            type="submit"
            className={["w-100 m-auto mb-3"].join(" ")}
            style={{
              fontWeight: "bold",
              fontSize: "20px",
              backgroundColor: "#8b1538",
              borderColor: "#8b1538",
            }}
            onClick={() => {}}
          >
            Buy a ticket
          </Button>{" "}
        </form>
      ) : (
        <div>
          <h2>You just bought macth ticket</h2>
        </div>
      )}
    </>
  );
}
