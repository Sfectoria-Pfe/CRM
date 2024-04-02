import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClients } from "../../../store/client";
import { faTrash, faEdit, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

function ClientList() {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('nom'); // Critère de tri initial
    const [sortOrder, setSortOrder] = useState('asc'); // Ordre de tri initial
    const dispatch = useDispatch();
    const clients = useSelector(state => state.client.clients.items);

    useEffect(() => {
        dispatch(fetchClients());
    }, [dispatch]);

    const filteredClients = clients.filter(client =>
        client.nom.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedClients = filteredClients.sort((a, b) => {
        const sortOrderValue = sortOrder === 'asc' ? 1 : -1;
        return a[sortBy] > b[sortBy] ? sortOrderValue : -sortOrderValue;
    });

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
            <h1 style={{ color: "royalblue" }}>Liste des clients</h1>
            <div className='d-flex justify-content-between'>
                <input
                    className='search-input'
                    type="text"
                    placeholder="Rechercher par nom..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
                <Link to="/addClient" className="add-client-link">
                    <FontAwesomeIcon icon={faPlusCircle} size="2x" className="add-client-icon" />
                    <span className="add-client-tooltip">Ajouter un client</span>
                </Link>
            </div>
            <table className="client-table">
                <thead>
                    <tr>
                        <th onClick={() => handleSort('nom')}>Nom</th>
                        <th onClick={() => handleSort('prenom')}>Prénom</th>
                        <th onClick={() => handleSort('email')}>Email</th>
                        <th onClick={() => handleSort('adresse')}>Adresse</th>
                        <th onClick={() => handleSort('telephone')}>Téléphone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedClients.map(client => (
                        <tr key={client.id}>
                            <td>{client.nom}</td>
                            <td>{client.prenom}</td>
                            <td>{client.email}</td>
                            <td>{client.adresse}</td>
                            <td>{client.telephone}</td>
                            <td>
                                <button>
                                    <FontAwesomeIcon icon={faEdit} />
                                </button>
                                <button>
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

export default ClientList;
