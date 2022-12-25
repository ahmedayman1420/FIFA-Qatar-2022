// ===== --- ===== ### React ### ===== --- ===== //
import React, { useEffect, useState } from "react";

// ===== --- ===== ### React-Bootstrap ### ===== --- ===== //
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

// ===== --- ===== ### Images ### ===== --- ===== //
import rm from "../../Images/rm.jpg";

// ===== --- ===== ### UserAuthority-Component-Style ### ===== --- ===== //
import Style from "./UserAuthority.module.scss";

// ===== --- ===== ### Users-Actions ### ===== --- ===== //
import { GetAllUsersAction } from "../../Redux/Actions/UserAction";

// ===== --- ===== ### External-Components ### ===== --- ===== //
import Loading from "../../Components/Loading/Loading";

// ===== --- ===== ### React-Redux ### ===== --- ===== //
import { useDispatch, useSelector } from "react-redux";

// ===== --- ===== ### UserAuthority-Component ### ===== --- ===== //
function UserAuthority() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const error = useSelector((state) => state.error);

  // ===== --- ===== ### Component-States ### ===== --- ===== //
  let [waiting, setWaiting] = useState();
  const [show, setShow] = useState(false);

  // ===== --- ===== ### Component-Functions ### ===== --- ===== //
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getAllUser = async () => {
    if (users.length === 0) {
      setWaiting(true);
      let token = localStorage.getItem("token");
      const res = await dispatch(GetAllUsersAction(token));
      setWaiting(false);
    }
  };

  const handleApproveUser = async (id, index) => {};

  useEffect(() => {
    setWaiting(true);
    getAllUser();
    setWaiting(false);
  }, []);

  // ===== --- ===== ### Component-JSX ### ===== --- ===== //
  return (
    <>
      {!waiting ? (
        <div className="mt-5">
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
            className="p-2"
            style={{
              backgroundColor: "#8b1538",
              borderRadius: "20px",
            }}
          >
            <Table
              striped
              bordered
              hover
              size="sm"
              style={{
                backgroundColor: "#fff",
                borderRadius: "20px",
                borderColor: "#8b1538",
                margin: "0px",
              }}
            >
              <thead>
                <tr>
                  <th>#</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Gender</th>
                  <th>Nationality</th>
                  <th>Role</th>
                  <th>Approve User</th>
                  <th>Delete User</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => {
                  return (
                    <tr key={user._id}>
                      <td>{index + 1}</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.gender}</td>
                      <td>{user.nationality}</td>
                      <td>{user.role}</td>
                      <td>
                        {user.role === "manager" ? (
                          <Button variant="success" className="w-100">
                            Approved
                          </Button>
                        ) : (
                          <Button
                            variant="secondary"
                            className="w-100"
                            onClick={() => {
                              handleApproveUser(user._id);
                            }}
                          >
                            Approve
                          </Button>
                        )}
                      </td>
                      <td>
                        <Button
                          variant="danger"
                          className="w-100"
                          onClick={handleShow}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Container>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Delete User</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure ?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="danger" onClick={handleClose}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      ) : (
        <Loading height={"vh-100"} />
      )}
    </>
  );
}

export default UserAuthority;
