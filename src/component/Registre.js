import React from 'react';

function RegistrationForm() {
  return (
    <div className="form">
      <h3 className="titre">Inscription client</h3>
      <form>
        <p>Nom:</p>
        <input type="text" name="nom" id="nom" placeholder="Entrer votre nom" required />
        <p>Prénom:</p>
        <input type="text" name="prenom" id="prenom" placeholder="Entrer votre prénom" required />
        <p>Adresse:</p>
        <input type="text" name="adresse" id="adresse" placeholder="Entrer votre adresse" required />
        <p>Email:</p>
        <input type="email" name="email" id="email" placeholder="Entrer votre email" required />
        <p>Téléphone:</p>
        <input type="number" name="telephone" id="telephone" placeholder="Entrer votre téléphone" required />
        <p>Mot de passe:</p>
        <input type="password" name="password" id="password" placeholder="Entrer votre mot de passe" required />
        <br/><br/>
        <label htmlFor="sexe" required>Sexe:</label>
        <select name="sexe" id="sexe">
          <option value="homme">Homme</option>
          <option value="femme">Femme</option>
        </select>
        <br/><br/>
        <input type="submit" value="S'inscrire" />
        <input type="reset" value="Annuler" />
      </form>
    </div>
  );
}

export default RegistrationForm;
