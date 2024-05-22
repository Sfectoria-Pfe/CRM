import React, { useState, useEffect } from "react";
import {
  Button,
  FormControl,
  Select,
  MenuItem,
  ListItemText,
  OutlinedInput,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Checkbox,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { createEquipeCommerciale } from "../../store/Equipe";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchEmployees } from "../../store/employee";

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

export default function AddEquipe() {
  const [equipeState, setEquipeState] = useState({
    nom_equipe: "",
    chefId: "",
    memberIds: [],
  });
  const [open, setOpen] = useState(false); // État pour gérer l'ouverture de la fenêtre popup
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const equipe = useSelector((state) => state.employee.employees.items);

  useEffect(() => {
    dispatch(fetchEmployees());
    // Ouvrir le popup automatiquement après 1 seconde
    setTimeout(() => {
      setOpen(true);
    }, 1000);
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === "chefId" ? parseInt(value, 10) : value;
    setEquipeState({ ...equipeState, [name]: newValue });
  };

  const handleMemberSelection = (e) => {
    const { value } = e.target;
    setEquipeState((prevState) => ({
      ...prevState,
      memberIds: value,
    }));
  };

  const handleAddEquipe = () => {
    dispatch(createEquipeCommerciale(equipeState))
      .then((res) => {
        if (!res.error) {
          toast.success("Votre Equipe a été ajoutée avec succès !");
          setTimeout(() => {
            setOpen(false);
            navigate(-1);
          }, 2000);
        } else {
          toast.error("Erreur lors de l'ajout de l'équipe. Veuillez réessayer.");
        }
      })
      .catch((error) => {
        toast.error("Erreur lors de l'ajout de l'équipe. Veuillez réessayer.");
      });
  };

  return (
    <div>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Ajouter une équipe</DialogTitle>
        <DialogContent>
          <div className="form-input">
            <textarea
              className="form-control"
              placeholder="Nom de l'équipe"
              name="nom_equipe"
              required
              onChange={handleChange}
            />
          </div>
          <div className="form-input">
            <select
              className="form-control"
              name="chefId"
              required
              onChange={handleChange}
            >
              <option value="">Choisir Chef</option>
              {equipe.map(
                (elem, i) =>
                  elem.role === "chef" && (
                    <option key={i} value={elem.id}>
                      {elem.prenom} {elem.nom}
                    </option>
                  )
              )}
            </select>
          </div>
          <div className="form-input">
            <FormControl component="fieldset">
              <legend>Choisir membres :</legend>
              <Select
                style={{ width: 440, height: 30 }}
                multiple
                value={equipeState.memberIds}
                onChange={handleMemberSelection}
                input={<OutlinedInput label="Membres" />}
                renderValue={(selected) =>
                  equipe
                    .filter((elem) => selected.includes(elem.id))
                    .map((elem) => `${elem.prenom} ${elem.nom}`)
                    .join(", ")
                }
                MenuProps={MenuProps}
              >
                {equipe.map(
                  (elem) =>
                    elem.role === "commercial" && (
                      <MenuItem key={elem.id} value={elem.id}>
                        <Checkbox
                          checked={equipeState.memberIds.includes(elem.id)}
                          color="primary"
                        />
                        <ListItemText primary={`${elem.prenom} ${elem.nom}`} />
                      </MenuItem>
                    )
                )}
              </Select>
            </FormControl>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            Annuler
          </Button>
          <Button onClick={handleAddEquipe} color="primary">
            Ajouter
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </div>
  );
}
