// ===== --- ===== ### React ### ===== --- ===== //
import React, { useEffect, useState } from "react";

// ===== --- ===== ### React-Bootstrap ### ===== --- ===== //
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";

// ======= --- ======= <| React-Router-Dom |> ======= --- ======= //
import { NavLink, useLocation } from "react-router-dom";

// ===== --- ===== ### Images ### ===== --- ===== //
import rm from "../../Images/rm.jpg";

// ===== --- ===== ### Stadiums-Component-Style ### ===== --- ===== //
import Style from "./Stadiums.module.scss";

// ===== --- ===== ### Stadium-Actions ### ===== --- ===== //
import { getStadiumsAction } from "../../Redux/Actions/StadiumActions";

// ===== --- ===== ### External-Components ### ===== --- ===== //
import Loading from "../../Components/Loading/Loading";

// ===== --- ===== ### React-Redux ### ===== --- ===== //
import { useDispatch, useSelector } from "react-redux";

// ===== --- ===== ### Stadiums-Component ### ===== --- ===== //
function Stadiums() {
  const dispatch = useDispatch();
  const stadiums = useSelector((state) => state.stadiums);
  const error = useSelector((state) => state.error);

  // ===== --- ===== ### Component-States ### ===== --- ===== //
  let [waiting, setWaiting] = useState();

  // ===== --- ===== ### Component-Functions ### ===== --- ===== //

  const getAllStadiums = async () => {
    if (stadiums.length === 0) {
      setWaiting(true);
      const res = await dispatch(getStadiumsAction());
      setWaiting(false);
    }
  };

  useEffect(() => {
    setWaiting(true);
    getAllStadiums();
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
            {stadiums.map((stadium, index) => {
              return (
                <div
                  key={index}
                  className="row mb-3"
                  style={{
                    backgroundColor: "#EEEEE4",
                    borderRadius: "20px",
                  }}
                >
                  <div
                    className="col-md-6"
                    style={{
                      padding: "0px",
                    }}
                  >
                    <div className="stadium-img">
                      <img
                        src={stadium.image}
                        className="w-100"
                        style={{
                          borderRadius: "20px",
                        }}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div
                      className="stadium d-flex justify-content-center align-items-center h-100"
                      style={{
                        color: "#8A1538",
                      }}
                    >
                      <div className="text-center">
                        <h2
                          className="mb-3"
                          style={{
                            fontSize: "40px",
                            fontWeight: "bold",
                          }}
                        >
                          {stadium.name}
                        </h2>
                        <div
                          className="mb-3"
                          style={{
                            width: "100%",
                            height: "3px",
                            backgroundColor: "#8A1538",
                          }}
                        ></div>
                        <p>
                          FIFA World Cup 2022™ Stadium Capacity* {stadium.seats}
                        </p>
                        <div
                          className="mb-3"
                          style={{
                            width: "100%",
                            height: "2px",
                            backgroundColor: "#8A1538",
                          }}
                        ></div>
                        <Nav>
                          <Nav.Item className="m-auto" style={{}}>
                            <Nav.Link
                              style={{
                                backgroundColor: "#8A1538",
                                border: "1px solid #8A1538",
                                color: "#fff",
                                borderRadius: "20px",
                              }}
                              href={stadium.exploreMore}
                              target="_blank"
                            >
                              Explore More
                            </Nav.Link>
                          </Nav.Item>
                        </Nav>
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

export default Stadiums;
