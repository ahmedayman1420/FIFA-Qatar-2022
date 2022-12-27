// ===== --- ===== ### React ### ===== --- ===== //
import React, { useEffect, useState } from "react";

// ===== --- ===== ### React-Bootstrap ### ===== --- ===== //
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
// ===== --- ===== ### Images ### ===== --- ===== //
import rm from "../../Images/rm.jpg";
// ===== --- ===== ### Stadium-Component-Style ### ===== --- ===== //
import Style from "./Stadium.module.scss";

// ===== --- ===== ### External-Components ### ===== --- ===== //
import Loading from "../../Components/Loading/Loading";

// ===== --- ===== ### React-Redux ### ===== --- ===== //
import { useDispatch, useSelector } from "react-redux";

// ===== --- ===== ### UserAuthority-Component ### ===== --- ===== //
function Stadium() {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.error);

  // ===== --- ===== ### Component-States ### ===== --- ===== //
  let [waiting, setWaiting] = useState();

  // ===== --- ===== ### Component-Functions ### ===== --- ===== //
  useEffect(() => {
    setWaiting(true);
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
          <Container>
            <Form
              className="w-75 p-4 rounded-1 m-auto"
              style={{
                backgroundColor: "#EBEBEA",
              }}
            >
              {/* // ===== --- ===== ### Stadium-Name-Input ### ===== --- ===== // */}

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Stadium name </Form.Label>
                <Form.Control type="text" placeholder="Enter stadium name" />
              </Form.Group>

              {/* // ===== --- ===== ### Stadium-Location-Input ### ===== --- ===== // */}

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Stadium location</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter stadium location"
                />
              </Form.Group>

              {/* // ===== --- ===== ### Stadium-Opening-Date-Input ### ===== --- ===== // */}

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Stadium opening data</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Enter stadium opening data"
                />
              </Form.Group>

              {/* // ===== --- ===== ### Stadium-Seats-Input ### ===== --- ===== // */}

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Stadium seats</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter stadium total seats"
                />
              </Form.Group>

              {/* // ===== --- ===== ### Stadium-VIP-Seats-Input ### ===== --- ===== // */}

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Stadium VIP seats</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter stadium VIP seats"
                />
              </Form.Group>

              {/* // ===== --- ===== ### Stadium-VIP-Seats-Length-Input ### ===== --- ===== // */}

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Stadium VIP seats length</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter stadium VIP seats length"
                />
              </Form.Group>

              {/* // ===== --- ===== ### Stadium-VIP-Seats-Width-Input ### ===== --- ===== // */}

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Stadium VIP seats width</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter stadium VIP seats width"
                />
              </Form.Group>

              {/* // ===== --- ===== ### Stadium-Sumbit-BTN ### ===== --- ===== // */}

              <Button
                className={[Style.submitBtn, "w-100 mb-3"].join(" ")}
                style={{
                  backgroundColor: "#8b1538",
                  borderColor: "#8b1538",
                }}
                type="submit"
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
