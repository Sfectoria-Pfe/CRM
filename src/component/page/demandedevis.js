import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function  Demande_devis() {
  return (
   <div className='demande'>
 <>
    <h1>Demande Devis</h1>
      <FloatingLabel
        controlId="floatingInput"
        label=""
        className="mb-3"
      >
        <FloatingLabel controlId="floatingInput" label="votre nom">
        <Form.Control type="text" placeholder="votre nom" /><br />
        <FloatingLabel controlId="floatingInput" label="numero de telephone">
        <Form.Control type="number" placeholder="numero de telephone" />
      </FloatingLabel><br />
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingInput"
        label="adresse email"
        className="mb-3"
      >
        <Form.Control type="email" placeholder="name@example.com" />
      </FloatingLabel>
      </FloatingLabel>
      
     
      <FloatingLabel
        controlId="floatingTextarea"
        label="sujet"
        className="mb-3"
      >
        <Form.Control as="textarea" placeholder="sujet" />
      </FloatingLabel><br />
      
      <FloatingLabel controlId="floatingTextarea2" label="decrivez votre besoin">
        <Form.Control
          as="textarea"
          placeholder="decrivez votre besoin"
          style={{ height: '100px' }}
        />
      </FloatingLabel><br />
      <Button variant="primary">envoyer</Button>{' '}
    </>


   </div>

  );
}

export default Demande_devis;