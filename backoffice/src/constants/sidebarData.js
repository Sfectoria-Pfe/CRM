import InboxIcon from "@mui/icons-material/MoveToInbox";
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import DiamondIcon from '@mui/icons-material/Diamond';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import GridViewIcon from '@mui/icons-material/GridView';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import ChatIcon from '@mui/icons-material/Chat';
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
    access:['chef','admin','commercial']
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
    path: "/",
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
    path: "/users",
    icon: < PersonPinIcon  />,
    access:['chef','admin','commercial']
  },
  {
    title: "Chats",
    path: "/chats",
    icon: < ChatIcon  />,
    access:['chef','admin','commercial']
  },

];
