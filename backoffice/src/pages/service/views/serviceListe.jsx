import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { deleteService, updateService } from "../../../store/services";
import { faTrash, faEdit, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

function ServiceList() {
    const [services, setServices] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [updatedServiceData, setUpdatedServiceData] = useState({});
    const [editingId, setEditingId] = useState(null);
    const [sortBy, setSortBy] = useState('nom'); // Critère de tri initial
    const [sortOrder, setSortOrder] = useState('asc'); // Ordre de tri initial
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch('http://localhost:7000/services');
                const data = await response.json();
                setServices(data);
            } catch (error) {
                console.error('Erreur lors de la récupération des services :', error);
            }
        };

        fetchServices();
    }, []);

    const filteredServices = services.filter(service =>
        service.nom.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedServices = filteredServices.sort((a, b) => {
        const sortOrderValue = sortOrder === 'asc' ? 1 : -1;
        return a[sortBy] > b[sortBy] ? sortOrderValue : -sortOrderValue;
    });

    const handleDelete = (id) => {
        dispatch(deleteService(id));
    };

    const handleUpdate = (id) => {
        setEditingId(id);
        setUpdatedServiceData(filteredServices.find(service => service.id === id));
    };

    const handleSave = (id) => {
        dispatch(updateService({ id, body: updatedServiceData }));
        setEditingId(null);
    };

    const handleInputChange = (e) => {
        setUpdatedServiceData({
            ...updatedServiceData,
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
<h1 style={{ color: "royalblue" }}>Liste des services</h1>
            <div className='d-flex justify-content-between'>
                <input
                    className='search-input'
                    type="text"
                    placeholder="Rechercher par nom..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
                <Link to="/addService" className="add-service-link">
                    <FontAwesomeIcon icon={faPlusCircle} size="2x" className="add-service-icon" />
                    <span className="add-service-tooltip">Ajouter un service</span>
                </Link>
            </div>
            <table className="service-table">
                <thead>
                    <tr>
                        <th onClick={() => handleSort('nom')}>Nom</th>
                        <th onClick={() => handleSort('prix')}>Prix</th>
                        <th onClick={() => handleSort('lieu')}>Lieu</th>
                        <th onClick={() => handleSort('description')}>Description</th>
                        <th onClick={() => handleSort('adminId')}>adminId</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedServices.map(service => (
                        <tr key={service.id}>
                            <td>{editingId === service.id ? <input type="text" name="nom" value={updatedServiceData.nom} onChange={handleInputChange} /> : service.nom}</td>
                            <td>{editingId === service.id ? <input type="text" name="prix" value={updatedServiceData.prix} onChange={handleInputChange} /> : service.prix}</td>
                            <td>{editingId === service.id ? <input type="text" name="lieu" value={updatedServiceData.lieu} onChange={handleInputChange} /> : service.lieu}</td>
                            <td>{editingId === service.id ? <input type="text" name="description" value={updatedServiceData.description} onChange={handleInputChange} /> : service.description}</td>
                            <td>{editingId === service.id ? <input type="text" name="adminId" value={updatedServiceData.adminId} onChange={handleInputChange} /> : service.adminId}</td>
                            <td>
                                {editingId === service.id ?
                                    <button className="save-button" onClick={() => handleSave(service.id)}>Enregistrer</button>
                                    :
                                    <button onClick={() => handleUpdate(service.id)}>
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                }
                                <button onClick={() => handleDelete(service.id)}>
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

export default ServiceList;
