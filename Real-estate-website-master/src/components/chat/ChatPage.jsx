import React, { useState } from "react";
import Chat from "./ChatBox";

export default function ChatPage() {
  const [opportunity, setOpportunity] = useState(0);
  return (
    <div>
      <div></div>
      <div className="d-flex justify-content-center">
        <div className="col-4">
          <div >
            <img src="/" alt="" />
            <h3>pack backbridge</h3>
          </div>
          <div>
            <img src="/" alt="" />
            <h3>pack backbridge</h3>
          </div>
          <div>
            <img src="/" alt="" />
            <h3>pack backbridge</h3>
          </div>
          <div>
            <img src="/" alt="" />
            <h3>pack backbridge</h3>
          </div>
        </div>
        <div className="col">
          <Chat opportunity={opportunity} />
        </div>
      </div>
    </div>
  );
}
