import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createEmployee } from "../../store/employee";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Box } from "@mui/material";

export default function AddEmployee() {
  const [employee, setEmployee] = useState({
    cin: "",
    nom: "",
    prenom: "",
    adresse: "",
    email: "",
    telephone: "",
    role: "",
  });
  const [emailError, setEmailError] = useState("");
  const [cinError, setCinError] = useState("");
  const [telephoneError, setTelephoneError] = useState("");
  const [open, setOpen] = useState(true); // Ouvrir la popup par défaut

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
        setEmployee((prevEmployee) => {
          return { ...prevEmployee, image: res.data.secure_url };
        });
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === "cin") {
      if (value.length !== 8) {
        setCinError("Le CIN doit comporter exactement 8 chiffres.");
      } else {
        setCinError("");
      }
    } else if (name === "telephone") {
      if (value.length !== 8) {
        setTelephoneError("Le numéro de téléphone doit comporter exactement 8 chiffres.");
      } else {
        setTelephoneError("");
      }
    } else if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setEmailError("Veuillez saisir une adresse email valide.");
      } else {
        setEmailError("");
      }
    }

    setEmployee((prevEmployee) => ({ ...prevEmployee, [name]: newValue }));
  };

  const handleAddEmployee = () => {
    if (cinError || emailError || telephoneError) {
      toast.error("Veuillez corriger les erreurs dans le formulaire.");
      return;
    }

    dispatch(createEmployee(employee))
      .then((res) => {
        if (!res.error) {
          toast.success("Votre employé a été ajouté avec succès !");
          setTimeout(() => {
            navigate(-1);
          }, 2000);
        } else {
          toast.error(
            "Erreur lors de l'ajout de l'employé. Veuillez réessayer."
          );
        }
      })
      .catch((error) => {
        toast.error(
          "Erreur lors de l'ajout de l'employé. Veuillez réessayer."
        );
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Ajouter un employé</DialogTitle>
        <DialogContent>
          <Box sx={{ minWidth: 300 }}>
            <TextField
              margin="normal"
              fullWidth
              label="CIN"
              name="cin"
              onChange={handleChange}
              error={!!cinError}
              helperText={cinError}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Nom"
              name="nom"
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Prénom"
              name="prenom"
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Adresse"
              name="adresse"
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Email"
              name="email"
              onChange={handleChange}
              error={!!emailError}
              helperText={emailError}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Téléphone"
              name="telephone"
              onChange={handleChange}
              error={!!telephoneError}
              helperText={telephoneError}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Rôle</InputLabel>
              <Select
                value={employee.role}
                onChange={handleChange}
                name="role"
              >
                <MenuItem value="commercial">Commercial</MenuItem>
                <MenuItem value="chef">Chef</MenuItem>
              </Select>
            </FormControl>
            <input
              type="file"
              onChange={handleFile}
            />
            {image && <img src={image} alt="Uploaded" style={{ width: "100%", marginTop: 10 }} />}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddEmployee} variant="contained" color="primary">Ajouter</Button>
          <Button onClick={handleClose} variant="contained" color="secondary">Annuler</Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </>
  );
}
