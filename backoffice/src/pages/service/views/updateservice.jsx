import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { updateService } from "../../../store/services";
import axios from "axios";
import "./stylees.css"; // Importez le fichier CSS

function UpdateServicePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [updateData, setUpdateData] = useState({
    name: "",
    description: "",
    type: "",
    price: "",
    imageURL: "",
  });

  const preset_key = "f20pgg9j";
  const cloud_name = "dp6nkc5wl";
  const [image, setImage] = useState("");

  const handleFile = (event) => {
    const file = event.target.files[0];
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
        setUpdateData((prevService) => ({
          ...prevService,
          imageURL: res.data.secure_url,
        }));
      })
      .catch((err) => console.log(err));
  };

  const handleUpdateService = async (e) => {
    e.preventDefault();
    if (!updateData.name || !updateData.description || !updateData.type || !updateData.price || !updateData.imageURL) {
      console.error("Veuillez remplir tous les champs.");
      return;
    }
    try {
      const updatedData = {
        ...updateData,
        price: parseFloat(updateData.price)
      };
      await dispatch(updateService({ id: parseInt(id), body: updatedData }));
      navigate(-1);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du service :", error);
    }
  };

  return (
    <div className="update-service-container">
      <h2 style={{ fontSize: "28px", color: "blue" }}>Modifier le service</h2>
      <form onSubmit={handleUpdateService}>
        <div>
          <label className="update-service-label">Nom:</label>
          <input className="update-service-input" type="text" value={updateData.name} onChange={(e) => setUpdateData({ ...updateData, name: e.target.value })} />
        </div>
        <div>
          <label className="update-service-label">Description:</label>
          <input className="update-service-input" type="text" value={updateData.description} onChange={(e) => setUpdateData({ ...updateData, description: e.target.value })} />
        </div>
        <div>
          <label className="update-service-label">Type:</label>
          <input className="update-service-input" value={updateData.type} onChange={(e) => setUpdateData({ ...updateData, type: e.target.value })} />
        </div>
        <div>
          <label className="update-service-label">Prix:</label>
          <input className="update-service-input" type="number" value={updateData.price} onChange={(e) => setUpdateData({ ...updateData, price: e.target.value })} />
        </div>
        <div className="update-service-input">
          <input type="file" className="form-control" name="image" onChange={handleFile} />
        </div>
        <button className="update-service-submit-button" type="submit">Mettre à jour</button>
      </form>
    </div>
  );
}

export default UpdateServicePage;
