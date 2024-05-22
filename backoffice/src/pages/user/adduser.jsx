import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { sendUser } from "../../store/user";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Form from "react-bootstrap/Form";
import { fetchClients, fetchClientsWithoutAccount } from "../../store/client";
import { fetchEmployees, fetchemployeesWithoutAccount } from "../../store/employee";
export default function Adduser() {
  const employees = useSelector((state) => state.employee.employees.items);
  const clients = useSelector((state) => state.client.clients.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
    isClient: false,
    employeeId: null,
    clientId: null,
  });
  const [data, setData] = useState([]);
  useEffect(() => {
    dispatch(fetchClientsWithoutAccount());
    dispatch(fetchemployeesWithoutAccount());
  }, [dispatch]);
  useEffect(() => {
    if (user.isClient) setData(clients);
    else setData(employees);
  }, [user.isClient, employees, clients]);

  const handleChangeSelect = (e) => {
    if (user.isClient) {
      setUser({ ...user, clientId: +e.target.value });
    } else {
      setUser({ ...user, employeeId: +e.target.value });
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const toggleIsClient = () => {
    setUser({ ...user, isClient: !user.isClient });
  };
  
  const handleAddUser = () => {
   dispatch(sendUser(user))
      .then((res) => {
        if (!res.error) {
          toast.success("Votre utilisateur a été ajouté avec succès !");
          setTimeout(() => {
            navigate(1);
          }, 2000);
        } else {
          toast.error(
            "Erreur lors de l'ajout de l'utilisateur. Veuillez réessayer."
          );
        }
      })
      .catch((error) => {
        toast.error(
          "Erreur lors de l'ajout de l'utilisateur. Veuillez réessayer."
        );
      });
  };

  return (
    <div className="form-container">
      <h2>Ajouter une utilisateur</h2>
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
          placeholder="password"
          name="password"
          onChange={handleChange}
        />
      </div>
      <div className="form-input">
        <div className="d-flex gap-2">
          <Form.Label>Employee</Form.Label>
          <Form.Check // prettier-ignore
            type="switch"
            id="custom-switch"
            value={user.isClient}
            onChange={()=>{toggleIsClient()}}
          />
          <Form.Label>Client</Form.Label>
        </div>
        {/* <Button
          variant={user.isClient ? "success" : "danger"}
          onClick={toggleIsClient}
          style={{ width: "100%" }}
        >
          {user.isClient ? "Client" : "Non Client"}
        </Button> */}
      </div>
      <Form.Select required onChange={handleChangeSelect}>
        <option value={null}>
          Choisie nom du votre {user.isClient ? "Client" : "Employee"}{" "}
        </option>
        {data.map((elem, i) => (
          <option value={elem.id}>
            {elem.nom} {elem.prenom}
          </option>
        ))}
      </Form.Select>
      {/* <div className="form-input">
        <input
          className="form-control"
          placeholder="employeeId"
          name="employeeId"
          onChange={handleChange}
        />
      </div>
      <div className="form-input">
        <input
          className="form-control"
          placeholder="clientId"
          name="clientId"
          onChange={handleChange}
        />
      </div> */}
      <Button
        variant="warning"
        onClick={(e) => {
          e.preventDefault();
          handleAddUser();
        }}
        className="form-button"
        style={{ backgroundColor: "#1976D2",color:"#ffffff" }}
      >
        Ajouter l'utilisateur
      </Button>
      <ToastContainer />
    </div>
  );
}
