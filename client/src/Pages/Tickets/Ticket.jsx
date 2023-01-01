// ===== --- ===== ### React ### ===== --- ===== //
import React, { useEffect, useState } from "react";

// ===== --- ===== ### React-Bootstrap ### ===== --- ===== //
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";

// ======= --- ======= <| React-Router-Dom |> ======= --- ======= //
import { useNavigate, useLocation } from "react-router-dom";

// ===== --- ===== ### Images ### ===== --- ===== //
import rm from "../../Images/rm.jpg";
import Argentina from "../../Images/flags/Argentina.png";
import Australia from "../../Images/flags/Australia.png";
import Belgium from "../../Images/flags/Belgium.png";
import Brazil from "../../Images/flags/Brazil.png";
import Cameroon from "../../Images/flags/Cameroon.png";
import Canada from "../../Images/flags/Canada.png";
import CostaRica from "../../Images/flags/CostaRica.png";
import Croatia from "../../Images/flags/Croatia.png";
import Denmark from "../../Images/flags/Denmark.png";

import England from "../../Images/flags/England.png";
import ECUADOR from "../../Images/flags/ECUADOR.jpeg";

import France from "../../Images/flags/France.png";
import Germany from "../../Images/flags/Germany.png";
import Ghana from "../../Images/flags/Ghana.png";

import Iran from "../../Images/flags/Iran.png";

import Japan from "../../Images/flags/Japan.png";
import Mexico from "../../Images/flags/Mexico.png";
import Morocco from "../../Images/flags/Morocco.png";

import Netherlands from "../../Images/flags/Netherlands.png";

import Poland from "../../Images/flags/Poland.png";
import Portugal from "../../Images/flags/Portugal.png";

import Qatar from "../../Images/flags/Qatar.jpg";

import SaudiArabia from "../../Images/flags/SaudiArabia.png";
import Serbia from "../../Images/flags/Serbia.png";
import SouthKorea from "../../Images/flags/SouthKorea.png";
import Spain from "../../Images/flags/Spain.png";

import Senegal from "../../Images/flags/Senegal.png";

import Switzerland from "../../Images/flags/Switzerland.png";
import Tunisia from "../../Images/flags/Tunisia.png";
import Uruguay from "../../Images/flags/Uruguay.png";

import USA from "../../Images/flags/USA.png";
import Wales from "../../Images/flags/Wales.png";

// ===== --- ===== ### Tcikets-Component-Style ### ===== --- ===== //
import Style from "./Tickets.module.scss";

// ===== --- ===== ### Tickets-Actions ### ===== --- ===== //
// import { getAllMatchesAction } from "../../Redux/Actions/MatchActions";

// ===== --- ===== ### External-Components ### ===== --- ===== //
import Loading from "../../Components/Loading/Loading";

// ===== --- ===== ### React-Redux ### ===== --- ===== //
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTicketsAction,
  getAllTicketsAction,
} from "../../Redux/Actions/MatchActions";

