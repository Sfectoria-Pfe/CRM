import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { deleteLocation, updateLocation } from "../../../store/location"; // Importez les actions pour les locations
import { faTrash, faEdit, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

function LocationList() { // Renommez la fonction en LocationList
    const [locations, setLocations] = useState([]); // Renommez les variables et les fonctions associées à la location
    const [searchTerm, setSearchTerm] = useState('');
    const [updatedLocationData, setUpdatedLocationData] = useState({});
    const [editingId, setEditingId] = useState(null);
    const [sortBy, setSortBy] = useState('nom');
    const [sortOrder, setSortOrder] = useState('asc');
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchLocations = async () => { // Renommez fetchVentes en fetchLocations
            try {
                const response = await fetch('http://localhost:7000/locations'); // Mettez à jour l'URL pour récupérer les locations
                const data = await response.json();
                setLocations(data);
            } catch (error) {
                console.error('Erreur lors de la récupération des locations :', error);
            }
        };

        fetchLocations();
    }, []);

    const filteredLocations = locations.filter(location =>
        location.nom.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedLocations = filteredLocations.sort((a, b) => {
        const sortOrderValue = sortOrder === 'asc' ? 1 : -1;
        return a[sortBy] > b[sortBy] ? sortOrderValue : -sortOrderValue;
    });

    const handleDelete = (id) => {
        dispatch(deleteLocation(id)); // Utilisez la fonction de suppression de location
    };

    const handleUpdate = (id) => {
        setEditingId(id);
        setUpdatedLocationData(filteredLocations.find(location => location.id === id));
    };

    const handleSave = (id) => {
        dispatch(updateLocation({ id, body: updatedLocationData })); // Utilisez la fonction de mise à jour de location
        setEditingId(null);
    };

    const handleInputChange = (e) => {
        setUpdatedLocationData({
            ...updatedLocationData,
            [e.target.name]: e.target.value
        });
    };

    const handleSort = (sortByValue) => {
        if (sortByValue === sortBy) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(sortByValue);
            setSortOrder('asc');
        }
    };

    return (
        <div>
            <h1 style={{ color: "royalblue" }}>Liste des locations</h1>
            <div className='d-flex justify-content-between'>
                <input
                    className='search-input'
                    type="text"
                    placeholder="Rechercher par nom..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
                <Link to="/addLocation" className="add-location-link"> {/* Mettez à jour le lien pour ajouter une location */}
                    <FontAwesomeIcon icon={faPlusCircle} size="2x" className="add-location-icon" />
                    <span className="add-location-tooltip">Ajouter une location</span>
                </Link>
            </div>
            <table className="service-table">
                <thead>
                    <tr>
                        <th onClick={() => handleSort('nom')}>Nom</th>
                        <th onClick={() => handleSort('prix')}>Prix</th>
                        <th onClick={() => handleSort('lieu')}>Lieu</th>
                        <th onClick={() => handleSort('description')}>Description</th>
                        <th onClick={() => handleSort('date_ debut du location')}>Date debut  de location</th>
                        <th onClick={() => handleSort('date_fin du location')}>Date fin de location</th>

                        <th onClick={() => handleSort('nom_locataire')}>Nom du locataire</th>
                        <th onClick={() => handleSort('telephone_locataire')}>Téléphone du locataire</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedLocations.map(location => ( // Utilisez sortedLocations et la variable location
                        <tr key={location.id}> {/* Utilisez la variable location */}
                            <td>{editingId === location.id ? <input type="text" name="nom" value={updatedLocationData.nom} onChange={handleInputChange} /> : location.nom}</td>
                            <td>{editingId === location.id ? <input type="text" name="prix" value={updatedLocationData.prix} onChange={handleInputChange} /> : location.prix}</td>
                            <td>{editingId === location.id ? <input type="text" name="lieu" value={updatedLocationData.lieu} onChange={handleInputChange} /> : location.lieu}</td>
                            <td>{editingId === location.id ? <input type="text" name="description" value={updatedLocationData.description} onChange={handleInputChange} /> : location.description}</td>
                            <td>{editingId === location.id ? <input type="text" name="date_debut de location" value={updatedLocationData.date_debut } onChange={handleInputChange} /> : location.date_debut }</td>
                            <td>{editingId === location.id ? <input type="text" name="date_fin de location" value={updatedLocationData.date_fin} onChange={handleInputChange} /> : location.date_fin}</td>

                            <td>{editingId === location.id ? <input type="text" name="nom_locataire" value={updatedLocationData.nom_vendeur} onChange={handleInputChange} /> : location.nom_vendeur}</td>
                            <td>{editingId === location.id ? <input type="text" name="telephone_locataire" value={updatedLocationData.telephone_vendeur} onChange={handleInputChange} /> : location.telephone_vendeur}</td>
                            <td>
                                {editingId === location.id ?
                                    <button className="save-button" onClick={() => handleSave(location.id)}>Enregistrer</button>
                                    :
                                    <button onClick={() => handleUpdate(location.id)}>
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                }
                                <button onClick={() => handleDelete(location.id)}>
                                    <FontAwesomeIcon icon={faTrash} className="delete-icon" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default LocationList; // Exportez le composant mis à jour
