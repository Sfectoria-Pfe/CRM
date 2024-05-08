import React, { useState, useEffect } from "react";
import {
  Button,
  FormControlLabel,
  Checkbox,
  FormControl,
  Select,
  MenuItem,
  ListItemText,
  InputLabel,
  OutlinedInput,
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
    memberIds: [], // Assurez-vous que memberIds est un tableau
  });
  const [chefIdCount, setChefIdCount] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const equipe = useSelector((state) => state.employee.employees.items);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue =
      name === "chefId" || name === "nombre"
        ? isNaN(parseInt(value))
          ? ""
          : parseInt(value)
        : value;

    setEquipeState({ ...equipeState, [name]: newValue });
  };

  const handleMemberSelection = (e) => {
    const { value, checked } = e.target;
    const memberId = parseInt(value);
    
    if (checked) {
      // Ajouter l'ID du membre sélectionné
      setEquipeState((prevState) => ({
        ...prevState,
        memberIds: [...prevState.memberIds, memberId],
      }));
    } else {
      // Retirer l'ID du membre désélectionné
      setEquipeState((prevState) => ({
        ...prevState,
        memberIds: prevState.memberIds.filter((id) => id !== memberId),
      }));
    }
  };

  const handleAddEquipe = () => {
    dispatch(createEquipeCommerciale(equipeState))
      .then((res) => {
        if (!res.error) {
          toast.success("Votre Equipe a été ajoutée avec succès !");
          setTimeout(() => {
            navigate(-1);
          }, 2000);
        } else {
          toast.error(
            "Erreur lors de l'ajout de la equipe. Veuillez réessayer."
          );
        }
      })
      .catch((error) => {
        toast.error(
          "Erreur lors de l'ajout de la promotion. Veuillez réessayer."
        );
      });
  };

  return (
    <div className="form-container">
      <h2>Ajouter une equipe</h2>

      <div className="form-input">
        <textarea
          className="form-control"
          placeholder="nom_equipe"
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
          <option value={null}>Choisir Chef</option>
          {equipe.map((elem, i) => (
            elem.role === "chef" && (
              <option key={i} value={elem.id}>
                {elem.prenom} {elem.nom}
              </option>
            )
          ))}
        </select>
      </div>

      <div className="form-input">
        <FormControl component="fieldset">
          <legend>Choisir membres :</legend>
          <br />
          <Select
            style={{ width: 440, height: 30 }}
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
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
            {equipe.map((elem) => (
              elem.role === "commercial" && (
                <MenuItem key={elem.id} value={elem.id}>
                  <Checkbox
                   checked={equipeState.memberIds.includes(elem.id)}
                   onChange={handleMemberSelection}
                   value={elem.id.toString()} // Assurez-vous que la valeur est une chaîne
                   color="primary"
                  />
                  <ListItemText primary={`${elem.prenom} ${elem.nom}`} />
                </MenuItem>
              )
            ))}
          </Select>
        </FormControl>
      </div>

      <Button
        variant="warning"
        onClick={(e) => {
          e.preventDefault();
          handleAddEquipe();
        }}
        className="form-button"
        style={{ backgroundColor: "blue" }}
      >
        Ajouter la equipe
      </Button>
      <ToastContainer />
    </div>
  );
}
