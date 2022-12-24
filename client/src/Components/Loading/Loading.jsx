// ===== --- ===== ### React ### ===== --- ===== //
import React from "react";

// ===== --- ===== ### React-Bootstrap ### ===== --- ===== //
import Spinner from "react-bootstrap/Spinner";

// ===== --- ===== ### Loading-Component ### ===== --- ===== //
function Loading(props) {
  return (
    <div
      className={[
        "d-flex justify-content-center align-items-center",
        props?.height,
      ].join(" ")}
    >
      {/* <Spinner animation="grow" variant="primary" /> */}
      {/* <Spinner animation="grow" variant="secondary" /> */}
      {/* <Spinner animation="grow" variant="success" /> */}

      <Spinner animation="grow" variant="danger" />
      <Spinner animation="grow" variant="warning" />
      <Spinner animation="grow" variant="success" />

      {/* <Spinner animation="grow" variant="info" /> */}
      {/* <Spinner animation="grow" variant="light" /> */}
      {/* <Spinner animation="grow" variant="dark" /> */}
    </div>
  );
}

export default Loading;
