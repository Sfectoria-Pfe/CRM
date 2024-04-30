import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDevi } from "../../store/devis";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { PDFViewer, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

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

  return (
    <div>
      <h2 style={{ color: "blue" }}>Devis Details</h2>
      <div style={styles.devisDetails}>
        <div style={styles.detailItem}>
          <strong style={styles.strong}>Numéro de devis:</strong> {devis?.numero_devis}
        </div>
        <div style={styles.detailItem}>
          <strong style={styles.strong}>Date d'estimation:</strong> {devis?.date_estimation}
        </div>
        <div style={styles.detailItem}>
          <strong style={styles.strong}>Montant total:</strong> {devis?.montant_total}
        </div>
        <div style={styles.detailItem}>
          <strong style={styles.strong}>Prix unitaire:</strong> {devis?.prix_unitaire}
        </div>
        <div style={styles.detailItem}>
          <strong style={styles.strong}>Service:</strong> {devis?.service}
        </div>
        <div style={styles.detailItem}>
          <strong style={styles.strong}>TVA:</strong> {devis?.TVA}
        </div>
        <div style={styles.detailItem}>
          <strong style={styles.strong}>Client:</strong> {devis?.client?.nom} {devis?.client?.prenom}
        </div>
      </div>
      <Button
        variant="contained"
        color="primary"
        startIcon={<SaveAltIcon />}
        onClick={handleExportPDF}
      >
        Export PDF
      </Button>
      {pdfExported && (
        <PDFViewer width="100%" height={600}>
          <Document>
            <Page size="A4" style={styles.page}>
              <View style={styles.section}>
                <Text style={styles.strong}>Numéro de devis:</Text>
                <Text>{devis.numero_devis}</Text>
              </View>
              <View style={styles.section}>
                <Text style={styles.strong}>Date d'estimation:</Text>
                <Text>{devis.date_estimation}</Text>
              </View>
              <View style={styles.section}>
                <Text style={styles.strong}>Montant total:</Text>
                <Text>{devis.montant_total}</Text>
              </View>
              <View style={styles.section}>
                <Text style={styles.strong}>Prix unitaire:</Text>
                <Text>{devis.prix_unitaire}</Text>
              </View>
              <View style={styles.section}>
                <Text style={styles.strong}>Service:</Text>
                <Text>{devis.service}</Text>
              </View>
              <View style={styles.section}>
                <Text style={styles.strong}>TVA:</Text>
                <Text>{devis.TVA}</Text>
              </View>
              <View style={styles.section}>
                <Text style={styles.strong}>Client:</Text>
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
