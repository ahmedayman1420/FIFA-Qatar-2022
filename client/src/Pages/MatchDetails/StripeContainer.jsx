// ===== --- ===== ### React ### ===== --- ===== //
import React from "react";

// ===== --- ===== ### External-Components ### ===== --- ===== //
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";

const PUBLIC_KEY = process.env.React_App_Public_key;

const stripeTestPromise = loadStripe(PUBLIC_KEY);

// ===== --- ===== ### Component ### ===== --- ===== //
export default function StripeContainer({ tickets, matchId, price }) {
  return (
    <div>
      <Elements stripe={stripeTestPromise}>
        <PaymentForm tickets={tickets} price={price} matchId={matchId} />
      </Elements>
    </div>
  );
}
