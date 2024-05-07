import React, { useState, useEffect } from "react";
import { Button, FormSelect } from "react-bootstrap"; // Importez FormSelect depuis react-bootstrap
import { useDispatch, useSelector } from "react-redux"; // Importez useSelector
import { sendServiceDetail } from "../../../store/serviceDetails";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { fetchServices } from "../../../store/services";

export default function AddServiceDetail() {
  const [serviceDetail, setServiceDetail] = useState({
    title: "",
    description: "",
    address: "",
    price: 0,
    imageURL: "",
    serviceId: null, // Initialisez serviceId à null
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const services = useSelector((state) => state.service.services.items);

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

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
        setServiceDetail((prevServiceDetail) => ({
          ...prevServiceDetail,
          imageURL: res.data.secure_url,
        }));
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === "price" || name === "serviceId" ? parseInt(value) : value; // Convertissez price et serviceId en nombre entier

    setServiceDetail({ ...serviceDetail, [name]: newValue });
  };

  const handleAddServiceDetail = () => {
    dispatch(sendServiceDetail(serviceDetail))
      .then((res) => {
        if (!res.error) {
          toast.success("Le détail de service a été ajouté avec succès !");
          setTimeout(() => {
            navigate(0);
          }, 2000); // Redirige après 2 secondes
        } else {
          toast.error("Erreur lors de l'ajout du détail de service. Veuillez réessayer.");
        }
      })
      .catch((error) => {
        toast.error("Erreur lors de l'ajout du détail de service. Veuillez réessayer.");
      });
  };

  return (
    <div className="form-container">
      <h2>Ajouter un détail de service</h2>
      <div className="form-input">
        <input
          className="form-control"
          placeholder="Titre"
          name="title"
          onChange={handleChange}
        />
      </div>
      <div className="form-input">
        <input
          className="form-control"
          placeholder="Description"
          name="description"
          onChange={handleChange}
        />
      </div>
      <div className="form-input">
        <input
          className="form-control"
          placeholder="Adresse"
          name="address"
          onChange={handleChange}
        />
      </div>
      <div className="form-input">
        <input
          className="form-control"
          placeholder="Prix"
          name="price"
          type="number"
          min={0}
          onChange={handleChange}
        />
      </div>
      <div className="form-input">
        {/* Supprimez l'input serviceId pour éviter la duplication */}
        <FormSelect name="serviceId" required onChange={handleChange}>
          <option value={null}>Choisissez le service</option>
          {services.map((elem, i) => (
            <option key={i} value={elem.id}>{elem.name}</option>
          ))}
        </FormSelect>
      </div>
      <div className="form-input">
        <input
          type="file"
          className="form-control"
          name="imageURL"
          onChange={handleFile}
        />
      </div>
      <Button variant="warning" onClick={handleAddServiceDetail} className="form-button">
        Ajouter le détail de service
      </Button>
      <ToastContainer />
    </div>
  );
}
