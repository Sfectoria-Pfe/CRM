import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { sendUser } from "../../store/user";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Adduser() {
  const [user, setUser] = useState({
    email: "",
    password: "",
    isClient: false,
    employeeId: "",
    clientId: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const toggleIsClient = () => {
    setUser({ ...user, isClient: !user.isClient });
  };

  const handleAddUser = () => {
    dispatch(sendUser(user))
      .then((res) => {
        if (!res.error) {
          toast.success("Votre utilisateur a été ajouté avec succès !");
          setTimeout(() => {
            navigate(-1);
          }, 2000);
        } else {
          toast.error("Erreur lors de l'ajout de l'utilisateur. Veuillez réessayer.");
        }
      })
      .catch((error) => {
        toast.error("Erreur lors de l'ajout de l'utilisateur. Veuillez réessayer.");
      });
  };

  return (
    <div className="form-container">
      <h2>Ajouter une utilisateur</h2>
      <div className="form-input">
        <input
          className="form-control"
          placeholder="email"
          name="email"
          onChange={handleChange}
        />
      </div>
      <div className="form-input">
        <input
          className="form-control"
          placeholder="password"
          name="password"
          onChange={handleChange}
        />
      </div>
      <div className="form-input">
        <Button
          variant={user.isClient ? "success" : "danger"}
          onClick={toggleIsClient}
          style={{ width: "100%" }}
        >
          {user.isClient ? "Client" : "Non Client"}
        </Button>
      </div>
      <div className="form-input">
        <input
          className="form-control"
          placeholder="employeeId"
          name="employeeId"
          onChange={handleChange}
        />
      </div>
      <div className="form-input">
        <input
          className="form-control"
          placeholder="clientId"
          name="clientId"
          onChange={handleChange}
        />
      </div>
      <Button
        variant="warning"
        onClick={(e) => {
          e.preventDefault();
          handleAddUser();
        }}
        className="form-button"
        style={{ backgroundColor: "blue" }}
      >
        Ajouter l'utilisateur
      </Button>
      <ToastContainer />
    </div>
  );
}
