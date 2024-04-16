import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { createEmployee } from "../../store/employee";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function Addemployee() {
  const [Employee, setEmployee] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const preset_key = "f20pgg9j";
    const cloud_name = "dp6nkc5wl";
  const [image, setImage] = useState("");

  const handleFile = (event) => {
    const file = event.target.files[0];
    console.log("Fichier sélectionné :", file);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", preset_key);
    axios
      .post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        formData
      )
      .then((res) => {
        setImage(res.data.secure_url);
        setEmployee((pre) => {
          return { ...pre, image: res.data.secure_url };
        });
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue =
        name === "cin" || name === "telephone"
            ? isNaN(parseInt(value)) ? value : String(value)
            : value;

    setEmployee({ ...Employee, [name]: newValue });
};
 

  const handleAddEmployee= () => {
   
    dispatch(createEmployee(Employee))
      .then((res) => {
        if (!res.error) {
          toast.success("Votre Employee a été ajoutée avec succès !");
          setTimeout(() => {
            navigate(-1);
          }, 2000);
        } else {
          toast.error(
            "Erreur lors de l'ajout de la Employee. Veuillez réessayer."
          );
        }
      })
      .catch((error) => {
        toast.error("Erreur lors de l'ajout de la Employee. Veuillez réessayer.");
      });
  };

  return (
    <div className="form-container">
      <h2>Ajouter une Employee</h2>
      <div className="form-input">
        <input
          className="form-control"
          placeholder="cin"
          name="cin"
          onChange={handleChange}
        />
      </div>
      <div className="form-input">
        <input
          className="form-control"
          placeholder="nom"
          name="nom"
          onChange={handleChange}
        />
      </div>
      <div className="form-input">
        <input
          className="form-control"
          placeholder="prenom"
          name="prenom"
          onChange={handleChange}
        />
      </div>
      <div className="form-input">
        <input
          className="form-control"
          placeholder="adresse"
          name="adresse"
          onChange={handleChange}
        />
      </div>
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
          placeholder="Téléphone"
          name="telephone"
         
          
          onChange={handleChange}
        />
      </div>
      
      <div className="form-input">
        <input
          type="file"
          className="form-control"
          placeholder="URL de l'image"
          name="image"
          onChange={handleFile}
        />
        <br />
        <br />
        {image && <img src={image} alt="Uploaded" />}
      </div>
      {/* La date de vente sera automatiquement ajoutée */}
      <Button
      variant="warning"
      onClick={(e) => {
        e.preventDefault();
        handleAddEmployee();
      }}
      className="form-button"
      style={{ backgroundColor: 'blue' }} // Ajout de la couleur de fond bleue
    >
      Ajouter la employee
    </Button>
      <ToastContainer />
    </div>
  );
}