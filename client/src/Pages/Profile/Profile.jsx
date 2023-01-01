// ===== --- ===== ### React ### ===== --- ===== //
import React, { useEffect, useState } from "react";

// ===== --- ===== ### Style-Component ### ===== --- ===== //
import Style from "./Profile.module.scss";

// ===== --- ===== ### Images ### ===== --- ===== //
import rm from "../../Images/rm.jpg";

// ===== --- ===== ### React-Bootstrap ### ===== --- ===== //
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

// ===== --- ===== ### React-Router-Dom ### ===== --- ===== //
import { useNavigate, useLocation } from "react-router-dom";

// ===== --- ===== ### Fontawesome ### ===== --- ===== //
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye, faG } from "@fortawesome/free-solid-svg-icons";

// ===== --- ===== ### Google-Login ### ===== --- ===== //
import { GoogleLogin } from "react-google-login";

// ===== --- ===== ### User-Regex ### ===== --- ===== //
import { userRegex } from "./UserRegex";

// ===== --- ===== ### Gapi ### ===== --- ===== //
import { gapi } from "gapi-script";

// ===== --- ===== ### React-Redux ### ===== --- ===== //
import { useDispatch, useSelector } from "react-redux";

// ===== --- ===== ### User-Actions ### ===== --- ===== //
import {
  ContinueWithGoogleAction,
  eidtUserAction,
  LoginAction,
  SignUpAction,
} from "../../Redux/Actions/UserAction";

// ===== --- ===== ### Nationalities ### ===== --- ===== //
import nationalities from "./nationalities";

// ===== --- ===== ### External-Components ### ===== --- ===== //
import Loading from "../../Components/Loading/Loading";

