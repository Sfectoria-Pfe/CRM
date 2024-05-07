import InboxIcon from "@mui/icons-material/MoveToInbox";
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import DiamondIcon from '@mui/icons-material/Diamond';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import ChatIcon from '@mui/icons-material/Chat';
import GridViewIcon from '@mui/icons-material/GridView';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import AddVenteIcon from '@mui/icons-material/Add';
import ListeVenteIcon from '@mui/icons-material/ListAlt';
import ListeLocationIcon from '@mui/icons-material/List';
import DescriptionIcon from '@mui/icons-material/Description';
import RequestIcon from '@mui/icons-material/RequestQuote';
import DevisIcon from '@mui/icons-material/Description';
import ListDevisIcon from '@mui/icons-material/ListAlt';
import DiscountIcon from '@mui/icons-material/Discount';
import ListIcon from '@mui/icons-material/List';
import AddIcon from '@mui/icons-material/Add';

export const sidebarData = [
  {
    title: "Dashboard",
    path: "/Dashboard",
    icon: <HomeIcon />,
    access:['chef','admin','commercial']
  },
  {
    title: "Catalogue",
    path: "/services",
    icon: <GridViewIcon />,
    access: ["chef", "admin", "commercial"],
    children: [
      {
        title: "Service",
        path: "/services",
        icon: < DescriptionIcon />,
        access:['chef','admin','commercial']
      },
      
      // {
      //   title: "Ajouter Location",
      //   path: "/addLocation",
      //   icon: <AddLocationIcon />,
      // },
      // {
      //   title: "Ajouter  Vente",
      //   path: "/addVente",
      //   icon: <AddLocationIcon />,
      // },
      // {
      //   title: "Liste des Ventes",
      //   path: "/ListeVente",
      //   icon: <ListeLocationIcon />,
      // },
      // {
      //   title: "Liste des Locations",
      //   path: "/ListeLocation",
      //   icon: <ListeLocationIcon />,
      // },
      {
        title: "promotion",
        path: "/Promotion",
        icon: <DiscountIcon />,
        access:['chef','admin','commercial']
      }, 
    ],
  },
  {
    title: "Opportunities",
    path: "/opportunities",
    icon: < DiamondIcon />,
    access:['chef','admin']
  },
  {
    title: "Clients",
    path: "/clients",
    icon: <PersonIcon />,
    access:['chef','admin','commercial']
  },
  {
    title: "Devis",
    icon: <DescriptionIcon />,
    path: "/devis",
    access: ["admin", "manager"],
    children: [
      {
        title: "Liste Demande Devis",
        icon: <RequestIcon />,
        path: "/ListeDemandedevis",
      },
      {
        title: " Ajouter Devis",
        icon: <DevisIcon />,
        path: "/InvoiceForm",
      },
      {
        title: "List Devis",
        icon: <ListDevisIcon />,
        path: "/devis",
      },
    ],
  },



  {
    title: "Rendez Vous",
    path: "/calendrier",
    icon: <CalendarMonthIcon />,
    access: ['chef', 'admin', 'commercial'],
    children: [
      {
        title: "Liste Demande",
        icon: <AddIcon />,
        path: "/ListeRendezvous",
      },
      {
        title: "Calendrier",
        icon: <AddIcon />,
        path: "/calendrier",
      },
    ]
  },{
    title: "Employés",
    path: "/listeemployee",
    icon: < PeopleAltIcon  />,
    children: [
      {
        title: "Liste Equipe",
        icon: <ListIcon/>,
        path: "/listeCommerciale",
      },
      {
        title: "List Employees",
        icon: <ListIcon />,
        path: "/listeemployee",
      },
      
    ],
    access:['chef','admin','commercial']
  },
  {
    title: "Users",
    path: "/listeuser",
    icon: < PersonPinIcon  />,
    access:['chef','admin','commercial']
  },
  // {
  //   title: "Chats",
  //   path: "/chats",
  //   icon: < ChatIcon  />,
  //   access:['chef','admin','commercial']
  // },


 

];
