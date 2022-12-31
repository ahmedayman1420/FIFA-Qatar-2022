// ===== --- ===== ### React ### ===== --- ===== //
import React, { useEffect, useState } from "react";

// ===== --- ===== ### Create-Match-Lists ### ===== --- ===== //
import teams from "./Team";
import { referees, assistantReferees, varAssistantReferees } from "./Referees";

// ===== --- ===== ### React-Bootstrap ### ===== --- ===== //
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Carousel from "react-bootstrap/Carousel";

// ===== --- ===== ### Images ### ===== --- ===== //
import rm from "../../Images/rm.jpg";
import img from "../../Images/Bayt.png";

// ===== --- ===== ### CreateMatch-Component-Style ### ===== --- ===== //
import Style from "./CreateMatch.module.scss";

// ===== --- ===== ### Cloudinary-Function-Upload ### ===== --- ===== //
import { UploadImg } from "../../Utilities/Cloudinary/UploadImg";

// ===== --- ===== ### External-Components ### ===== --- ===== //
import Loading from "../../Components/Loading/Loading";
import TimePicker from "react-bootstrap-time-picker";

// ===== --- ===== ### React-Redux ### ===== --- ===== //
import { useDispatch, useSelector } from "react-redux";

// ===== --- ===== ### JWT-Decode ### ===== --- ===== //
import jwt_decode from "jwt-decode";

// ===== --- ===== ### Stadium-Actions ### ===== --- ===== //
import { getStadiumsAction } from "../../Redux/Actions/StadiumActions";
import { createMatchAction } from "../../Redux/Actions/MatchActions";

// ======= --- ======= <| React-Router-Dom |> ======= --- ======= //
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";

