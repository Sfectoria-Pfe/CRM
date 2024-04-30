import React, { useContext, useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import { SocketContext } from "../../apps/App";
import { useParams } from "react-router-dom";
import send from "../img/send.png"
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBIcon,
  MDBInputGroup,
  MDBCardFooter,
  MDBBtn,
} from "mdb-react-ui-kit";

export default function Chat() {
  const  socket  = useContext(SocketContext);
  const [content, setContent] = useState("");
  const { sessionId } = useParams();

  const [messages, setMessages] = useState([]);
  useEffect(() => {
    socket.emit("find-all-msgs", +sessionId);
  }, []); // request give me old msgs
  useEffect(() => {
    socket.on("get-all-msgs/" + sessionId, (data) => {
      setMessages(data);
    });
  }, []);// get old msgs
  
  useEffect(() => {
    socket.on("msg-session/" + sessionId, (data) => {
      setMessages(prev=>[...prev, data]);
    });
  }, []);// new msg when someone send a msg
 
  
  const userId = useSelector((state) => state.auth.me.id);
  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit("send-message", {
      senderId: userId,
      sessionId: +sessionId,
      content,
    });
    setContent("");
  };

  return (
    <MDBContainer fluid className="py-5" style={{ backgroundColor: "#eee" }}>
      <MDBRow className="d-flex justify-content-center">
        <MDBCol md="6" lg="6" xl="6">
          <MDBCard>
            <MDBCardHeader
              className="d-flex justify-content-between align-items-center p-3"
              style={{ borderTop: "4px solid #ffa900" }}
            >
              <h5 className="mb-0">Chat messages</h5>
              <div className="d-flex flex-row align-items-center">
                <span className="badge bg-warning me-2">20</span>
                <MDBIcon
                  fas
                  icon="minus"
                  size="sm"
                  className="me-2 text-muted"
                />
                <MDBIcon
                  fas
                  icon="comments"
                  size="sm"
                  className="me-2 text-muted"
                />
                <MDBIcon
                  fas
                  icon="times"
                  size="sm"
                  className="me-2 text-muted"
                />
              </div>
            </MDBCardHeader>
            <MDBCardBody>
              <div className="d-flex justify-content-between mb-2">
                <p className="small mb-0">Timona Siera</p>
                <p className="small mb-0 text-muted">23 Jan 2:00 pm</p>
              </div>
              <div className="d-flex flex-row justify-content-start mb-3">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava5-bg.webp"
                  alt="avatar 1"
                  style={{ width: "35px", height: "35px" }}
                  className="me-2 rounded-circle"
                />
                <div>
                  <p
                    className="small p-2 rounded-3"
                    style={{ backgroundColor: "#f5f6f7" }}
                  >
                    For what reason would it be advisable for me to think
                    about business content?
                  </p>
                </div>
              </div>

              <div className="d-flex justify-content-between mb-2">
                <p className="small mb-0 text-muted">23 Jan 2:05 pm</p>
                <p className="small mb-0">Johny Bullock</p>
              </div>
              <div className="d-flex flex-row justify-content-end mb-3">
                <div>
                  <p
                    className="small p-2 rounded-3"
                    style={{
                      backgroundColor: "#f5f6f7",
                      color: "#fff",
                      backgroundColor: "#ffc107",
                    }}
                  >
                    Thank you for your believe in our supports
                  </p>
                </div>
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                  alt="avatar 1"
                  style={{ width: "35px", height: "35px" }}
                  className="ms-2 rounded-circle"
                />
              </div>
              
              {/* Plus de messages ici */}
              
            </MDBCardBody>

            <MDBCardFooter className="text-muted d-flex justify-content-start align-items-center p-3">
              <MDBInputGroup className="mb-0">
                <input
                  className="form-control"
                  placeholder="Type message"
                  type="text"
                />
                <MDBBtn color="primary" style={{ paddingTop: ".45rem" }}>
                send
                </MDBBtn>
              </MDBInputGroup>
            </MDBCardFooter>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
