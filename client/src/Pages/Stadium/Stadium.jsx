// ===== --- ===== ### React ### ===== --- ===== //
import React, { useEffect, useState } from "react";

// ===== --- ===== ### React-Bootstrap ### ===== --- ===== //
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

// ===== --- ===== ### Images ### ===== --- ===== //
import rm from "../../Images/rm.jpg";

// ===== --- ===== ### Stadium-Component-Style ### ===== --- ===== //
import Style from "./Stadium.module.scss";

// ===== --- ===== ### Cloudinary-Function-Upload ### ===== --- ===== //
import { UploadImg } from "../../Utilities/Cloudinary/UploadImg";

// ===== --- ===== ### Stadium-Regex ### ===== --- ===== //
import { stadiumRegex } from "./StadiumRegex";

// ===== --- ===== ### External-Components ### ===== --- ===== //
import Loading from "../../Components/Loading/Loading";

// ===== --- ===== ### React-Redux ### ===== --- ===== //
import { useDispatch, useSelector } from "react-redux";

// ===== --- ===== ### Stadium-Actions ### ===== --- ===== //
import { createStadiumAction } from "../../Redux/Actions/StadiumActions";

// ===== --- ===== ### Stadium-Component ### ===== --- ===== //
function Stadium() {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.error);

  // ===== --- ===== ### Component-States ### ===== --- ===== //
  let [waiting, setWaiting] = useState();
  let [stadium, setStadium] = useState({
    name: "",
    location: "",
    openDate: "",

    seats: 0,
    vipSeats: 0,
    vipWidth: 0,
    vipLength: 0,

    image: "",
  });

  let [isFirstTime, setIsFirstTime] = useState({
    name: true,
    location: true,
    openDate: true,

    seats: true,
    vipSeats: true,
    vipWidth: true,
    vipLength: true,

    image: true,
  });

  let [isValidStadium, setIsValidStadium] = useState({
    name: false,
    location: false,
    openDate: false,

    seats: false,
    vipSeats: false,
    vipWidth: false,
    vipLength: false,

    image: false,
  });

  // ===== --- ===== ### Component-Functions ### ===== --- ===== //

  const getStadium = ({ target }) => {
    setStadium((prevStadium) => {
      return { ...prevStadium, [target.name]: target.value };
    });
  };

  const checkStadiumRegex = ({ target }) => {
    if (stadiumRegex[target.name].test(target.value)) {
      setIsValidStadium((prevUser) => {
        return { ...prevUser, [target.name]: true };
      });
      return true;
    } else {
      setIsValidStadium((prevUser) => {
        return { ...prevUser, [target.name]: false };
      });
      return false;
    }
  };

  const handleStadiumImg = ({ target }) => {
    if (target.files[0] && target.files[0].type.match("image.*")) {
      setIsValidStadium((prevStadium) => {
        return { ...prevStadium, image: true };
      });
      setStadium((prevStadium) => {
        return { ...prevStadium, image: target.files[0] };
      });
    } else {
      target.value = "";
      setStadium((prevStadium) => {
        return { ...prevStadium, image: "" };
      });
      setIsValidStadium((prevStadium) => {
        return { ...prevStadium, image: false };
      });
    }
  };

  const handleCreateStadium = async () => {
    alert("HEREE");
    const cloudinaryResponse = await UploadImg(stadium.image);
    let token = localStorage.getItem("token");
    console.log({ stadium });
    console.log({ token });
    alert("HEREE");
    let res = await dispatch(
      createStadiumAction(
        { ...stadium, image: cloudinaryResponse.data.secure_url },
        token
      )
    );
    return res;
  };

  useEffect(() => {
    setWaiting(true);
    setWaiting(false);
  }, []);

  // ===== --- ===== ### Component-JSX ### ===== --- ===== //
  console.log({ stadium });
  console.log({ isValidStadium });
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
              onSubmit={handleCreateStadium}
            >
              {/* // ===== --- ===== ### Stadium-Name-Input ### ===== --- ===== // */}
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Stadium name </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter stadium name"
                  required={true}
                  name="name"
                  onChange={(e) => {
                    let res = checkStadiumRegex(e);
                    if (res) getStadium(e);
                    if (isFirstTime[e.target.name])
                      setIsFirstTime((prevStadium) => {
                        return { ...prevStadium, [e.target.name]: false };
                      });
                  }}
                />

                {!isFirstTime.name && !isValidStadium.name && (
                  <Alert variant="danger">
                    <Alert.Heading>
                      <p>Stadium name must be a combination of:</p>
                      <ul>
                        <li>Uppercase letters</li>
                        <li>Lowercase letter</li>
                        <li>Numbers</li>
                      </ul>
                    </Alert.Heading>
                  </Alert>
                )}
              </Form.Group>
              {/* // ===== --- ===== ### Stadium-Location-Input ### ===== --- ===== // */}
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Stadium location</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter stadium location"
                  required={true}
                  name="location"
                  onChange={(e) => {
                    let res = checkStadiumRegex(e);
                    if (res) getStadium(e);
                    if (isFirstTime[e.target.name])
                      setIsFirstTime((prevStadium) => {
                        return { ...prevStadium, [e.target.name]: false };
                      });
                  }}
                />

                {!isFirstTime.location && !isValidStadium.location && (
                  <Alert variant="danger">
                    <Alert.Heading>
                      <p>Stadium location must be a combination of:</p>
                      <ul>
                        <li>Uppercase letters</li>
                        <li>Lowercase letter</li>
                        <li>Numbers</li>
                      </ul>
                    </Alert.Heading>
                  </Alert>
                )}
              </Form.Group>
              {/* // ===== --- ===== ### Stadium-Opening-Date-Input ### ===== --- ===== // */}
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Stadium opening data</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Enter stadium opening data"
                  required={true}
                  name="openDate"
                  onChange={(e) => {
                    setIsValidStadium((prevStadium) => {
                      return { ...prevStadium, [e.target.name]: true };
                    });
                    getStadium(e);
                    if (isFirstTime[e.target.name])
                      setIsFirstTime((prevStadium) => {
                        return { ...prevStadium, [e.target.name]: false };
                      });
                  }}
                />
              </Form.Group>
              {/* // ===== --- ===== ### Stadium-Seats-Input ### ===== --- ===== // */}
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Stadium seats</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter stadium total seats"
                  required={true}
                  name="seats"
                  onChange={(e) => {
                    let res = checkStadiumRegex(e);
                    if (res) getStadium(e);
                    if (isFirstTime[e.target.name])
                      setIsFirstTime((prevStadium) => {
                        return { ...prevStadium, [e.target.name]: false };
                      });
                  }}
                />

                {!isFirstTime.seats && !isValidStadium.seats && (
                  <Alert variant="danger">
                    <Alert.Heading>
                      <p>Stadium seats must be a number</p>
                    </Alert.Heading>
                  </Alert>
                )}
              </Form.Group>
              {/* // ===== --- ===== ### Stadium-VIP-Seats-Input ### ===== --- ===== // */}
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Stadium VIP seats</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter stadium VIP seats"
                  required={true}
                  name="vipSeats"
                  onChange={(e) => {
                    let res = checkStadiumRegex(e);
                    if (res) getStadium(e);
                    if (isFirstTime[e.target.name])
                      setIsFirstTime((prevStadium) => {
                        return { ...prevStadium, [e.target.name]: false };
                      });
                  }}
                />

                {!isFirstTime.vipSeats && !isValidStadium.vipSeats && (
                  <Alert variant="danger">
                    <Alert.Heading>
                      <p>Stadium vip-Seats must be a number</p>
                    </Alert.Heading>
                  </Alert>
                )}
              </Form.Group>
              {/* // ===== --- ===== ### Stadium-VIP-Seats-Length-Input ### ===== --- ===== // */}
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Stadium VIP seats length</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter stadium VIP seats length"
                  required={true}
                  name="vipLength"
                  onChange={(e) => {
                    let res = checkStadiumRegex(e);
                    if (res) getStadium(e);
                    if (isFirstTime[e.target.name])
                      setIsFirstTime((prevStadium) => {
                        return { ...prevStadium, [e.target.name]: false };
                      });
                  }}
                />

                {!isFirstTime.vipLength && !isValidStadium.vipLength && (
                  <Alert variant="danger">
                    <Alert.Heading>
                      <p>Stadium vip-Seats length must be a number</p>
                    </Alert.Heading>
                  </Alert>
                )}
              </Form.Group>
              {/* // ===== --- ===== ### Stadium-VIP-Seats-Width-Input ### ===== --- ===== // */}
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Stadium VIP seats width</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter stadium VIP seats width"
                  required={true}
                  name="vipWidth"
                  onChange={(e) => {
                    let res = checkStadiumRegex(e);
                    if (res) getStadium(e);
                    if (isFirstTime[e.target.name])
                      setIsFirstTime((prevStadium) => {
                        return { ...prevStadium, [e.target.name]: false };
                      });
                  }}
                />

                {!isFirstTime.vipWidth && !isValidStadium.vipWidth && (
                  <Alert variant="danger">
                    <Alert.Heading>
                      <p>Stadium vip-Seats width must be a number</p>
                    </Alert.Heading>
                  </Alert>
                )}
              </Form.Group>
              {/* // ===== --- ===== ### Stadium-Image-Input ### ===== --- ===== // */}
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Upload stadium picture</Form.Label>
                <Form.Control
                  className="mb-3"
                  type="file"
                  name="image"
                  onChange={(e) => {
                    handleStadiumImg(e);

                    if (isFirstTime.image)
                      setIsFirstTime((prevUser) => {
                        return { ...prevUser, image: false };
                      });
                  }}
                />

                {!isFirstTime.image && !isValidStadium.image && (
                  <Alert variant="danger">
                    <Alert.Heading>
                      Allowed files are .png, .jpg and .jpeg
                    </Alert.Heading>
                  </Alert>
                )}
              </Form.Group>

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
                    isValidStadium.name &&
                    isValidStadium.location &&
                    isValidStadium.openDate &&
                    isValidStadium.seats &&
                    isValidStadium.vipSeats &&
                    isValidStadium.vipLength &&
                    isValidStadium.vipWidth &&
                    isValidStadium.image
                  )
                }
              >
                Create Stadium
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

export default Stadium;
