import React from 'react';

function Demanderendezvous() {
  return (
    <div className="form-container">
      <h1>Demande rendez-vous en ligne</h1>
      <form>
        <input className="form-control" type="text" placeholder="Entrez votre nom"/><br/>
        <input className="form-control" type="number" placeholder="Entrez votre téléphone"/><br/>
        <input className="form-control" type="email" placeholder="Entrez votre email"/><br/>
        <label>
          Veuillez saisir votre date:
          <input className="form-control" type="date"/>
        </label><br/>
        <label htmlFor="appt-time">Veuillez choisir une heure de rendez-vous :</label>
        <input className="form-control" type="time"/><br/>
        <div>
          <p>Êtes-vous un nouveau client:</p>
          <input type="radio" id="contactChoice1" name="contact" value="oui" />
          <label htmlFor="contactChoice1">oui</label>
          <input type="radio" id="contactChoice2" name="contact" value="non" />
          <label htmlFor="contactChoice2">non</label>
        </div>
        <label>Commentaires:</label>
        <textarea className="form-control" name="textarea" rows="5" cols="40">Vous pouvez écrire ici.</textarea><br/>
        <button className="custom-button">Envoyer</button>
      </form>
    </div>
  );
}

export default Demanderendezvous;
