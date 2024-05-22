import React from 'react';
import { Link } from 'react-router-dom';

export default function AccesDenied() {
  const handleGoBack = () => {
    window.location.href = document.referrer;
  };

  return (
    <div style={styles.container}>
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGzPtQl2ww5JT3a1Foz8DzSM3LD34oo47yhw&s" alt="Access Denied" style={styles.image} />
      <h1 style={styles.title}>Accès refusé</h1>
      <p style={styles.message}>Désolé, vous n'avez pas accès à cette page.</p>
      <button style={styles.button} onClick={handleGoBack}>Retourner à la page précédente</button>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '1rem',
    color: '#dc3545',
  },
  message: {
    fontSize: '1rem',
    color: '#6c757d',
  },
  image: {
    width: '200px',
    marginBottom: '1rem',
  },
  link: {
    fontSize: '1rem',
    color: '#007bff',
  },
  button: {
    fontSize: '1rem',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    padding: '0.5rem 1rem',
    marginTop: '1rem',
    cursor: 'pointer',
  },
};
