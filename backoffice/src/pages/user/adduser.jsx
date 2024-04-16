import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { sendUser } from "../../store/user";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function Adduser() {
  const [User, setUser] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

 

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue =
        name === "employeeId" || name === "clientId"
            ? isNaN(parseInt(value)) ? value : parseInt(value)
            : value;

    setUser({ ...User, [name]: newValue });
};

  const handleAddUser= () => {
   
    dispatch(sendUser(User))
      .then((res) => {
        if (!res.error) {
          toast.success("Votre User a été ajoutée avec succès !");
          setTimeout(() => {
            navigate(-1);
          }, 2000);
        } else {
          toast.error(
            "Erreur lors de l'ajout de la User. Veuillez réessayer."
          );
        }
      })
      .catch((error) => {
        toast.error("Erreur lors de l'ajout de la User. Veuillez réessayer.");
      });
  };

  return (
    <div className="form-container">
      <h2>Ajouter une User</h2>
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
        <input
          className="form-control"
          placeholder="isClient"
          name="isClient"
          onChange={handleChange}
        />
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
      {/* La date de vente sera automatiquement ajoutée */}
      <Button
      variant="warning"
      onClick={(e) => {
        e.preventDefault();
        handleAddUser();
      }}
      className="form-button"
      style={{ backgroundColor: 'blue' }} // Ajout de la couleur de fond bleue
    >
      Ajouter la User
    </Button>
      <ToastContainer />
    </div>
  );
}