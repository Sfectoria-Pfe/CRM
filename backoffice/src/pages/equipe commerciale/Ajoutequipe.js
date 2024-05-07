import React, { useState } from "react";
import { Button, FormControlLabel, Checkbox , FormControl} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { createEquipeCommerciale } from "../../store/Equipe";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { fetchEmployees } from "../../store/employee";
import { useEffect } from "react";

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
            <option key={i} value={elem.id}>
              {elem.prenom} {elem.nom}
            </option>
          ))}
        </select>
      </div>

      <div className="form-input">
  <FormControl component="fieldset">
    <legend>Choisir membres :</legend>
    {equipe.map((elem, i) => (
      <FormControlLabel
        key={i}
        control={
          <Checkbox
            checked={equipeState.memberIds.includes(elem.id)}
            onChange={handleMemberSelection}
            value={elem.id.toString()} // Assurez-vous que la valeur est une chaîne
            color="primary"
          />
        }
        label={`${elem.prenom} ${elem.nom}`}
      />
    ))}
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
