import React, { useContext } from "react";
import { FaBars } from "react-icons/fa";
import { UserContext } from "../router/Router";
import { useSelector } from "react-redux";

export default function Navbar({ isOpen, setIsOpen }) {
  // const { user } = useContext(UserContext);
  const user=useSelector(store=>store.auth.me)
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
        <p className="m-0">Welcome {user?.Employee?.nom+' '+user?.Employee?.prenom} </p>
        <img src={user.Employee?.image} alt="avatar" className="rounded-circle" style={{width:50,height:50,objectFit:"cover"}} />
       
      </div>
    </div>
  );
}