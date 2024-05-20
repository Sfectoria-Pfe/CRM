import React, { useState, useEffect } from "react";
import { Button, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { sendOpportunite } from "../../../store/opportunite";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchEquipesCommerciales } from "../../../store/Equipe";
import { fetchServices } from "../../../store/services";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';

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

const AddOpportunite = ({ toggleModal }) => {
  const [opportunite, setOpportunite] = useState({
    serviceIds: [],
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
            toggleModal(false);
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
    <Box className="form-container" sx={{ p: 3 }}>
      <h2>Ajouter une opportunité</h2>
      <Box className="form-input" sx={{ mb: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          label="Titre"
          name="title"
          onChange={handleChange}
        />
      </Box>
      <Box className="form-input" sx={{ mb: 2 }}>
        <FormControl fullWidth variant="outlined">
          <InputLabel>Choisir Votre équipe</InputLabel>
          <Select
            name="equipeId"
            onChange={handleChange}
            label="Choisir Votre équipe"
          >
            <MenuItem value={null}>
              <em>Aucune</em>
            </MenuItem>
            {equipesCommerciales.map((elem, i) => (
              <MenuItem key={i} value={elem.id}>
                {elem.nom_equipe}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box className="form-input" sx={{ mb: 2 }}>
        <FormControl fullWidth variant="outlined">
          <InputLabel>Services</InputLabel>
          <Select
            label="Services"
            multiple
            value={opportunite.serviceIds}
            onChange={handleMemberSelection}
            input={<OutlinedInput label="Services" />}
            renderValue={(selected) =>
              selected.map((value) => services.find((service) => service.id === value)?.name).join(", ")
            }
            MenuProps={MenuProps}
          >
            {services.map((elem, i) => (
              <MenuItem key={i} value={elem.id}>
                <Checkbox checked={opportunite.serviceIds.includes(elem.id)} />
                <ListItemText primary={elem.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <div className="d-flex justify-content-end" style={{ marginTop: '16px' }}>
        <Button variant="secondary" onClick={() => toggleModal(false)} className="me-2">
          Annuler
        </Button>
        <Button variant="primary" onClick={handleAddOpportunite}>
          Ajouter l'opportunité
        </Button>
      </div>
      <ToastContainer />
    </Box>
  );
};

export default AddOpportunite;
