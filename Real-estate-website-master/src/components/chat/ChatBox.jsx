import React, { useContext, useEffect, useState } from "react";
import { SocketContext } from "../pages/Pages";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import send from "../../assets/img/send.png";

export default function Chat({ opportunity, drawer, setCloseChat }) {
  const socket = useContext(SocketContext);
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
  }, []); // get old msgs

  useEffect(() => {
    socket.on("msg-session/" + sessionId, (data) => {
      setMessages((prev) => [...prev, data]);
    });
  }, []); // new msg when someone send a msg

  const userId = useSelector((state) => state.auth.me?.id);
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
    <div
      className="col-md-4 col-12"
      style={{ backgroundColor: "#daeaf0", borderRadius: "10px" }}
    >
      {opportunity === 0 ? (
        <div className="w-100">
          <p>select one</p>
        </div>
      ) : (
        <>
          <div className="d-flex justify-content-between p-2">
            <h2>{opportunity?.title}</h2>
            {drawer && (
              <div>
                <button className="btn-light btn" onClick={setCloseChat}>
                  X
                </button>
              </div>
            )}
          </div>
          <section
            style={{
              backgroundColor: "#daeaf0",
              borderRadius: "10px",
              width: "100%",
              height: "550px", // Set your desired height here
              overflowY: "auto",
              display: "flex", // Add display: flex to the parent container
              flexDirection: "column-reverse",
            }}
          >
            <div class=" d-flex justify-content-center align-items-center ">
              <div class="col-8">
                <ul class="list-unstyled ">
                  {messages?.map((elem, i) => (
                    <div
                      class={`d-flex  mb-4 w-100 ${
                        elem.senderId === userId ? "justify-content-end" : ""
                      }`}
                      key={i}
                    >
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                        alt="avatar"
                        class="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
                        width="60"
                      />
                      <div class="card d-flex justify-content-between">
                        <div class="card-header d-flex justify-content-between p-3">
                          <p class="fw-bold mb-0">
                            {elem?.sender.firstName +
                              " " +
                              elem?.sender.lastName}
                          </p>
                          <p class=" d-flex gap-2 text-muted small mb-0">
                            <i class="far fa-clock py-1"></i>{" "}
                            {/* <ConversionDate
                            dateString={elem.createdAt}
                            includeHour={true}
                          /> */}
                          </p>
                        </div>
                        <div class="card-body">
                          <p class="mb-0">{elem?.content}</p>
                        </div>
                        {userId === elem.senderId && (
                          <div className="d-flex justify-content-end">
                            <IconButton color="error" aria-label="delete">
                              <DeleteIcon
                                onClick={() => {
                                  // handelDelete(elem.id)
                                }}
                              />
                            </IconButton>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  <form
                    onSubmit={sendMessage}
                    className="d-flex justify-content-center align-items-center gap-3"
                  >
                    {" "}
                    <input
                      required
                      value={content}
                      class="form-control "
                      id="textAreaExample3"
                      rows="1"
                      onChange={(e) => {
                        console.log(e.target.value);
                        setContent(e.target.value);
                      }}
                      style={{
                        borderRadius: "200px",
                        // textAlign: "center",
                        padding: "10px",
                      }}
                    ></input>
                    <button
                      style={{ all: "unset", cursor: "pointer" }}
                      type="submit"
                      onSubmit={sendMessage}
                    >
                      <img alt="" src={send} style={{ width: 50, heigh: 50 }} />
                    </button>
                  </form>
                </ul>

                <div></div>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