// ===== --- ===== ### Matches-Component ### ===== --- ===== //
function Tickets() {
  const dispatch = useDispatch();
  const tickets = useSelector((state) => state.tickets);
  const error = useSelector((state) => state.error);
  const navigate = useNavigate();
  const location = useLocation();

  let date = new Date();
  date.setDate(date.getDate() + 3);
  let diedline =
    date.getFullYear() +
    "-" +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + date.getDate()).slice(-2);
  // ===== --- ===== ### Component-States ### ===== --- ===== //
  let [waiting, setWaiting] = useState();
  let [flags, setFlags] = useState({
    Argentina,
    Australia,
    Belgium,
    Brazil,
    Cameroon,
    Canada,
    CostaRica,
    Croatia,
    Denmark,
    England,
    ECUADOR,
    France,
    Germany,
    Ghana,
    Iran,
    Japan,
    Mexico,
    Morocco,
    Netherlands,
    Poland,
    Portugal,
    Qatar,
    SaudiArabia,
    Serbia,
    SouthKorea,
    Spain,
    Senegal,
    Switzerland,
    Tunisia,
    Uruguay,
    USA,
    Wales,
  });

  // ===== --- ===== ### Component-Functions ### ===== --- ===== //

  const getAllTickets = async () => {
    if (tickets.length === 0) {
      let token = localStorage.getItem("token");
      setWaiting(true);
      const res = await dispatch(getAllTicketsAction(token));
      setWaiting(false);
    }
  };

  useEffect(() => {
    setWaiting(true);
    getAllTickets();
    setWaiting(false);
  }, []);

  // ===== --- ===== ### Component-JSX ### ===== --- ===== //

  return (
    <>
      {!waiting ? (
        <div
          className=""
          style={{
            marginTop: "150px",
          }}
        >
          <div className={Style.mainImg}></div>
          <div>
            <img
              src={rm}
              alt=""
              className="rounded-circle"
              style={{
                width: "200px",
                height: "200px",
              }}
            />
          </div>
          <Container
            className="px-4 py-2"
            style={{
              backgroundColor: "#8b1538",
              borderRadius: "20px",
            }}
          >
            {tickets.map((ticket, index) => {
              return (
                <div
                  key={index}
                  className={["row mb-3"].join(" ")}
                  style={{
                    backgroundColor: "#EEEEE4",
                    borderRadius: "20px",
                  }}
                >
                  <div
                    className="match-card p-4"
                    style={{
                      backgroundColor: "#EEEEE4",
                      borderRadius: "20px",
                    }}
                  >
                    <h3
                      className="text-center mb-4"
                      style={{
                        fontWeight: "bold",
                        fontSize: "30px",
                      }}
                    >
                      Match Ticket
                    </h3>
                    <h3
                      className="text-center mb-4"
                      style={{
                        fontWeight: "bold",
                        fontSize: "30px",
                      }}
                    >
                      <span className="date">
                        {ticket.matchId.matchDate.slice(0, 10)}
                      </span>
                    </h3>
                    <div className="countries-image d-flex justify-content-around align-items-center">
                      <div className="team1 text-center">
                        <img
                          className="w-50"
                          src={flags[ticket.matchId.team1]}
                          alt=""
                        />
                        <h4
                          className="teamName1"
                          style={{
                            fontWeight: "bold",
                            fontSize: "24px",
                          }}
                        >
                          {ticket.matchId.team1}
                        </h4>
                      </div>
                      <div className="team1 text-center">
                        <h4
                          className="teamName1"
                          style={{
                            fontWeight: "bold",
                            fontSize: "36px",
                          }}
                        >
                          VS
                        </h4>
                      </div>
                      <div className="team2 text-center">
                        <img
                          className="w-50"
                          src={flags[ticket.matchId.team2]}
                          alt=""
                        />
                        <h4
                          style={{
                            fontWeight: "bold",
                            fontSize: "24px",
                          }}
                          className="teamName2"
                        >
                          {ticket.matchId.team2}
                        </h4>
                      </div>
                    </div>
                    <div
                      className="text-center"
                      style={{
                        fontWeight: "bold",
                        fontSize: "24px",
                      }}
                    >
                      <p className="match__stadium">
                        {ticket.matchId.stadium.name}
                      </p>
                      <div className="time">{ticket.matchId.matchTime}:00</div>
                      <div className="time">
                        Seats: {ticket.seatNumber.join("-")}
                      </div>
                      <div className="time">
                        {/* // ===== --- ===== ### Stadium-Sumbit-BTN ### ===== --- ===== // */}
                        {ticket.matchId.matchDate > diedline && (
                          <Button
                            className={[Style.submitBtn, "w-100 my-4"].join(
                              " "
                            )}
                            style={{
                              backgroundColor: "#8b1538",
                              borderColor: "#8b1538",
                              fontWeight: "bold",
                              fontSize: "24px",
                            }}
                            type="submit"
                            onClick={async () => {
                              setWaiting(true);
                              let token = localStorage.getItem("token");
                              await dispatch(
                                deleteTicketsAction(token, ticket._id)
                              );
                              setWaiting(false);
                            }}
                          >
                            Cancel a reservation
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </Container>
        </div>
      ) : (
        <Loading height={"vh-100"} />
      )}
    </>
  );
}

export default Tickets;
