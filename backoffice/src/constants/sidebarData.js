import InboxIcon from "@mui/icons-material/MoveToInbox";
export const sidebarData = [
  {
    title: "Dashboard",
    path: "/",
    icon: <InboxIcon />,
    access:['chef','admin','commercial']
  },
  {
    title: "Opportunities",
    path: "/opportunities",
    icon: <InboxIcon />,
    access:['chef','admin']
  },
  {
    title: "Clients",
    path: "/",
    icon: <InboxIcon />,
    access:['chef','admin','commercial']
  },
];
