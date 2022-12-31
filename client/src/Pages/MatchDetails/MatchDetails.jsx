// ===== --- ===== ### React ### ===== --- ===== //
import React, { useEffect, useState } from "react";

// ===== --- ===== ### External-Components ### ===== --- ===== //
import StripeContainer from "./StripeContainer";

// ===== --- ===== ### JWT-Decode ### ===== --- ===== //
import jwt_decode from "jwt-decode";

// ===== --- ===== ### React-Bootstrap ### ===== --- ===== //
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";

// ======= --- ======= <| React-Router-Dom |> ======= --- ======= //
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";

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

// ===== --- ===== ### Match-Details-Component-Style ### ===== --- ===== //
import Style from "./MatchDetails.module.scss";

// ===== --- ===== ### Matches-Actions ### ===== --- ===== //
import { getAllMatchesAction } from "../../Redux/Actions/MatchActions";

// ===== --- ===== ### External-Components ### ===== --- ===== //
import Loading from "../../Components/Loading/Loading";

// ===== --- ===== ### React-Redux ### ===== --- ===== //
import { useDispatch, useSelector } from "react-redux";

// ===== --- ===== ### Match-Details-Component ### ===== --- ===== //
function MatchDetails() {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.error);
  const matches = useSelector((state) => state.matches);
  let params = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // ===== --- ===== ### Component-States ### ===== --- ===== //
  let [isFan, setIsFan] = useState(false);
  let [isAdmin, setIsAdmin] = useState(false);
  let [isManager, setIsManager] = useState(false);
  let [waiting, setWaiting] = useState(true);
  let [match, setMatch] = useState(null);
  let [tickets, setTickets] = useState([]);
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

  const getUserRole = async () => {
    let token = localStorage.getItem("token");
    if (token) {
      let decoded = await jwt_decode(token);
      if (decoded.data.role === "admin") setIsAdmin(true);
      if (decoded.data.role === "manager") setIsManager(true);
      if (decoded.data.role === "fan") setIsFan(true);
    } else {
      setIsAdmin(false);
      setIsManager(false);
    }
  };

  const updateTicket = async (index) => {
    let res = tickets.map((item) => {
      if (item.key === index) return true;
      else return false;
    });

    console.log({ res });

    let tempTickets = tickets;
    let length = tempTickets.length;
    tempTickets = tempTickets.filter((item) => {
      return item.key !== index;
    });

    if (length > tempTickets.length) {
      setTickets(tempTickets);
    } else {
      setTickets((prevTickets) => {
        return [...prevTickets, { key: index }];
      });
    }
  };

  const getMatch = async () => {
    setWaiting(true);

    let matchId = await params["id"];

    let match = await matches.filter((match) => {
      return match._id === matchId;
    })[0];
    await setMatch(match);
    // setTickets(match.vipSeats);
    setWaiting(false);
  };

  useEffect(() => {
    getMatch();
    getUserRole();
  }, [location.pathname]);

  // ===== --- ===== ### Component-JSX ### ===== --- ===== //

  console.log({ tickets });

  return (
    <>
      {!waiting && match !== null ? (
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
            <div
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
                  <span className="date">{match.matchDate.slice(0, 10)}</span>
                  <div className="my-4">
                    <p>Ticket price: {match.ticket}$</p>
                  </div>
                </h3>
                <div className="countries-image d-flex justify-content-around align-items-center">
                  <div className="team1 text-center">
                    <img className="w-50" src={flags[match.team1]} alt="" />
                    <h4
                      className="teamName1"
                      style={{
                        fontWeight: "bold",
                        fontSize: "24px",
                      }}
                    >
                      {match.team1}
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
                    <img className="w-50" src={flags[match.team2]} alt="" />
                    <h4
                      style={{
                        fontWeight: "bold",
                        fontSize: "24px",
                      }}
                      className="teamName2"
                    >
                      {match.team2}
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
                  <div className="time">{match.matchTime}:00</div>

                  <div className="my-5">
                    <p>Referee: {match.referee}</p>
                    <div className="Referee d-flex justify-content-between">
                      <p>Lineman-1: {match.linesmen1}</p>
                      <p>Lineman-2: {match.linesmen1}</p>
                      <p>VAR referee: {match.varReferee}</p>
                    </div>
                  </div>
                  <p className="match__stadium">{match.stadium.name}</p>
                  <div
                    className="seats p-5 mb-4"
                    style={{
                      backgroundColor: "#8b1538",
                      borderRadius: "50px",
                    }}
                  >
                    <h2
                      className="mb-5"
                      style={{
                        color: "#EEEEE4",
                      }}
                    >
                      Seats
                    </h2>
                    <div className="row flex-wrap ">
                      {match.vipSeats.map((seat, index) => {
                        return (
                          <div
                            key={index}
                            className={["mb-3"].join(" ")}
                            style={{
                              width: "10%",
                            }}
                          >
                            <div
                              className={[""].join(" ")}
                              style={{
                                width: "max-content",
                              }}
                              onClick={() => {
                                updateTicket(index);
                              }}
                            >
                              <div
                                key={index}
                                style={{
                                  width: "20px",
                                  height: "20px",
                                  borderRadius: "50%",
                                  backgroundColor: "#EEEEE4",
                                }}
                                className={[
                                  "col-1",
                                  tickets
                                    .map((item) => {
                                      if (item.key === index) return true;
                                      else return false;
                                    })
                                    .filter(Boolean)[0]
                                    ? Style.resSeat
                                    : Style.seat,
                                ].join(" ")}
                              ></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="mb-4">
                    {(isManager || isAdmin || isFan) && (
                      <StripeContainer />
                      //   <Button
                      //     type="submit"
                      //     className={["w-100 m-auto mb-3"].join(" ")}
                      //     style={{
                      //       fontWeight: "bold",
                      //       fontSize: "20px",
                      //       backgroundColor: "#8b1538",
                      //       borderColor: "#8b1538",
                      //     }}
                      //     onClick={() => {}}
                      //   >
                      //     Buy a ticket
                      //   </Button>
                    )}
                  </div>

                  {/* <img
                    className="w-100 mb-4"
                    src={match.stadium.image}
                    alt=""
                  /> */}

                  {(isManager || isAdmin) && (
                    <Button
                      type="submit"
                      className={["w-100 m-auto mb-3"].join(" ")}
                      style={{
                        fontWeight: "bold",
                        fontSize: "20px",
                      }}
                      variant="warning"
                      onClick={() => {
                        navigate(`/create-match/${match._id}`);
                      }}
                    >
                      Edit macth event
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </Container>
        </div>
      ) : (
        <Loading height={"vh-100"} />
      )}
    </>
  );
}

export default MatchDetails;
