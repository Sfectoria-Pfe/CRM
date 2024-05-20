import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import App from "../apps/App";
import Auth from "../apps/Auth";
import { HTML5Backend } from "react-dnd-html5-backend";

import { DndProvider } from "react-dnd";
import Dashboard from "../pages/Dashboard";
import Product from "../pages/product/Product";
import NotFound from "../pages/NotFound";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "../store/store";
import AddProduct from "../pages/product/views/AddProduct";
import ProductList from "../pages/product/views/ProductList";
import ProductDetails from "../pages/product/views/ProductDetails";
import Profile from "../pages/profile/Profile";
import ProfileDetails from "../pages/profile/views/ProfileDetails";
import EditProfile from "../pages/profile/views/EditProfile";
import { getMe } from "../store/auth";
import AddVente from "../pages/ventes/views/AddVente";
import VenteList from "../pages/ventes/views/ListeVente";
import Calendrier from "../pages/calendrier/calendrier.jsx"
import Addservice from "../pages/service/views/addService";
import ServiceListe from "../pages/service/views/serviceListe.jsx";
import Login from "../pages/auth/Login";
import AddLocation from "../pages/location/views/AddLocation.js";
import LocationList from "../pages/location/views/ListeLocation.js";
import AddClient from "../pages/client/views/AddClient.jsx";
import ClientList from "../pages/client/views/ListeClient.jsx";
import AddOpportunite from "../pages/opportunite/views/AddOpportunite.jsx";
import AddStageIcon from "../pages/opportunite/components/AddIcone.jsx";
import AddStage from "../pages/stage/AddStage.jsx";
import AddStageClient from "../pages/stage-client/AddStage-client.js";
import ListOpportunities from "../pages/opportunite/views/ListOpportunities.jsx";
import ViewOpportunity from "../pages/opportunite/views/VewOpportunity.jsx";
import Opportunity from "../pages/opportunite/opportunity.jsx";
import AccesDenied from "../pages/AccesDenied.jsx";
import SignUp from "../pages/auth/SignUp.js";
import Test from "../pages/To doList/Test.js";
import OneClient from "../pages/client/views/oneClient.js";
import ListDevis from "../pages/Devis/ListeDevis.jsx";
import OneDevis from "../pages/Devis/OneDevis.js";
import Chat from "../pages/Chats/chat.js";
import Addemployee from "../pages/employee/addemlpyee.jsx";
import ListEmployee from "../pages/employee/listeemployee.jsx";
import ListPromotion from "../pages/promotion/Listepromotion.jsx";
import AddPromotion from "../pages/promotion/Addpromotion.jsx";
import Adduser from "../pages/user/adduser.jsx";
import { Spinner } from "react-bootstrap";
import ListRendezvous from "../pages/Rendez/Liste Rendez.js";
import ListDemandeDevis from "../pages/Devis/ListeDemandedevis.js";
import Charts from "../pages/charts/chartss.jsx"
import AddService from "../pages/service/views/addService";
import Services from "../pages/service/services.js";
import OneService from "../pages/service/views/oneService.jsx";
import Servicede from "../pages/Servicedetails/Servicede.js";
import ListServiceDetails from "../pages/Servicedetails/views/Listeservicede.jsx";
import AddServiceDetail from "../pages/Servicedetails/views/AddServicede.jsx";
import InvoiceForm from "../pages/Devis 2/InvoiceForm.js"
import AlignItemsList from "../pages/Chats/ChatClient.jsx";
import ListEquipeCommerciale from "../pages/equipe commerciale/Listeequipe.jsx";
import AddEquipe from "../pages/equipe commerciale/Ajoutequipe.js";
import PromotionManagementPage from "../pages/promotion/Promotion.jsx";
import ListUser from "../pages/user/listeuser.jsx";
import AddCategoryForm from "../pages/CatgorieClient/AddCtegorie.jsx";
import CategoryDataGrid from "../pages/CatgorieClient/ListeCategorie.jsx";
import ListCategoryClients from "../pages/CatgorieClient/ListeCategorie.jsx";
import UpdateServicePage from "../pages/service/views/updateservice.jsx";
import AddCommentForm from "../pages/Comments/Addcomment.jsx";
import OnePromotion from "../pages/promotion/OnePromotion.jsx";
export const UserContext = createContext();

function PrivateRoute({ Component, roles }) {
  const user = useSelector((store) => store.auth.me);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.Employee?.role) {
      if (!roles.includes(user.Employee.role)) {
        navigate("/acess-denied");
      }
    }
  }, [user]);
  if (roles.includes(user?.Employee?.role)) {
    return <Component />;
  }
}

