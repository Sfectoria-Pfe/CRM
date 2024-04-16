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



export const sidebarData = [
  {
    title: "Dashboard",
    path: "/",
    icon: <HomeIcon />,
    access:['chef','admin','commercial']
  },
  {
    title: "Catalogue",
    path: "/",
    icon: <GridViewIcon />,
    access: ["chef", "admin", "commercial"],
    children: [
      {
        title: "Ajouter Location",
        path: "/addLocation",
        icon: <AddLocationIcon />,
      },
      {
        title: "Ajouter  Vente",
        path: "/addVente",
        icon: <AddLocationIcon />,
      },
      {
        title: "Liste des Ventes",
        path: "/ListeVente",
        icon: <ListeLocationIcon />,
      },
      {
        title: "Liste des Locations",
        path: "/ListeLocation",
        icon: <ListeLocationIcon />,
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
    path: "/devis",
    icon: <StickyNote2Icon />,
    access:['chef','admin','commercial']
  }, 

  {
    title: "Rendez Vous",
    path: "/",
    icon: <CalendarMonthIcon />,
    access:['chef','admin','commercial']
 
  }, 
  {
    title: "Employés",
    path: "/emplyee",
    icon: < PeopleAltIcon  />,
    access:['chef','admin','commercial']
  },
  {
    title: "Users",
    path: "/adduser",
    icon: < PersonPinIcon  />,
    access:['chef','admin','commercial']
  },
  {
    title: "Chats",
    path: "/chats",
    icon: < ChatIcon  />,
    access:['chef','admin','commercial']
  },
  {
    title: "promotion",
    path: "/Addpromotion",
    icon: <StickyNote2Icon />,
    access:['chef','admin','commercial']
  }, 

];