// ===== --- ===== ### Stadium-Component ### ===== --- ===== //
function CreateMatch() {
  const dispatch = useDispatch();
  const stadiums = useSelector((state) => state.stadiums);
  const error = useSelector((state) => state.error);
  const matches = useSelector((state) => state.matches);
  let params = useParams();

  // ===== --- ===== ### Component-States ### ===== --- ===== //
  let [isEdit, setIsEdit] = useState(false);
  let [waiting, setWaiting] = useState();
  let [match, setMatch] = useState({
    team1: "",
    team2: "",

    stadium: "",
    matchTime: "",
    matchDate: "",

    referee: "",
    linesmen1: "",
    linesmen2: "",
    varReferee: "",
  });

  let [isFirstTime, setIsFirstTime] = useState({
    team1: true,
    team2: true,

    stadium: true,
    matchTime: true,
    matchDate: true,

    referee: true,
    linesmen1: true,
    linesmen2: true,
    varReferee: true,
  });

  let [isValidMatch, setIsValidMatch] = useState({
    team1: false,
    team2: false,

    stadium: false,
    matchTime: false,
    matchDate: false,

    referee: false,
    linesmen1: false,
    linesmen2: false,
    varReferee: false,
  });

  // ===== --- ===== ### Component-Functions ### ===== --- ===== //
  const [index, setIndex] = useState(0);

  const getMatch = ({ target }) => {
    setMatch((prevMatch) => {
      return { ...prevMatch, [target.name]: target.value };
    });
  };

  const checkMatchRegex = ({ target }) => {
    if (target.name == "matchTime") {
      if (target.value !== "" && target.value >= 0 && target.value < 24) {
        setIsValidMatch((prevMatch) => {
          return { ...prevMatch, [target.name]: true };
        });
        return true;
      } else {
        setIsValidMatch((prevMatch) => {
          return { ...prevMatch, [target.name]: false };
        });
        return false;
      }
    } else if (target.value !== "") {
      setIsValidMatch((prevMatch) => {
        return { ...prevMatch, [target.name]: true };
      });
      return true;
    } else {
      setIsValidMatch((prevMatch) => {
        return { ...prevMatch, [target.name]: false };
      });
      return false;
    }
  };

  const handleCreateMatch = async (e) => {
    e.preventDefault();
    setWaiting(true);
    let token = localStorage.getItem("token");
    let res = await dispatch(createMatchAction(match, token));
    if (res) e.target.reset();
    setMatch({
      team1: "",
      team2: "",

      stadium: "",
      matchTime: "",
      matchDate: "",

      referee: "",
      linesmen1: "",
      linesmen2: "",
      varReferee: "",
    });
    setIsValidMatch({
      team1: false,
      team2: false,

      stadium: false,
      matchTime: false,
      matchDate: false,

      referee: false,
      linesmen1: false,
      linesmen2: false,
      varReferee: false,
    });
    setIsFirstTime({
      team1: true,
      team2: true,

      stadium: true,
      matchTime: true,
      matchDate: true,

      referee: true,
      linesmen1: true,
      linesmen2: true,
      varReferee: true,
    });
    setWaiting(false);
  };

  const execute = async () => {
    await dispatch(getStadiumsAction());
  };

  const getInitialMatch = async () => {
    setWaiting(true);

    let matchId = await params["id"];
    if (matchId !== 0) {
      var temp = await matches.filter((match) => {
        return match._id === matchId;
      })[0];
      setMatch(temp);
      setMatch((prevMatch) => {
        return { ...prevMatch, stadium: prevMatch.stadium.name };
      });

      setIsEdit(true);
    }

    setIsFirstTime({
      team1: false,
      team2: false,

      stadium: false,
      matchTime: false,
      matchDate: false,

      referee: false,
      linesmen1: false,
      linesmen2: false,
      varReferee: false,
    });
    setIsValidMatch({
      team1: true,
      team2: true,

      stadium: true,
      matchTime: true,
      matchDate: true,

      referee: true,
      linesmen1: true,
      linesmen2: true,
      varReferee: true,
    });

    setWaiting(false);
  };

  useEffect(() => {
    setWaiting(true);
    getInitialMatch();
    if (stadiums.length <= 0) execute();
    setWaiting(false);
  }, []);

  // ===== --- ===== ### Component-JSX ### ===== --- ===== //
  console.log({ match });
  console.log({ isValidMatch });
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
          <Container>
            <Form
              className="w-75 p-4 rounded-1 m-auto"
              style={{
                backgroundColor: "#EBEBEA",
              }}
              onSubmit={handleCreateMatch}
            >
              {/* // ===== --- ===== ### Match-First-Team-Input ### ===== --- ===== // */}
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>First Team </Form.Label>
                <Form.Select
                  className="mb-3"
                  name="team1"
                  required={true}
                  value={match.team1}
                  onChange={(e) => {
                    let res = checkMatchRegex(e);
                    if (res) getMatch(e);

                    if (isFirstTime[e.target.name])
                      setIsFirstTime((prevMatch) => {
                        return { ...prevMatch, [e.target.name]: false };
                      });
                  }}
                >
                  <option value="">Select first team from this menu</option>
                  {teams.map((team, index) => {
                    return (
                      <option key={team} value={team}>
                        {team}
                      </option>
                    );
                  })}
                </Form.Select>
              </Form.Group>

              {/* // ===== --- ===== ### Match-Second-Team-Input ### ===== --- ===== // */}
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Second Team </Form.Label>
                <Form.Select
                  className="mb-3"
                  name="team2"
                  value={match.team2}
                  required={true}
                  onChange={(e) => {
                    let res = checkMatchRegex(e);
                    if (res) getMatch(e);

                    if (isFirstTime[e.target.name])
                      setIsFirstTime((prevMatch) => {
                        return { ...prevMatch, [e.target.name]: false };
                      });
                  }}
                >
                  <option value="">Select second team from this menu</option>
                  {teams.map((team, index) => {
                    return (
                      <option key={team} value={team}>
                        {team}
                      </option>
                    );
                  })}
                </Form.Select>
              </Form.Group>

              {/* // ===== --- ===== ### Match-Stadium-Input ### ===== --- ===== // */}
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Stadium </Form.Label>
                <Form.Select
                  className="mb-3"
                  name="stadium"
                  value={match.stadium}
                  required={true}
                  onChange={(e) => {
                    let res = checkMatchRegex(e);
                    if (res) getMatch(e);

                    if (isFirstTime[e.target.name])
                      setIsFirstTime((prevMatch) => {
                        return { ...prevMatch, [e.target.name]: false };
                      });
                  }}
                >
                  <option value="">Select match stadium from this menu</option>
                  {stadiums.map((stadium, index) => {
                    return (
                      <option key={index} value={stadium._id}>
                        {stadium.name}
                      </option>
                    );
                  })}
                </Form.Select>
              </Form.Group>

              {/* // ===== --- ===== ### Match-Referees-Input ### ===== --- ===== // */}
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Match referee </Form.Label>
                <Form.Select
                  className="mb-3"
                  name="referee"
                  value={match.referee}
                  required={true}
                  onChange={(e) => {
                    let res = checkMatchRegex(e);
                    if (res) getMatch(e);

                    if (isFirstTime[e.target.name])
                      setIsFirstTime((prevMatch) => {
                        return { ...prevMatch, [e.target.name]: false };
                      });
                  }}
                >
                  <option value="">Select match referee from this menu</option>
                  {referees.map((ref, index) => {
                    return (
                      <option key={index} value={ref}>
                        {ref}
                      </option>
                    );
                  })}
                </Form.Select>
              </Form.Group>

              {/* // ===== --- ===== ### Match-Lineman1-Input ### ===== --- ===== // */}

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Match Lineman-1 </Form.Label>
                <Form.Select
                  className="mb-3"
                  name="linesmen1"
                  value={match.linesmen1}
                  required={true}
                  onChange={(e) => {
                    let res = checkMatchRegex(e);
                    if (res) getMatch(e);

                    if (isFirstTime[e.target.name])
                      setIsFirstTime((prevMatch) => {
                        return { ...prevMatch, [e.target.name]: false };
                      });
                  }}
                >
                  <option value="">
                    Select match lineman-1 from this menu
                  </option>
                  {assistantReferees.map((ref, index) => {
                    return (
                      <option key={index} value={ref}>
                        {ref}
                      </option>
                    );
                  })}
                </Form.Select>
              </Form.Group>

              {/* // ===== --- ===== ### Match-Lineman2-Input ### ===== --- ===== // */}

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Match Lineman-2 </Form.Label>
                <Form.Select
                  className="mb-3"
                  name="linesmen2"
                  value={match.linesmen2}
                  required={true}
                  onChange={(e) => {
                    let res = checkMatchRegex(e);
                    if (res) getMatch(e);

                    if (isFirstTime[e.target.name])
                      setIsFirstTime((prevMatch) => {
                        return { ...prevMatch, [e.target.name]: false };
                      });
                  }}
                >
                  <option value="">
                    Select match lineman-2 from this menu
                  </option>
                  {assistantReferees.map((ref, index) => {
                    return (
                      <option key={index} value={ref}>
                        {ref}
                      </option>
                    );
                  })}
                </Form.Select>
              </Form.Group>

              {/* // ===== --- ===== ### Match-Var-Referee-Input ### ===== --- ===== // */}

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Match VAR referee</Form.Label>
                <Form.Select
                  className="mb-3"
                  name="varReferee"
                  value={match.varReferee}
                  required={true}
                  onChange={(e) => {
                    let res = checkMatchRegex(e);
                    if (res) getMatch(e);

                    if (isFirstTime[e.target.name])
                      setIsFirstTime((prevMatch) => {
                        return { ...prevMatch, [e.target.name]: false };
                      });
                  }}
                >
                  <option value="">
                    Select match var referee from this menu
                  </option>
                  {varAssistantReferees.map((ref, index) => {
                    return (
                      <option key={index} value={ref}>
                        {ref}
                      </option>
                    );
                  })}
                </Form.Select>
              </Form.Group>

              {/* // ===== --- ===== ### Match-Date-Input ### ===== --- ===== // */}
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Match data</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Enter match data"
                  required={true}
                  name="matchDate"
                  value={match.matchDate}
                  onChange={(e) => {
                    setIsValidMatch((prevMatch) => {
                      return { ...prevMatch, [e.target.name]: true };
                    });
                    getMatch(e);
                    if (isFirstTime[e.target.name])
                      setIsFirstTime((prevMatch) => {
                        return { ...prevMatch, [e.target.name]: false };
                      });
                  }}
                />
              </Form.Group>

              {/* // ===== --- ===== ### Match-Time-Input ### ===== --- ===== // */}
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Match time </Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter match time"
                  required={true}
                  name="matchTime"
                  value={match.matchTime}
                  min={1}
                  max={24}
                  onChange={(e) => {
                    let res = checkMatchRegex(e);
                    if (res) getMatch(e);

                    if (isFirstTime[e.target.name])
                      setIsFirstTime((prevMatch) => {
                        return { ...prevMatch, [e.target.name]: false };
                      });
                  }}
                />
                {!isFirstTime.matchTime && !isValidMatch.matchTime && (
                  <Alert variant="danger">
                    <Alert.Heading>
                      <p>Match time must be 0 - 23</p>
                    </Alert.Heading>
                  </Alert>
                )}
              </Form.Group>

              {/* // ===== --- ===== ### Error-State ### ===== --- ===== // */}
              {error.value && error.type === "match" && (
                <Alert variant="danger">
                  <Alert.Heading>{error.message}</Alert.Heading>
                </Alert>
              )}
              {/* // ===== --- ===== ### Stadium-Sumbit-BTN ### ===== --- ===== // */}
              <Button
                className={[Style.submitBtn, "w-100 mb-3"].join(" ")}
                style={{
                  backgroundColor: "#8b1538",
                  borderColor: "#8b1538",
                }}
                type="submit"
                disabled={
                  waiting ||
                  !(
                    isValidMatch.team1 &&
                    isValidMatch.team2 &&
                    isValidMatch.stadium &&
                    isValidMatch.matchTime &&
                    isValidMatch.matchDate &&
                    isValidMatch.referee &&
                    isValidMatch.linesmen1 &&
                    isValidMatch.linesmen2 &&
                    isValidMatch.varReferee
                  )
                }
              >
                {isEdit ? "Edit Match" : "Create Match"}
              </Button>
            </Form>
          </Container>
        </div>
      ) : (
        <Loading height={"vh-100"} />
      )}
    </>
  );
}

export default CreateMatch;
