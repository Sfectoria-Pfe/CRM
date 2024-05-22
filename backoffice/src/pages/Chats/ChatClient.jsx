import React, { useState, useEffect, useContext } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import ForumIcon from "@mui/icons-material/Forum";
import { SocketContext } from "../../apps/App";

export default function AlignItemsList({ opportunityId, setSelectedClient }) {
  const [clients, setClients] = useState([]);
  const socket = useContext(SocketContext);

  useEffect(() => {
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
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper", background: "#e6ccff", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
      <Typography variant="h5" sx={{ textAlign: "center", color: "#4a148c", padding: "16px 0", fontWeight: "bold" }}>
        La liste des clients
      </Typography>
      {clients.map((client, index) => (
        <React.Fragment key={index}>
          <ListItem
            alignItems="flex-start"
            style={{ cursor: "pointer", transition: "background 0.3s" }}
            onClick={() => {
              setSelectedClient(client);
            }}
            sx={{
              "&:hover": {
                backgroundColor: "#ede7f6",
              },
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
                    sx={{ display: "inline", marginRight: "8px" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {client._count.content}
                  </Typography>
                  <ForumIcon sx={{ verticalAlign: "middle", color: "#7e57c2" }} />
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
