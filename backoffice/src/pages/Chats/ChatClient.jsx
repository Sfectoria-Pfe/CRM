import React, { useState, useEffect, useContext } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import ForumIcon from "@mui/icons-material/Forum"; // Import de l'icône du forum
import { SocketContext } from "../../apps/App";

export default function AlignItemsList({ opportunityId,setSelectedClient }) {
  const [clients, setClients] = useState([]);
  const socket = useContext(SocketContext);
  useEffect(() => {
    // Appel de fetchVentes pour récupérer les données des ventes
    const fetchclient = async () => {
      socket.emit("demand-list-client-opportunity", { opportunityId });
    };
    fetchclient();
  }, [opportunityId, socket]);
  useEffect(() => {
    socket.on("list-list-client/" + opportunityId, (data) => {
      setClients(data);
    });
    return () => {
      socket.off("list-list-client/" + opportunityId, (data) => {
        setClients(data);
      });
    };
  }, [socket]);
 
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {clients.map((client, index) => (
        <React.Fragment key={index}>
          <ListItem
            alignItems="flex-start"
            style={{ cursor: "pointer" }}
            onClick={() => {
              setSelectedClient(client);
            }}
          >
            <ListItemAvatar>
              <Avatar alt={client?.Client?.nom} src={client?.Client?.image} />
          
            </ListItemAvatar>
            <ListItemText
              primary={client?.Client?.nom}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {client._count.content}
                  </Typography>
                  <ForumIcon />
                </React.Fragment>
              }
            />
          </ListItem>
          {index !== clients.length - 1 && (
            <Divider variant="inset" component="li" />
          )}
        </React.Fragment>
      ))}
    </List>
  );
}