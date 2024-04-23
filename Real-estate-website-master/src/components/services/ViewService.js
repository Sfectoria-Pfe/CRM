import { faFacebookMessenger } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Chat from "../chat/ChatBox";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ViewService() {
  const { serviceId } = useParams();
  const [openChat, setOpenChat] = useState(false);
  const [pack, setPack] = useState(null);

  useEffect(() => {
    const fetchPack = async () => {
      try {
        const response = await axios.get(
          "http://localhost:7000/opportunites/" + serviceId
        );
        setPack(response.data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchPack();
  }, [serviceId]);

  return (
    <div>
      View SERvice
      {/* pack details with servives */}
      <Button
        style={{ width: 50, height: 50, borderRadius: "50%" }}
        variant="primary"
        onClick={() => {
          setOpenChat(true);
        }}
      >
        <FontAwesomeIcon icon={faFacebookMessenger} />
      </Button>
      {openChat && (
        <div className="d-flex justify-content-end position-fixed w-100 ">
          <Chat
            opportunity={pack}
            setCloseChat={() => setOpenChat(false)}
            drawer={true}
          />
        </div>
      )}
    </div>
  );
}