export default function Router() {
  const user = useSelector((store) => store.auth.me);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      dispatch(getMe()).then((res) => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [dispatch]);

  return (
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <BrowserRouter>
          {loading && (
            <div className="position-fixed w-100 h-100 d-flex justify-content-center align-items-center">
              <Spinner animation="border" variant="primary" />
            </div>
          )}
          <Routes>
            {user ? (
              <Route path="/" element={<App />}>
                <Route index 
                element={
                  <PrivateRoute
                    Component={Charts}
                    roles={["admin"]}
                  />
                }/>
                <Route path="products" element={<Product />}>
                  <Route index element={<ProductList />} />
                  <Route path=":id" element={<ProductDetails />} />
                  <Route path="add" element={<AddProduct />} />
                </Route>
                <Route path="profile" element={<Profile />}>
                  <Route index element={<ProfileDetails />} />
                  <Route path="edit" element={<EditProfile />} />
                </Route>
                <Route path="services" element={<Services />}>

                <Route index element={<ServiceListe />} />
                <Route path="addservice" 
               
                element={
                  <PrivateRoute
                    Component={AddService}
                    roles={["admin"]}
                  />} />
                <Route path=":serviceId"  element={<OneService/>} />
                </Route>
                <Route path="AddVente" element={<AddVente />} />
                <Route path="ListeVente" element={<VenteList />} />
                <Route path="AddLocation" element={<AddLocation />} />
                <Route path="ListeLocation" element={<LocationList />} />
                <Route path="clients">
                  <Route index element={<ClientList />} />
                  <Route path=":clientId" element={<OneClient />} />

                  <Route path="addClient" element={<AddClient />} />
                </Route>
                <Route
                  path="opportunities"
                  element={
                    <PrivateRoute
                      Component={Opportunity}
                      roles={["chef", "admin","commercial"]}
                    />
                  }
                >
<Route index element={<PrivateRoute Component={ListOpportunities} roles={["chef", "admin", "commercial"]} />} />                  <Route path="add" 
                  element={
                    <PrivateRoute
                      Component={AddOpportunite}
                      roles={[ "admin","chef","commercial"]}
                    />
                  }/>
                 
                  <Route path=":opportunityId" element={<ViewOpportunity />} />
                </Route>
                <Route path="/devis" element={<ListDevis />} />
                <Route path="/devis/:devisId" element={<OneDevis />} />
                <Route path="./AddStage" element={<AddStage />} />
                <Route path="AddIcone" element={<AddStageIcon />} />
                <Route path="Addstage_client" element={<AddStageClient />} />
                <Route path="acess-denied" element={<AccesDenied />} />
                <Route path="todolist" element={<Test />} />
                <Route path="chats" element={<Chat />} />
                <Route path="addemployee" element={<Addemployee />} />
                <Route path="listeemployee" 
                 element={
                  <PrivateRoute
                    Component={ListEmployee}
                    roles={[ "admin"]}
                  />
                }/>
                
                <Route path="listeCommerciale" 
                element={
                  <PrivateRoute
                    Component={ListEquipeCommerciale}
                    roles={[ "admin","chef"]}
                  />
                } /> 
               
                <Route path="/AddEquipeCommerciale"
                element={
                  <PrivateRoute
                    Component={AddEquipe}
                    roles={[ "admin","chef"]}
                 />}/>
            <Route path="Promotion"  
            element={
              <PrivateRoute
                Component={PromotionManagementPage}
                roles={[ "admin",]}
             />}/>
                <Route path="/Addpromotion" 
                element={
                  <PrivateRoute
                    Component={AddPromotion}
                    roles={[ "admin"]}
                  />
                } />
                <Route path="/promotions/:promotionId" element={<OnePromotion />} />
                <Route path="listepromotion"  
                element={
                  <PrivateRoute
                    Component={ListPromotion }
                    roles={[ "admin"]}
                  />
                }/>
                <Route path="calendrier" element={<Calendrier />} />
                <Route path="adduser" element={<Adduser />} />
                <Route path="ListeRendezvous" element={<ListRendezvous />} />
                <Route path="ListeDemandedevis" element={<ListDemandeDevis/>} />
                <Route path="Dashboard" element={<Charts />} />
                <Route path="listeuser" 
                 element={
                  <PrivateRoute
                    Component={ListUser}
                    roles={[ "admin"]}
                  />
                }/>
   <Route path="Comment" element={<AddCommentForm/>} />
                <Route path="InvoiceForm" element={<InvoiceForm />} />
                <Route path="ChatClient" element={<AlignItemsList />} />
                <Route path="/services/update/:id" 
                element={
                  <PrivateRoute
                    Component={UpdateServicePage }
                    roles={[ "admin"]}
                  />
                }
                />

                 <Route path="AddCategorie"  element={<AddCategoryForm/>} />
                 <Route path="Listecategory" element={<ListCategoryClients/>} />
                <Route path="servicesdetails" element={<Servicede />}>
                <Route index element={<ListServiceDetails />} />
                <Route path="addservicedetails" 
                  element={
                    <PrivateRoute
                      Component={AddServiceDetail}
                      roles={[ "admin"]}
                    />
                  }
                /> 
                
                <Route path=":serviceId"  element={<OneService/>} />

                </Route>

              </Route>
            ) : (
              <Route path="/" element={<Auth />}>
                <Route index element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
              </Route>
            )}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </DndProvider>
    </Provider>
  );
}
