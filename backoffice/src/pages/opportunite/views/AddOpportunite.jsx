import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { sendOpportunite } from "../../../store/opportunite";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchEquipesCommerciales } from "../../../store/Equipe";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchServices } from "../../../store/services";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 220,
    },
  },
};

const AddOpportunite = () => {
  const [opportunite, setOpportunite] = useState({
    serviceIds: [], // Mettre à jour pour inclure un tableau vide
  }); 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const equipesCommerciales = useSelector(
    (state) => state.Equipe.equipesCommerciales.items
  );
  const services = useSelector((state) => state.service.services.items);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue;
    if (name === "equipeId") {
      newValue = parseInt(value);
    } else if (name === "serviceIds") {
       const selectedOptions = Array.from(e.target.selectedOptions, (option) => parseInt(option.value));
      newValue = selectedOptions;
    } else {
      newValue = value;
    }
  
    setOpportunite({ ...opportunite, [name]: newValue });
  };
  const handleMemberSelection = (e) => {
    const { value } = e.target;

    setOpportunite((prevState) => ({
      ...prevState,
      serviceIds: value,
    }));
  };
  useEffect(() => {
    dispatch(fetchEquipesCommerciales());
    dispatch(fetchServices());
  }, [dispatch]);

  const handleAddOpportunite = () => {
    dispatch(sendOpportunite(opportunite))
      .then((res) => {
        if (!res.error) {
          toast.success("L'opportunité a été ajoutée avec succès !");
          setTimeout(() => {
            navigate(-1);
          }, 2000);
        } else {
          toast.error("Erreur lors de l'ajout de l'opportunité. Veuillez réessayer.");
        }
      })
      .catch((error) => {
        toast.error("Erreur lors de l'ajout de l'opportunité. Veuillez réessayer.");
      });
  };

  return (
    <div className="form-container">
      <h2>Ajouter une opportunité</h2>
      <div className="form-input">
        <input
          className="form-control"
          placeholder="Titre"
          name="title"
          onChange={handleChange}
        />
      </div>
      <div className="form-input">
        <select
          className="form-control"
          name="equipeId"
          required
          onChange={handleChange}
        >
          <option value={null}>Choisir Votre equipe</option>
          {equipesCommerciales.map(
            (elem, i) =>
              <option key={i} value={elem.id}>
                {elem.nom_equipe}
              </option>
          )}
        </select>
        <div className="form-input">
          <FormControl>
            <Select
              style={{ width: 440, height: 30 }}
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={opportunite.serviceIds}
              onChange={handleMemberSelection}
              input={<OutlinedInput label="Services" />}
              renderValue={(selected) =>
                selected
                  .map((value) => services.find((service) => service.id === value)?.name)
                  .join(", ")
              }
              MenuProps={MenuProps}
            >
              {services.map((elem, i) => (
                <MenuItem key={i} value={elem.id}>
                  <Checkbox
                    checked={opportunite.serviceIds.includes(elem.id)}
                    color="primary"
                  />
                  <ListItemText primary={elem.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
      <Button variant="warning" onClick={handleAddOpportunite} className="form-button">
        Ajouter l'opportunité
      </Button>
      <ToastContainer />
    </div>
  );
};

export default AddOpportunite;
