import React, { useContext, useEffect, useState } from "react";
import { SocketContext } from "../pages/Pages";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import send from "../../assets/img/send.png";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
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
import { Button } from "react-bootstrap";

export default function Chat({ opportunity, drawer, setCloseChat }) {
  const socket = useContext(SocketContext);
  const [content, setContent] = useState("");
  const user = useSelector((state) => state.auth.me);

  const [messages, setMessages] = useState([]);
  useEffect(() => {
    socket.emit("find-all-msgs-opportunity-client", {
      opportunityId: opportunity.id,
      clientId: user.clientId,
    });
  }, []); // request give me old msgs
  useEffect(() => {
    socket.on(
      "get-all-msgs-opportunity-client/" + opportunity.id + "/" + user.clientId,
      (data) => {
        setMessages(data);
      }
    );
  }, [socket]); // get old msgs

  useEffect(() => {
    socket.on('new-msg/'+opportunity.id+"/"+user.id, (data) => {
      setMessages((prev) => [...prev, data]);
    });
    return ()=>socket.off('new-msg/'+opportunity.id+"/"+user.id, (data) => {
      setMessages((prev) => [...prev, data]);
    });
  }, []);
   // new msg when someone send a msg

  const userId = useSelector((state) => state.auth.me?.id);
  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit("send-message", {
      senderId: user.id,
      opportunityId: +opportunity.id,
      content,
    });
    setContent("");
  };
  if (drawer)
    return (
      <div className="position-fixed col-md-6 col-12" >
        <MDBCard style={{height:550}}>
          <MDBCardHeader
            className="d-flex justify-content-between align-items-center p-3"
            style={{ borderTop: "4px solid #ffa900" }}
          >
            <h5 className="mb-0">Chat messages</h5>
            <div className="d-flex flex-row align-items-center">
              {/*  */}
              <Button variant="light" onClick={setCloseChat}>
                <MDBIcon
                  fas
                  icon="times"
                  size="sm"
                  className="me-2 text-muted"
                />
              </Button>
            </div>
          </MDBCardHeader>
          <MDBCardBody style={{ height: 500, overflowY: "scroll" }}>
            {messages.map((msg, i) => (
              <>
                <div
                  className={`d-flex justify-content-between ${
                    msg?.Sender?.isClient ? "" : "flex-row-reverse"
                  } mb-2`}
                >
                  <p className="small mb-0">
                    {msg?.Sender?.isClient
                      ? msg.Sender.Client.nom
                      : msg.Sender.Employee.nom}
                  </p>
                  <p className="small mb-0 text-muted">
                    {msg.createdAt} 23 Jan 2:00 pm
                  </p>
                </div>
                <div
                  className={`d-flex gap-2 flex-row ${
                    msg?.Sender?.isClient
                      ? "justify-content-start"
                      : " flex-row-reverse"
                  } mb-3`}
                >
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava5-bg.webp"
                    alt="avatar 1"
                    style={{ width: "35px", height: "35px" }}
                    className=" rounded-circle"
                  />
                  <div>
                    <p
                      className="small p-2 rounded-3"
                      style={{
                        backgroundColor: msg?.Sender?.isClient
                          ? "#f5f6f7"
                          : "#ffc107",
                        color: msg?.Sender?.isClient ? "" : "#fff",
                      }}
                    >
                      {msg?.content}
                    </p>
                  </div>
                </div>
              </>
            ))}

            {/* <div className="d-flex justify-content-between mb-2">
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
              </div> */}

            {/* Plus de messages ici */}
          </MDBCardBody>

          <MDBCardFooter className="text-muted d-flex justify-content-start align-items-center p-3">
            <form onSubmit={sendMessage} className="d-flex">
              {/* <MDBInputGroup className="mb-0 col d-flex"> */}
                <input
                  className="form-control  "
                  placeholder="Type message"
                  type="text"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
                <Button
                  color="primary"
                  // style={{ paddingTop: "0.45rem" }}
                  type="submit"
                  onSubmit={sendMessage}
                >
                  send
                </Button>
              {/* </MDBInputGroup> */}
            </form>
          </MDBCardFooter>
        </MDBCard>
      </div>
    );
}
