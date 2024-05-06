import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import InvoiceItem from "./InvoiceItem";
import InvoiceModal from "./InvoiceModal";
import InputGroup from "react-bootstrap/InputGroup";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { sendDevi } from "../../store/devis"; // Assurez-vous que le nom du fichier est correct
import { fetchClients } from "../../store/client";
import {
  Autocomplete,
  Box,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from "@mui/material";

function InvoiceForm() {
  const clients = useSelector((state) => state.client.clients.items);
  const [isOpen, setIsOpen] = useState(false);
  const [currency, setCurrency] = useState("$");
  const [currentDate, setCurrentDate] = useState(
    new Date().toLocaleDateString()
  );
  const [invoiceNumber, setInvoiceNumber] = useState(1);
  const [dateOfIssue, setDateOfIssue] = useState("");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [adresse, setAdresse] = useState("");
  const [nom_entreprise, setNomEntreprise] = useState("");
  const [email_entreprise, setEmailEntreprise] = useState("");
  const [adresse_entreprise, setAdresseEntreprise] = useState("");
  const [telephone_entreprise, setTelephoneEntreprise] = useState("");
  const [notes, setNotes] = useState("");
  const [total, setTotal] = useState("0.00");
  const [subTotal, setSubTotal] = useState("0.00");
  const [taxRate, setTaxRate] = useState("");
  const [taxAmount, setTaxAmount] = useState("0.00");
  const [discountRate, setDiscountRate] = useState("");
  const [discountAmount, setDiscountAmount] = useState("0.00");
  const [clientId, setClientId] = useState("0");
  const [items, setItems] = useState([
   
  ]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [client, setClient] = useState({});
  const [openClients, setOpenClients] = useState(false);
  const [loadingClient, setLoadingClients] = useState(false);
  const [typingFullName, setTypingFullName] = useState("");

  useEffect(() => {
    handleCalculateTotal();
  }, [items, taxRate, discountRate]);
  useEffect(() => {
    setLoadingClients(true);
    dispatch(
      fetchClients({ fullNameEn: typingFullName, skip: 0, take: 5 })
    ).then((res) => setLoadingClients(false));
  }, [dispatch, typingFullName]);

  const handleAddDevis = () => {
    dispatch(
      sendDevi({
        currentDate,
        dateOfIssue,
        invoiceNumber,
        clientId:client?.id,
        notes,
        currency,
        subTotal:+subTotal,
        taxAmount:+taxAmount,
        taxRate:+taxRate,
        discountAmount:+discountAmount,
        discountRate:+discountRate,
        total:+total,
        items,
      })
    )
      .then((res) => {
        if (!res.error) {
          toast.success("Le devis a été ajouté avec succès !");
          setTimeout(() => {
            navigate(-1);
          }, 2000);
        } else {
          toast.error("Erreur lors de l'ajout du devis. Veuillez réessayer.");
        }
      })
      .catch(() => {
        toast.error("Erreur lors de l'ajout du devis. Veuillez réessayer.");
      });
  };

  const handleRowDel = (item) => {
    const updatedItems = items.filter((i) => i.id !== item.id);
    setItems(updatedItems);
    handleCalculateTotal();
  };

  const handleAddEvent = () => {
    const id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    const newItem = {
      id: id,
      name: "",
      price: "1.00",
      description: "",
      quantity: 1,
    };
    const updatedItems = [...items, newItem];
    setItems(updatedItems);
    handleCalculateTotal();
  };

  const handleCalculateTotal = () => {
    let subTotal = 0;

    items.forEach((item) => {
      subTotal += parseFloat(item.price) * parseInt(item.quantity);
    });

    const subTotalFixed = subTotal.toFixed(2);
    const taxAmount = (subTotal * (taxRate / 100)).toFixed(2);
    const discountAmount = (subTotal * (discountRate / 100)).toFixed(2);
    const total = (subTotal - discountAmount + parseFloat(taxAmount)).toFixed(
      2
    );

    setSubTotal(subTotalFixed);
    setTaxAmount(taxAmount);
    setDiscountAmount(discountAmount);
    setTotal(total);
  };

  const onItemizedItemEdit = (evt) => {
    const { id, name, value } = evt.target;
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, [name]: value };
      }
      return item;
    });

    setItems(updatedItems);
    handleCalculateTotal();
  };

  const editField = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "nom":
        setNom(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "adresse":
        setAdresse(value);
        break;
      case "clientId":
        setClientId(value);
        break;
      case "nom_entreprise":
        setNomEntreprise(value);
        break;
      case "email_entreprise":
        setEmailEntreprise(value);
        break;
      case "adresse_entreprise":
        setAdresseEntreprise(value);
        break;
      case "telephone_entreprise":
        setTelephoneEntreprise(value);
        break;
      case "notes":
        setNotes(value);
        break;
      case "dateOfIssue":
        setDateOfIssue(value);
        break;
      case "invoiceNumber":
        setInvoiceNumber(value);
        break;
      case "taxRate":
        setTaxRate(value);
        break;
      case "discountRate":
        setDiscountRate(value);
        break;
      default:
        break;
    }
    handleCalculateTotal();
  };

  const onCurrencyChange = (selectedOption) => {
    setCurrency(selectedOption);
  };

  const openModal = (event) => {
    event.preventDefault();
    handleCalculateTotal();
    setIsOpen(true);
  };

  const closeModal = (event) => {
    setIsOpen(false);
  };

  return (
    <Form onSubmit={openModal}>
      <Row>
        <Col md={8} lg={9}>
          <Card className="p-4 p-xl-5 my-3 my-xl-4">
            <div className="d-flex flex-row align-items-start justify-content-between mb-3">
              <div className="d-flex flex-column">
                <div className="d-flex flex-column">
                  <div className="mb-2">
                    <span className="fw-bold">Current&nbsp;Date:&nbsp;</span>
                    <span className="current-date">{currentDate}</span>
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center">
                  <span className="fw-bold d-block me-2">Due&nbsp;Date:</span>
                  <Form.Control
                    type="date"
                    value={dateOfIssue}
                    name="dateOfIssue"
                    onChange={editField}
                    style={{ maxWidth: "150px" }}
                    required
                  />
                </div>
              </div>
              <div className="d-flex flex-row align-items-center">
                <span className="fw-bold me-2">Invoice&nbsp;Number:&nbsp;</span>
                <Form.Control
                  type="number"
                  value={invoiceNumber}
                  name="invoiceNumber"
                  onChange={editField}
                  min="1"
                  style={{ maxWidth: "70px" }}
                  required
                />
              </div>
            </div>
            <hr className="my-4" />
            {/* Client information */}
            <Box className="col-4 align-items-center d-flex">
              <Autocomplete
                aria-required={true}
                fullWidth
                sx={{
                  ".MuiInputBase-root": {
                    height: "43px !important",
                  },
                  ".MuiInputBase-input": {
                    padding: "0px  !important",
                  },
                }}
                open={openClients}
                onOpen={() => {
                  setOpenClients(true);
                }}
                onClose={() => {
                  setOpenClients(false);
                }}
                options={clients}
                loading={loadingClient}
                // value={client?.nom||'' + ' '+ client?.prenom||''}
                onChange={(event, v) => {
                  setClient(v);
                }}
                getOptionLabel={(option) => option?.nom + ' '+ option?.prenom}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    variant="outlined"
                    onChange={(e) => {
                      setTypingFullName(e.target.value);
                    }}
                    label="Name"
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: loadingClient ? (
                        <CircularProgress color="inherit" size={10} />
                      ) : null,
                    }}
                  />
                )}
              />
            </Box>
            <Row className="mb-5">
              <Col>
                <Form.Label className="fw-bold">Information client:</Form.Label>
                <Form.Control
                  placeholder="Nom"
                  value={client?.nom}
                  type="text"
                  name="nom"
                  className="my-2"
                  // onChange={editField}
                  autoComplete="nom"
                  required
                />
                <Form.Control
                  placeholder="Email"
                  value={client?.email}
                  type="email"
                  name="email"
                  className="my-2"
                  // onChange={editField}
                  autoComplete="email"
                  required
                />
                <Form.Control
                  placeholder="Adresse"
                  value={client?.adresse}
                  type="text"
                  name="adresse"
                  className="my-2"
                  autoComplete="adresse"
                  // onChange={editField}
                  required
                />
                
              </Col>
              <Col>
                <Form.Label className="fw-bold">
                  Information entreprise:
                </Form.Label>
                <Form.Control
                  placeholder="Nom entreprise"
                  value={'FATMA&ROUA Company'}
                  type="text"
                  name="nom_entreprise"
                  className="my-2"
                  onChange={editField}
                  autoComplete="nom_entreprise"
                  required
                />
                <Form.Control
                  placeholder="Email entreprise"
                  value={email_entreprise}
                  type="email"
                  name="email_entreprise"
                  className="my-2"
                  onChange={editField}
                  autoComplete="email_entreprise"
                  required
                />
                <Form.Control
                  placeholder="Adresse entreprise"
                  value={adresse_entreprise}
                  type="text"
                  name="adresse_entreprise"
                  className="my-2"
                  autoComplete="adresse_entreprise"
                  onChange={editField}
                  required
                />
                <Form.Control
                  placeholder="Téléphone entreprise"
                  value={telephone_entreprise}
                  type="text"
                  name="telephone_entreprise"
                  className="my-2"
                  autoComplete="telephone_entreprise"
                  onChange={editField}
                  required
                />
              </Col>
            </Row>
            {/* Invoice items */}
            <InvoiceItem
              onItemizedItemEdit={onItemizedItemEdit}
              onRowAdd={handleAddEvent}
              onRowDel={handleRowDel}
              currency={currency}
              items={items}
            />
            {/* Total section */}
            <Row className="mt-4 justify-content-end">
              <Col lg={6}>
                <div className="d-flex flex-row align-items-start justify-content-between">
                  <span className="fw-bold">Subtotal:</span>
                  <span>
                    {currency}
                    {subTotal}
                  </span>
                </div>
                <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                  <span className="fw-bold">Discount:</span>
                  <span>
                    <span className="small">({discountRate || 0}%)</span>
                    {currency}
                    {discountAmount || 0}
                  </span>
                </div>
                <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                  <span className="fw-bold">Tax:</span>
                  <span>
                    <span className="small">({taxRate || 0}%)</span>
                    {currency}
                    {taxAmount || 0}
                  </span>
                </div>
                <hr />
                <div
                  className="d-flex flex-row align-items-start justify-content-between"
                  style={{ fontSize: "1.125rem" }}
                >
                  <span className="fw-bold">Total:</span>
                  <span className="fw-bold">
                    {currency}
                    {total || 0}
                  </span>
                </div>
              </Col>
            </Row>
            <hr className="my-4" />
            <Form.Label className="fw-bold">Notes:</Form.Label>
            <Form.Control
              placeholder="Thanks for your business!"
              name="notes"
              value={notes}
              onChange={editField}
              as="textarea"
              className="my-2"
              rows={1}
            />
          </Card>
        </Col>
        <Col md={4} lg={3}>
          <div className="sticky-top pt-md-3 pt-xl-4">
            {/* Sidebar content */}
            <Button variant="primary" type="submit" className="d-block w-100">
              Review Invoice
            </Button>
            <InvoiceModal
              showModal={isOpen}
              closeModal={closeModal}
              info={{
                currentDate,
                dateOfIssue,
                invoiceNumber,
                nom,
                email,
                adresse,
                clientId,
                nom_entreprise,
                email_entreprise,
                adresse_entreprise,
                telephone_entreprise,
                notes,
              }}
              items={items}
              currency={currency}
              subTotal={subTotal}
              taxAmount={taxAmount}
              discountAmount={discountAmount}
              total={total}
            />
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Currency:</Form.Label>
              <Form.Select
                onChange={(event) => onCurrencyChange(event.target.value)}
                className="btn btn-light my-1"
                aria-label="Change Currency"
              >
                <option value="$">USD (United States Dollar)</option>
                <option value="£">GBP (British Pound Sterling)</option>
                <option value="¥">JPY (Japanese Yen)</option>
                <option value="$">CAD (Canadian Dollar)</option>
                <option value="$">AUD (Australian Dollar)</option>
                <option value="$">SGD (Singapore Dollar)</option>
                <option value="¥">CNY (Chinese Renminbi)</option>
                <option value="₿">BTC (Bitcoin)</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="my-3">
              <Form.Label className="fw-bold">Tax rate:</Form.Label>
              <InputGroup className="my-1 flex-nowrap">
                <Form.Control
                  name="taxRate"
                  type="number"
                  value={taxRate}
                  onChange={editField}
                  className="bg-white border"
                  placeholder="0.0"
                  min="0.00"
                  step="0.01"
                  max="100.00"
                />
                <InputGroup.Text className="bg-light fw-bold text-secondary small">
                  %
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
            <Form.Group className="my-3">
              <Form.Label className="fw-bold">Discount rate:</Form.Label>
              <InputGroup className="my-1 flex-nowrap">
                <Form.Control
                  name="discountRate"
                  type="number"
                  value={discountRate}
                  onChange={editField}
                  className="bg-white border"
                  placeholder="0.0"
                  min="0.00"
                  step="0.01"
                  max="100.00"
                />
                <InputGroup.Text className="bg-light fw-bold text-secondary small">
                  %
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
            <Button
              variant="primary"
              type="button"
              className="d-block w-100"
              onClick={handleAddDevis}
            >
              Ajouter devis
            </Button>
            <ToastContainer />
          </div>
        </Col>
      </Row>
    </Form>
  );
}

export default InvoiceForm;
