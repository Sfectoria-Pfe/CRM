import React from "react";
import ListPromotion from "./Listepromotion"; 
import Addpromotion from "./Addpromotion"; 

function PromotionManagementPage() {
  return (
    <div className="d-flex">
      <div style={{ flex: 1, marginRight: "10px" }}>
        <ListPromotion style={{ maxWidth: "100%", overflowX: "auto" }} />
      </div>

      <div style={{ flex: 1 }}>
        <Addpromotion style={{ width: "100%" }} />
      </div>
    </div>
  );
}

export default PromotionManagementPage;
