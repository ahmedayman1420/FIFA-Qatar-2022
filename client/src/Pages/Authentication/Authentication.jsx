// ===== --- ===== ### React ### ===== --- ===== //
import React, { useEffect, useState } from "react";

// ===== --- ===== ### Style-Component ### ===== --- ===== //
import Style from "./Authentication.module.scss";

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

// ===== --- ===== ### Cloudinary-Function-Upload ### ===== --- ===== //
import { UploadImg } from "../../Utilities/Cloudinary/UploadImg";

// ===== --- ===== ### User-Regex ### ===== --- ===== //
import { userRegex } from "./UserRegex";

// ===== --- ===== ### Gapi ### ===== --- ===== //
import { gapi } from "gapi-script";

// ===== --- ===== ### React-Redux ### ===== --- ===== //
import { useDispatch, useSelector } from "react-redux";

// ===== --- ===== ### User-Actions ### ===== --- ===== //
import {
  ContinueWithGoogleAction,
  LoginAction,
  SignUpAction,
} from "../../Redux/Actions/UserAction";

// ===== --- ===== ### Nationalities ### ===== --- ===== //
import nationalities from "./nationalities";

// ===== --- ===== ### External-Components ### ===== --- ===== //
import Loading from "../../Components/Loading/Loading";

// ===== --- ===== ### Home-Component ### ===== --- ===== //
function Authentication() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const error = useSelector((state) => state.error);
  // ===== --- ===== ### Component-States ### ===== --- ===== //
  let [isSignIn, setIsSignIn] = useState(true);
  let [user, setUser] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    birthDate: "",
    gender: "",
    nationality: "",
    email: "",
  });

  let [isFirstTime, setIsFirstTime] = useState({
    username: true,
    password: true,
    firstName: true,
    lastName: true,
    birthDate: true,
    gender: true,
    nationality: true,
    email: true,
  });

  let [isValidUser, setIsValidUser] = useState({
    username: false,
    password: false,
    firstName: false,
    lastName: false,
    birthDate: false,
    gender: false,
    nationality: false,
    email: false,
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

  const register = async (user) => {
    let res = await dispatch(SignUpAction({ ...user }));
    return res;
  };

  const login = async (user) => {
    let res = await dispatch(
      LoginAction({ username: user.username, password: user.password })
    );
    return res;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setWaiting(true);
    let res = false;

    console.log({ user });
    if (isSignIn) res = await login(user);
    else res = await register(user);

    // if (res) navigate("/chats");
    setWaiting(false);
  };

  const responseGoogleSuccess = async (res) => {
    console.log("Google Sign Up success");
    const profile = res?.profileObj;
    const token = res?.tokenId;

    let isDone = await dispatch(ContinueWithGoogleAction(token));
    if (isDone) navigate(`/chats`);
  };

  const responseGoogleFailure = async (error) => {
    console.log("Google Sign up failure");
    console.log(error);
  };

  const RegisterOrLogin = () => {
    if (location.pathname === "/register") setIsSignIn(false);
    else if (location.pathname === "/login") setIsSignIn(true);
  };

  useEffect(() => {
    setWaiting(true);
    function start() {
      gapi.client.init({
        clientId: process.env.React_App_Client_Id,
        scope: "email",
      });
    }
    gapi.load("client:auth2", start);

    RegisterOrLogin();
    setWaiting(false);
  }, []);

  // ===== --- ===== ### Component-JSX ### ===== --- ===== //

  console.log({ nationalities });
  console.log({ user });
  console.log({ isValidUser });
  return (
    <>
      {!waiting ? (
        <div
          className="mt-5 d-flex justify-content-center align-items-center"
          style={{}}
        >
          <Form
            className="w-50 p-4 rounded-1"
            onSubmit={handleSubmit}
            style={{
              backgroundColor: "#bcbcb84b",
            }}
          >
            <div className="text-center ">
              <h2
                style={{
                  color: "#8b1538",
                }}
              >
                Fifa-Qatar-2022
              </h2>
            </div>
            {/* // ===== --- ===== ### User-First-Name-Input ### ===== --- ===== // */}
            {!isSignIn && (
              <Form.Group className="mb-3" controlId="formBasicFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  className="mb-3"
                  name="firstName"
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
            )}
            {/* // ===== --- ===== ### User-Last-Name-Input ### ===== --- ===== // */}
            {!isSignIn && (
              <Form.Group className="mb-3" controlId="formBasicFirstName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  className="mb-3"
                  name="lastName"
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
            )}
            {/* // ===== --- ===== ### User-Name-Input ### ===== --- ===== // */}

            <Form.Group className="mb-3" controlId="formBasicFirstName">
              <Form.Label>Username</Form.Label>
              <Form.Control
                className="mb-3"
                name="username"
                type="text"
                required={true}
                placeholder="Enter your username"
                onChange={(e) => {
                  let res = checkUserRegex(e);
                  if (res) getUser(e);
                  if (isFirstTime[e.target.name])
                    setIsFirstTime((prevUser) => {
                      return { ...prevUser, [e.target.name]: false };
                    });
                }}
              />
              {!isFirstTime.username && !isValidUser.username && (
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

            {/* // ===== --- ===== ### User-Email-Input ### ===== --- ===== // */}
            {!isSignIn && (
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  className="mb-3"
                  name="email"
                  type="email"
                  required={true}
                  placeholder="Enter your email"
                  onChange={(e) => {
                    let res = checkUserRegex(e);
                    if (res) getUser(e);

                    if (isFirstTime[e.target.name])
                      setIsFirstTime((prevUser) => {
                        return { ...prevUser, [e.target.name]: false };
                      });
                  }}
                />
                {!isFirstTime.email && !isValidUser.email && (
                  <Alert variant="danger">
                    <Alert.Heading>
                      Please include a valid domain in the email address.
                    </Alert.Heading>
                  </Alert>
                )}
              </Form.Group>
            )}
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

            {!isSignIn && (
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Birth Date</Form.Label>
                <Form.Control
                  className="mb-3"
                  name="birthDate"
                  type="date"
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
            )}
            {/* // ===== --- ===== ### User-Nationality-Input ### ===== --- ===== // */}
            {!isSignIn && (
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Nationality</Form.Label>
                <Form.Select
                  className="mb-3"
                  name="nationality"
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
            )}
            {/* // ===== --- ===== ### User-Gender-Input ### ===== --- ===== // */}
            {!isSignIn && (
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
            )}
            {/* // ===== --- ===== ### Error-State ### ===== --- ===== // */}
            {error.value && error.type === "auth" && (
              <Alert variant="danger">
                <Alert.Heading>{error.message}</Alert.Heading>
              </Alert>
            )}
            {/* // ===== --- ===== ### Submit-Buttons ### ===== --- ===== // */}
            <Button
              type="submit"
              className={[Style.submitBtn, "w-100 mb-3"].join(" ")}
              style={{
                backgroundColor: "#8b1538",
                borderColor: "#8b1538",
              }}
              disabled={
                (!isSignIn &&
                  (waiting ||
                    !(
                      isValidUser.username &&
                      isValidUser.password &&
                      isValidUser.firstName &&
                      isValidUser.lastName &&
                      isValidUser.birthDate &&
                      isValidUser.gender &&
                      isValidUser.email
                    ))) ||
                (isSignIn &&
                  (waiting || !(isValidUser.username && isValidUser.password)))
              }
            >
              {waiting && "Waiting ... "}
              {!waiting && !isSignIn && "Signup"}
              {!waiting && isSignIn && "Signin"}
            </Button>
            <GoogleLogin
              clientId={process.env.React_App_Client_Id}
              render={(renderProps) => (
                <Button
                  className="w-100 mb-3"
                  variant="success"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <FontAwesomeIcon size="lg" icon={faG} />
                  <span> Google</span>
                </Button>
              )}
              buttonText="Login"
              onSuccess={responseGoogleSuccess}
              onFailure={responseGoogleFailure}
              cookiePolicy={"single_host_origin"}
            />
            {isSignIn && (
              <Alert
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  color: "black",
                }}
              >
                <>
                  <span>Don't have an account ? </span>
                  <span
                    className={Style.sign}
                    onClick={() => {
                      setIsSignIn(false);
                      navigate(`/register`);
                    }}
                    style={{
                      color: "#8b1538",
                    }}
                  >
                    Sign Up
                  </span>
                </>
              </Alert>
            )}
            {!isSignIn && (
              <Alert
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  color: "black",
                }}
              >
                <>
                  <span>Already have an account ? </span>
                  <span
                    className={Style.sign}
                    onClick={() => {
                      setIsSignIn(true);
                      navigate(`/login`);
                    }}
                    style={{
                      color: "#8b1538",
                    }}
                  >
                    Sign In
                  </span>
                </>
              </Alert>
            )}
          </Form>
        </div>
      ) : (
        <Loading height={"vh-100"} />
      )}
    </>
  );
}

export default Authentication;
