import React, { useContext } from "react";
import { FaBars } from "react-icons/fa";
import { UserContext } from "../router/Router";

export default function Navbar({ isOpen, setIsOpen }) {
  const { user } = useContext(UserContext);
  return (
    <div
      className={`bg-navy text-white d-flex ${isOpen? "justify-content-end":"justify-content-between"} align-items-center`}
      style={{
        position: "fixed",
        width: "100%",
        paddingLeft: isOpen ? 300 : 0,
        height: 70,
      }}
    >
     <div>
     {isOpen !== true && (
        <button className="btn btn-light" onClick={() => setIsOpen(true)}>
          <FaBars />
        </button>
      )}
      </div> 
      <div className="d-flex  align-items-center gap-3">
        <p className="m-0">Welcome {user.userName}</p>
        <img src={user.imageUrl} alt="leithPhoto" className="rounded-circle" style={{width:50,height:50,objectFit:"cover"}} />
       
      </div>
    </div>
  );
}