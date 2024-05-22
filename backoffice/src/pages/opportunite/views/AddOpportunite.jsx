import React, { useState, useEffect } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
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
import FormControl from '@mui/material/FormControl';



const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const AddOpportunite = ({ onSuccess }) => {
  const [opportunite, setOpportunite] = useState({
    serviceIds: [],
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const equipesCommerciales = useSelector((state) => state.Equipe.equipesCommerciales.items);
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
            onSuccess();
          }, 2000);
        } else {
          toast.error("Erreur lors de l'ajout de l'opportunité. Veuillez réessayer.");
        }
      })
      .catch(() => {
        toast.error("Erreur lors de l'ajout de l'opportunité. Veuillez réessayer.");
      });
  };

  return (
    <Container className="form-container mt-4">
      <h2 className="text-center mb-4">Ajouter une opportunité</h2>
      <Form>
        <Form.Group as={Row} className="mb-3" controlId="formTitle">
          <Form.Label column sm="3">Titre</Form.Label>
          <Col sm="9">
            <Form.Control
              type="text"
              placeholder="Titre"
              name="title"
              onChange={handleChange}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formEquipe">
          <Form.Label column sm="3">Équipe</Form.Label>
          <Col sm="9">
            <Form.Control
              as="select"
              name="equipeId"
              required
              onChange={handleChange}
            >
              <option value={null}>Choisir votre équipe</option>
              {equipesCommerciales.map((elem, i) => (
                <option key={i} value={elem.id}>
                  {elem.nom_equipe}
                </option>
              ))}
            </Form.Control>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formServices">
          <Form.Label column sm="3">Services</Form.Label>
          <Col sm="9">
            <FormControl>
              <Select
                style={{ width: "100%" }}
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
                    <Checkbox checked={opportunite.serviceIds.includes(elem.id)} color="primary" />
                    <ListItemText primary={elem.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Col>
        </Form.Group>
        <div className="text-center">
          <Button variant="primary" onClick={handleAddOpportunite}>
            Ajouter l'opportunité
          </Button>
        </div>
      </Form>
      <ToastContainer />
    </Container>
  );
};

export default AddOpportunite;
