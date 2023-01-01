// ===== --- ===== ### React ### ===== --- ===== //
import React, { useEffect, useState } from "react";

// ===== --- ===== ### React-Bootstrap ### ===== --- ===== //
import Button from "react-bootstrap/Button";

// ===== --- ===== ### React-Redux ### ===== --- ===== //
import { useDispatch, useSelector } from "react-redux";

// ===== --- ===== ### External-Components ### ===== --- ===== //
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

// ===== --- ===== ### Axios ### ===== --- ===== //
import axios from "axios";

// ===== --- ===== ### Match-Actions ### ===== --- ===== //
import {
  getAllMatchesAction,
  getAllTicketsAction,
} from "../../Redux/Actions/MatchActions";

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
export default function PaymentForm({ tickets, matchId, price }) {
  // ===== --- ===== ### Component-States ### ===== --- ===== //
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();

  // ===== --- ===== ### Component-Functions ### ===== --- ===== //
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    // alert("HERE");
    console.log({ error });
    if (!error) {
      try {
        let token = localStorage.getItem("token");
        const { id } = paymentMethod;
        console.log({ Price: price * 100 * tickets.length });
        const response = await axios.post(
          "http://localhost:5000/match/ticket",
          {
            amount: price * 100 * tickets.length,
            id,
            matchId,
            boughtTickets: tickets,
          },
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          console.log("Successful payment");
          setSuccess(true);

          let token = localStorage.getItem("token");
          const res = await dispatch(getAllMatchesAction());
          const ticketRes = await dispatch(getAllTicketsAction(token));
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
