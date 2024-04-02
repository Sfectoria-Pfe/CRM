import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOpportunites } from "../../store/opportunite";

const TestFetchOpportunites = () => {
  const dispatch = useDispatch();
  const opportunities = useSelector((state) => state.opportunite.opportunites.items);

  useEffect(() => {
    dispatch(fetchOpportunites());
  }, [dispatch]);

  return (
    <div>
      <h2>Liste des opportunités :</h2>
      <ul>
        {opportunities.map((opportunity) => (
          <li key={opportunity.id}>
          <strong>Email:</strong> {opportunity.id} <br />
            <strong>Titre:</strong> {opportunity.title} <br />
            <strong>Client:</strong> {opportunity.client} <br />
            <strong>Email:</strong> {opportunity.email} <br />
            <strong>Téléphone:</strong> {opportunity.tel} <br />
            <strong>Revenus Espérés:</strong> {opportunity.revenus_esperes} <br />
            <strong>Probabilité:</strong> {opportunity.probabilite} <br />
            <strong>Commercial:</strong> {opportunity.commercial} <br />
            <strong>Date Estimation:</strong> {opportunity.date_estimation} <br />
            <strong>Etiquette:</strong> {opportunity.etiquette} <br />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TestFetchOpportunites;
