
function GridComplexExample(){
  
    return (
      
           <div className="form">
            <h3 className="titre">inscription client</h3>
            <form>
  
  <p>nom:</p>
  <input type="text" name="nom" id="nom" placeholder="entrer votre nom" required/>
  <p>prenom:</p>
  <input type="text" name="prenom" id="prenom" placeholder="entrer votre prenom" required/>
  
  <p>adresse:</p>
  <input type="text" name="adresse" id="adresse" placeholder="entrer votre adresse" required/>
  
  <p>email:</p>
  <input type="email" name="email" id="email" placeholder="entrer votre email" required/>
  <p>telephone:</p>
  <input type="number" name="telephone" id="telephone" placeholder="entrer votre telephone" required/>
  <p>password:</p>
  <input type="password" name="password" id="password" placeholder="entrer votre password" required/>
  <br/><br/>
  <label for="sexe" required>sexe:</label>
  <select name="sexe" id="sexe">
    <option value="homme">homme</option>
    <option value="femme">femme</option>
  </select><br/><br/>
     <input type="submit" value="inscrit" />  <input type="reset" value="annuler"/>
     
            </form>
  
  
           </div>
  
        
    );
  }
  
  export default GridComplexExample;