// ===== --- ===== ### Home-Component ### ===== --- ===== //
function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userStore = useSelector((state) => state.user);
  const error = useSelector((state) => state.error);
  // ===== --- ===== ### Component-States ### ===== --- ===== //
  let [user, setUser] = useState({
    password: "",
    firstName: "",
    lastName: "",
    birthDate: "",
    gender: "",
    nationality: "",
  });

  let [isFirstTime, setIsFirstTime] = useState({
    password: true,
    firstName: true,
    lastName: true,
    birthDate: true,
    gender: true,
    nationality: true,
  });

  let [isValidUser, setIsValidUser] = useState({
    password: false,
    firstName: false,
    lastName: false,
    birthDate: false,
    gender: false,
    nationality: false,
  });

  let [waiting, setWaiting] = useState(true);
  let [passwordShown, setPasswordShown] = useState(false);

  // ===== --- ===== ### Component-Functions ### ===== --- ===== //
  let togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const getUser = ({ target }) => {
    setUser((prevUser) => {
      return { ...prevUser, [target.name]: target.value };
    });
  };

  const checkUserRegex = ({ target }) => {
    if (userRegex[target.name].test(target.value)) {
      setIsValidUser((prevUser) => {
        return { ...prevUser, [target.name]: true };
      });
      return true;
    } else {
      setIsValidUser((prevUser) => {
        return { ...prevUser, [target.name]: false };
      });
      return false;
    }
  };

  const editUser = async (user) => {
    let token = localStorage.getItem("token");
    let res = await dispatch(eidtUserAction(user, token));
    return res;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setWaiting(true);
    let res = false;

    console.log({ user });
    res = await editUser(user);
    setUser(userStore);
    setIsFirstTime({
      password: true,
      firstName: false,
      lastName: false,
      birthDate: true,
      gender: true,
      nationality: false,
    });

    setIsValidUser({
      password: false,
      firstName: true,
      lastName: true,
      birthDate: false,
      gender: false,
      nationality: true,
    });
    setWaiting(false);

    navigate("/home");
  };

  useEffect(() => {
    setWaiting(true);
    setUser(userStore);
    setIsFirstTime({
      password: true,
      firstName: false,
      lastName: false,
      birthDate: true,
      gender: true,
      nationality: false,
    });

    setIsValidUser({
      password: false,
      firstName: true,
      lastName: true,
      birthDate: false,
      gender: false,
      nationality: true,
    });
    setWaiting(false);
  }, []);

  // ===== --- ===== ### Component-JSX ### ===== --- ===== //

  console.log({ nationalities });
  console.log({ user });
  console.log({ isValidUser });
  return (
    <>
      <div className={Style.mainImg}></div>
      <div>
        <img
          src={rm}
          alt=""
          className="rounded-circle"
          style={{
            width: "200px",
            height: "200px",
            position: "absolute",
          }}
        />
      </div>
      {!waiting ? (
        <div
          className=" d-flex justify-content-center align-items-center "
          style={{ marginTop: "150px" }}
        >
          <Form
            className="w-50 p-4 rounded-1"
            onSubmit={handleSubmit}
            style={{
              backgroundColor: "#EBEBEA",
            }}
          >
            <div className="text-center ">
              <h2
                style={{
                  color: "#8b1538",
                }}
              >
                Profile Data
              </h2>
            </div>
            {/* // ===== --- ===== ### User-First-Name-Input ### ===== --- ===== // */}
            {
              <Form.Group className="mb-3" controlId="formBasicFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  className="mb-3"
                  name="firstName"
                  value={user.firstName}
                  type="text"
                  required={true}
                  placeholder="Enter your fisrt name"
                  onChange={(e) => {
                    let res = checkUserRegex(e);
                    if (res) getUser(e);
                    if (isFirstTime[e.target.name])
                      setIsFirstTime((prevUser) => {
                        return { ...prevUser, [e.target.name]: false };
                      });
                  }}
                />
                {!isFirstTime.firstName && !isValidUser.firstName && (
                  <Alert variant="danger">
                    <Alert.Heading>
                      <p>Your name must be a combination of:</p>
                      <ul>
                        <li>Uppercase letters</li>
                        <li>Lowercase letter</li>
                        <li>Numbers</li>
                      </ul>
                    </Alert.Heading>
                  </Alert>
                )}
              </Form.Group>
            }
            {/* // ===== --- ===== ### User-Last-Name-Input ### ===== --- ===== // */}
            {
              <Form.Group className="mb-3" controlId="formBasicFirstName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  className="mb-3"
                  name="lastName"
                  value={user.lastName}
                  type="text"
                  required={true}
                  placeholder="Enter your last name"
                  onChange={(e) => {
                    let res = checkUserRegex(e);
                    if (res) getUser(e);
                    if (isFirstTime[e.target.name])
                      setIsFirstTime((prevUser) => {
                        return { ...prevUser, [e.target.name]: false };
                      });
                  }}
                />
                {!isFirstTime.lastName && !isValidUser.lastName && (
                  <Alert variant="danger">
                    <Alert.Heading>
                      <p>Your name must be a combination of:</p>
                      <ul>
                        <li>Uppercase letters</li>
                        <li>Lowercase letter</li>
                        <li>Numbers</li>
                      </ul>
                    </Alert.Heading>
                  </Alert>
                )}
              </Form.Group>
            }

            {/* // ===== --- ===== ### User-Password-Input ### ===== --- ===== // */}
            <Form.Group
              className={["mb-3"].join(" ")}
              controlId="formBasicPassword"
            >
              <Form.Label>Password</Form.Label>
              <div className={Style.password}>
                <Form.Control
                  className="mb-3"
                  name="password"
                  placeholder="Enter password"
                  required={true}
                  onChange={(e) => {
                    let res = checkUserRegex(e);
                    if (res) getUser(e);

                    if (isFirstTime[e.target.name])
                      setIsFirstTime((prevUser) => {
                        return { ...prevUser, [e.target.name]: false };
                      });
                  }}
                  type={passwordShown ? "text" : "password"}
                />
                <FontAwesomeIcon
                  className={[Style.icon, Style.posswordIcon].join(" ")}
                  size="lg"
                  icon={passwordShown ? faEye : faEyeSlash}
                  onClick={togglePassword}
                />
              </div>
              {!isFirstTime.password && !isValidUser.password && (
                <Alert variant="danger">
                  <Alert.Heading>
                    <p>Your password must:</p>
                    <ul>
                      <li>Contain at least 8 characters</li>
                      <li>
                        At least one uppercase letter, one lowercase letter, one
                        number and one special character
                      </li>
                    </ul>
                  </Alert.Heading>
                </Alert>
              )}
            </Form.Group>
            {/* // ===== --- ===== ### User-Birth-Date-Input ### ===== --- ===== // */}

            {
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Birth Date</Form.Label>
                <Form.Control
                  className="mb-3"
                  name="birthDate"
                  type="date"
                  value={user.birthDate}
                  required={true}
                  placeholder="Enter your birth date"
                  onChange={(e) => {
                    getUser(e);

                    setIsValidUser((prevUser) => {
                      return { ...prevUser, [e.target.name]: true };
                    });

                    if (isFirstTime[e.target.name])
                      setIsFirstTime((prevUser) => {
                        return { ...prevUser, [e.target.name]: false };
                      });
                  }}
                />
              </Form.Group>
            }
            {/* // ===== --- ===== ### User-Nationality-Input ### ===== --- ===== // */}
            {
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Nationality</Form.Label>
                <Form.Select
                  className="mb-3"
                  name="nationality"
                  value={user.nationality}
                  required={true}
                  onChange={(e) => {
                    getUser(e);
                  }}
                >
                  <option>Select your nationality from this menu</option>
                  {nationalities.map((nationality, index) => {
                    return (
                      <option key={nationality} value={nationality}>
                        {nationality}
                      </option>
                    );
                  })}
                </Form.Select>
              </Form.Group>
            }
            {/* // ===== --- ===== ### User-Gender-Input ### ===== --- ===== // */}
            {
              <Form.Group
                onChange={(e) => {
                  let res = checkUserRegex(e);
                  if (res) getUser(e);
                  if (isFirstTime[e.target.name])
                    setIsFirstTime((prevUser) => {
                      return { ...prevUser, [e.target.name]: false };
                    });
                }}
                className="mb-3"
                controlId="formBasicEmail"
              >
                <Form.Check
                  inline
                  label="Male"
                  name="gender"
                  type="radio"
                  value="male"
                />
                <Form.Check
                  inline
                  label="Female"
                  name="gender"
                  type="radio"
                  value="female"
                />
              </Form.Group>
            }
            {/* // ===== --- ===== ### Error-State ### ===== --- ===== // */}
            {error.value && error.type === "auth" && (
              <Alert variant="danger">
                <Alert.Heading>{error.message}</Alert.Heading>
              </Alert>
            )}
            {/* // ===== --- ===== ### Submit-Buttons ### ===== --- ===== // */}
            <Button
              type="submit"
              className={["w-100 mb-3"].join(" ")}
              variant="warning"
              disabled={
                waiting ||
                !(
                  isValidUser.password &&
                  isValidUser.firstName &&
                  isValidUser.lastName &&
                  isValidUser.birthDate &&
                  isValidUser.gender
                )
              }
            >
              {waiting && "Waiting ... "}
              {!waiting && "Edit profile date"}
            </Button>
          </Form>
        </div>
      ) : (
        <Loading height={"vh-100"} />
      )}
    </>
  );
}

export default Profile;
