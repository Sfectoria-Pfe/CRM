import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { deleteVente, updateVente } from "../../../store/vente";
import { faTrash, faEdit, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

function VenteList() {
    const [ventes, setVentes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [updatedVenteData, setUpdatedVenteData] = useState({});
    const [editingId, setEditingId] = useState(null);
    const [sortBy, setSortBy] = useState('nom'); // Critère de tri initial
    const [sortOrder, setSortOrder] = useState('asc'); // Ordre de tri initial
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchVentes = async () => {
            try {
                const response = await fetch('http://localhost:7000/ventes');
                const data = await response.json();
                setVentes(data);
            } catch (error) {
                console.error('Erreur lors de la récupération des ventes :', error);
            }
        };

        fetchVentes();
    }, []);

    const filteredVentes = ventes.filter(vente =>
        vente.nom.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedVentes = filteredVentes.sort((a, b) => {
        const sortOrderValue = sortOrder === 'asc' ? 1 : -1;
        return a[sortBy] > b[sortBy] ? sortOrderValue : -sortOrderValue;
    });

    const handleDelete = (id) => {
        dispatch(deleteVente(id));
    };

    const handleUpdate = (id) => {
        setEditingId(id);
        setUpdatedVenteData(filteredVentes.find(vente => vente.id === id));
    };

    const handleSave = (id) => {
        dispatch(updateVente({ id, body: updatedVenteData }));
        setEditingId(null);
    };

    const handleInputChange = (e) => {
        setUpdatedVenteData({
            ...updatedVenteData,
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
            <h1 style={{ color: "royalblue" }}>Liste des ventes</h1>
            <div className='d-flex justify-content-between'>
                <input
                    className='search-input'
                    type="text"
                    placeholder="Rechercher par nom..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
                <Link to="/addVente" className="add-vente-link">
                    <FontAwesomeIcon icon={faPlusCircle} size="2x" className="add-vente-icon" />
                    <span className="add-vente-tooltip">Ajouter une vente</span>
                </Link>
            </div>
            <table className="service-table">
                <thead>
                    <tr>
                        <th onClick={() => handleSort('nom')}>Nom</th>
                        <th onClick={() => handleSort('prix')}>Prix</th>
                        <th onClick={() => handleSort('lieu')}>Lieu</th>
                        <th onClick={() => handleSort('description')}>Description</th>
                        <th onClick={() => handleSort('date_vente')}>Date de vente</th>
                        <th onClick={() => handleSort('nom_vendeur')}>Nom du vendeur</th>
                        <th onClick={() => handleSort('telephone_vendeur')}>Téléphone du vendeur</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedVentes.map(vente => (
                        <tr key={vente.id}>
                            <td>{editingId === vente.id ? <input type="text" name="nom" value={updatedVenteData.nom} onChange={handleInputChange} /> : vente.nom}</td>
                            <td>{editingId === vente.id ? <input type="text" name="prix" value={updatedVenteData.prix} onChange={handleInputChange} /> : vente.prix}</td>
                            <td>{editingId === vente.id ? <input type="text" name="lieu" value={updatedVenteData.lieu} onChange={handleInputChange} /> : vente.lieu}</td>
                            <td>{editingId === vente.id ? <input type="text" name="description" value={updatedVenteData.description} onChange={handleInputChange} /> : vente.description}</td>
                            <td>{editingId === vente.id ? <input type="text" name="date_vente" value={updatedVenteData.date_vente} onChange={handleInputChange} /> : vente.date_vente}</td>
                            <td>{editingId === vente.id ? <input type="text" name="nom_vendeur" value={updatedVenteData.nom_vendeur} onChange={handleInputChange} /> : vente.nom_vendeur}</td>
                            <td>{editingId === vente.id ? <input type="text" name="telephone_vendeur" value={updatedVenteData.telephone_vendeur} onChange={handleInputChange} /> : vente.telephone_vendeur}</td>
                            <td>
                                {editingId === vente.id ?
                                    <button className="save-button" onClick={() => handleSave(vente.id)}>Enregistrer</button>
                                    :
                                    <button onClick={() => handleUpdate(vente.id)}>
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                }
                                <button onClick={() => handleDelete(vente.id)}>
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

export default VenteList;
