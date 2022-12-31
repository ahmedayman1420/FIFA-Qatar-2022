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

// ===== --- ===== ### Stadiums-Component-Style ### ===== --- ===== //
import Style from "./Matches.module.scss";

// ===== --- ===== ### Matches-Actions ### ===== --- ===== //
import { getAllMatchesAction } from "../../Redux/Actions/MatchActions";

// ===== --- ===== ### External-Components ### ===== --- ===== //
import Loading from "../../Components/Loading/Loading";

// ===== --- ===== ### React-Redux ### ===== --- ===== //
import { useDispatch, useSelector } from "react-redux";

// ===== --- ===== ### Matches-Component ### ===== --- ===== //
function Matches() {
  const dispatch = useDispatch();
  const matches = useSelector((state) => state.matches);
  const error = useSelector((state) => state.error);
  const navigate = useNavigate();
  const location = useLocation();

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

  const getAllMatches = async () => {
    if (matches.length === 0) {
      setWaiting(true);
      const res = await dispatch(getAllMatchesAction());
      setWaiting(false);
    }
  };

  useEffect(() => {
    setWaiting(true);
    getAllMatches();
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
            {matches.map((match, index) => {
              return (
                <div
                  key={index}
                  className={["row mb-3", Style.card].join(" ")}
                  style={{
                    backgroundColor: "#EEEEE4",
                    borderRadius: "20px",
                  }}
                  onClick={() => {
                    navigate(`/match-details/${match._id}`);
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
                      <span className="date">
                        {match.matchDate.slice(0, 10)}
                      </span>
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
                      <p className="match__stadium">{match.stadium.name}</p>
                      <div className="time">{match.matchTime}:00</div>
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

export default Matches;
