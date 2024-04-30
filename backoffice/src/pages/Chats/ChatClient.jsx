import React, { useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ForumIcon from '@mui/icons-material/Forum'; // Import de l'icône du forum

export default function AlignItemsList() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    // Appel de fetchVentes pour récupérer les données des ventes
    const fetchclient = async () => {
      try {
        const response = await fetch('http://localhost:7000/clients');
        const data = await response.json();
        setClients(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des client :', error);
      }
    };

    fetchclient();
  }, []);

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {clients.map((client, index) => (
        <React.Fragment key={index}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt={client.nom} src={client.image} />
            </ListItemAvatar>
            <ListItemText
              primary={client.nom} 
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >                 

                    {client.secondaryText}

                  </Typography>
                  <ForumIcon /> 
                </React.Fragment>
              }
            />
          </ListItem>
          {index !== clients.length - 1 && <Divider variant="inset" component="li" />}
        </React.Fragment>
      ))}
    </List>
  );
}
