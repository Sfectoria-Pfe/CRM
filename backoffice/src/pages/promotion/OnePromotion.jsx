import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchpromotion } from "../../store/promotion";
import { useParams } from "react-router-dom";
import { Modal } from "react-bootstrap";


export default function OnePromotion() {
  const dispatch = useDispatch();
  const { promotionId } = useParams();
  const promotion = useSelector((state) => state.promotion.promotion);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(true); // Automatically show modal

  useEffect(() => {
    // Fetch promotion when component mounts
    dispatch(fetchpromotion(promotionId))
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
  }, [dispatch, promotionId]);

  // Check if the promotion is still loading
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Check if the promotion exists
  if (!promotion) {
    return <div>Promotion introuvable.</div>;
  }

  return (
    <div>
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        style={{ padding: "40px", width: "1000px" }} // Adjusted width here
      >
        <Modal.Header closeButton>
          <Modal.Title>Détails de la promotion</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ width: "500px" }}> {/* Adjusted width here */}
          <div style={{  height: "300px" }}>
            <h2 style={{ color: "#ffffff", fontSize: "30px" }}>Détails de la promotion</h2>
            <div>
              <div>
                <strong >Description:</strong> {promotion.description}
              </div>
              <div>
                <strong >Pourcentage:</strong> {promotion.pourcentage}
              </div>
              <div>
                <strong>Date de début:</strong> {promotion.date_debut}
              </div>
              
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={() => setShowModal(false)}>Fermer</button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}