import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDevi } from "../../store/devis";
import { useParams } from "react-router-dom";
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { PDFViewer, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

import { BiPaperPlane, BiCloudDownload } from "react-icons/bi";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf'

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 10,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  strong: {
    fontWeight: 'bold',
  },
});

function OneDevis() {
  const dispatch = useDispatch();
  const { devisId } = useParams();
  const devis = useSelector((state) => state.devis.devi);
  const loading = useSelector((state) => state.devis.loading);

  const [pdfExported, setPdfExported] = useState(false);

  useEffect(() => {
    dispatch(fetchDevi(devisId)); 
  }, [dispatch, devisId]);

  const handleExportPDF = () => {
    setPdfExported(true);
  };
  function GenerateInvoice() {
    html2canvas(document.querySelector("#invoiceCapture")).then((canvas) => {
      const imgData = canvas.toDataURL('image/png', 1.0);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: [612, 792]
      });
      pdf.internal.scaleFactor = 1;
      const imgProps= pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('invoice-001.pdf');
    });
  }
  return (
    <div>
      <div id="invoiceCapture">
            <div className="d-flex flex-row justify-content-between align-items-start bg-light w-100 p-4">
              <div className="w-100">
                <h4 className="fw-bold my-2">{devis?.client?.nom||'John Uberbacher'}</h4>
                <h6 className="fw-bold text-secondary mb-1">
                  Devis n° : {devis?.id||''}
                </h6>
              </div>
              <div className="text-end ms-4">
                <h6 className="fw-bold mt-1 mb-2">Montant à&nbsp;payer :</h6>
                <h5 className="fw-bold text-secondary"> {devis?.currency} {devis?.total}</h5>
              </div>
            </div>
            <div className="p-4">
              <Row className="mb-4">
                <Col md={4}>
                  <div className="fw-bold">Informations du client</div>
                  <div>{devis?.client?.nom||''}</div>
                  <div>{devis?.client?.email||''}</div>
                  <div>{devis?.client?.adresse||''}</div>
                 

                </Col>
                <Col md={4}>
                  <div className="fw-bold">Informations de l'entreprise</div>
                  <div>{"MaisonPlus "||''}</div>
                  <div>{"MaisonPlus@gmail.com"||''}</div>
                  <div>{"MTunisie, Sousse, Rue de zouhour"||''}</div>
                  <div>{"23459334"||''}</div>

                </Col>
                <Col md={4}>
                  <div className="fw-bold mt-2">Date d'émission :</div>
                  <div>{devis?.dateOfIssue||''}</div>
                </Col>
              </Row>
              <Table className="mb-0">
                <thead>
                  <tr>
                    <th>Quantité</th>
                    <th>DESCRIPTION</th>
                    <th className="text-end">Prix</th>
                    <th className="text-end">MONTANT</th>
                  </tr>
                </thead>
                <tbody>
                  {devis?.devisLine.map((item, i) => {
                    return (
                      <tr id={i} key={i}>
                        <td style={{width: '70px'}}>
                          {item.quantity}
                        </td>
                        <td>
                          {item.name} 
                        </td>
                        <td className="text-end" style={{width: '100px'}}>{devis?.currency} {item.prix_unitaire}</td>
                        <td className="text-end" style={{width: '100px'}}>{devis?.currency} {item.prix_unitaire * item.quantity}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
              <Table>
                <tbody>
                  <tr>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                  </tr>
                  <tr className="text-end">
                    <td></td>
                    <td className="fw-bold" style={{width: '100px'}}>SOUS-TOTAL</td>
                    <td className="text-end" style={{width: '100px'}}>{devis?.currency} {devis?.subTotal}</td>
                  </tr>
                  {devis?.taxAmmount != 0.00 &&
                    <tr className="text-end">
                      <td></td>
                      <td className="fw-bold" style={{width: '100px'}}>TAX</td>
                      <td className="text-end" style={{width: '100px'}}>{devis?.currency} {devis?.taxAmmount}</td>
                    </tr>
                  }
                  {devis?.discountAmmount != 0.00 &&
                    <tr className="text-end">
                      <td></td>
                      <td className="fw-bold" style={{width: '100px'}}>REMISE</td>
                      <td className="text-end" style={{width: '100px'}}>{devis?.currency} {devis?.discountAmmount}</td>
                    </tr>
                  }
                  <tr className="text-end">
                    <td></td>
                    <td className="fw-bold" style={{width: '100px'}}>TOTAL</td>
                    <td className="text-end" style={{width: '100px'}}>{devis?.currency} {devis?.total}</td>
                  </tr>
                </tbody>
              </Table>
              {devis?.notes &&
                <div className="bg-light py-3 px-4 rounded">
                  {devis?.notes}
                </div>}
            </div>
          </div>
          <div className="pb-4 px-4">
            <Row>
              <Col md={6}>
                <Button variant="primary" className="d-block w-100" onClick={GenerateInvoice}>
                  <BiPaperPlane style={{width: '15px', height: '15px', marginTop: '-3px'}} className="me-2"/>Envoyer le devis
                </Button>
              </Col>
              <Col md={6}>
                <Button variant="outline-primary" className="d-block w-100 mt-3 mt-md-0" onClick={GenerateInvoice}>
                  <BiCloudDownload style={{width: '16px', height: '16px', marginTop: '-3px'}} className="me-2"/>
                  Télécharger une copie
                </Button>
              </Col>
            </Row>
          </div>
      <Button
        variant="contained"
        color="primary"
        startIcon={<SaveAltIcon />}
        onClick={handleExportPDF}
      >
        Exporter en PDF
      </Button>
      {pdfExported && (
        <PDFViewer width="100%" height={600}>
          <Document>
            <Page size="A4" style={styles.page}>
              <View style={styles.section}>
                <Text style={styles.strong}>Numéro de devis :</Text>
                <Text>{devis.numero_devis}</Text>
              </View>
              <View style={styles.section}>
                <Text style={styles.strong}>Date d'estimation :</Text>
                <Text>{devis.date_estimation}</Text>
              </View>
              <View style={styles.section}>
                <Text style={styles.strong}>Montant total :</Text>
                <Text>{devis.montant_total}</Text>
              </View>
              <View style={styles.section}>
                <Text style={styles.strong}>Prix unitaire :</Text>
                <Text>{devis.prix_unitaire}</Text>
              </View>
              <View style={styles.section}>
                <Text style={styles.strong}>Service :</Text>
                <Text>{devis.service}</Text>
              </View>
              <View style={styles.section}>
                <Text style={styles.strong}>TVA :</Text>
                <Text>{devis.TVA}</Text>
              </View>
              <View style={styles.section}>
                <Text style={styles.strong}>Client :</Text>
                <Text>{devis.client?.nom} {devis.client?.prenom}</Text>
              </View>
            </Page>
          </Document>
        </PDFViewer>
      )}
    </div>
  );
}

export default OneDevis;
