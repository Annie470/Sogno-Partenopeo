import React, { useState } from 'react';
import { Card, Button, Badge, Modal, Alert, Spinner } from 'react-bootstrap';
import { FaUserFriends, FaEnvelope, FaPhone, FaCalendarAlt, FaTrash } from 'react-icons/fa';

function Prenotazione({ data, onDelete, token }) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState('');
    
    const dateFormatter = (dateTimeString) => {
        const date = new Date(dateTimeString);
        return date.toLocaleString('it-IT', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };
    
    const subDelete = () => {
        setDeleting(true);
        setError('');
        
        fetch(`http://localhost:3001/api/prenotazioni/${data.id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            if (response.status === 204) {
                onDelete(data.id);
                setShowDeleteModal(false);
            } else if (response.status === 404) {
                throw new Error('Prenotazione non trovata');
            } else {
                throw new Error('Errore durante l\'eliminazione');
            }
        })
        .catch(error => {
            console.error('Errore:', error);
            setError(error.message || 'Impossibile eliminare la prenotazione');
        })
        .finally(() => {
            setDeleting(false);
        });
    };
    
    return (
        <>
            <Card className="h-100 shadow-sm border-0">
                <Card.Header className="bg-dark text-white d-flex justify-content-between align-items-center">
                    <div>
                        <small>ID: {data.id}</small>
                    </div>
                    <Badge bg="light" text="dark">
                        {data.numeroPersone} <FaUserFriends />
                    </Badge>
                </Card.Header>
                
                <Card.Body>
                    <div className="mb-3">
                        <h5 className="card-title mb-3">{data.nomeCompleto}</h5>        
                        <div className="d-flex align-items-center mb-2">
                            <FaEnvelope className="me-2 text-muted" />
                            <span>{data.email}</span>
                        </div>
                        
                        <div className="d-flex align-items-center mb-3">
                            <FaPhone className="me-2 text-muted" />
                            <span>{data.telefono}</span>
                        </div>
                    </div>
                    
                            <div className="d-flex align-items-center">
                                <FaCalendarAlt className="me-2 text-dark" />
                                <small>
                                    {dateFormatter(data.dataPrenotazione)}
                                </small>
                            </div>
                        
                </Card.Body>
                
                <Card.Footer className="bg-transparent border-top-0">
                    <Button 
                        variant="outline-danger" 
                        size="sm" 
                        onClick={() => setShowDeleteModal(true)}
                        className="w-100"
                    >
                        <FaTrash className="me-1" /> Elimina
                    </Button>
                </Card.Footer>
            </Card>

            <Modal show={showDeleteModal} onHide={() => !deleting && setShowDeleteModal(false)}>
                <Modal.Header closeButton disabled={deleting}>
                    <Modal.Title>Conferma Eliminazione</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {error && (
                        <Alert variant="danger" className="mb-3">
                            {error}
                        </Alert>
                    )}
                    
                    <p>Stai per eliminare la prenotazione di:</p>
                    <ul>
                        <li><strong>Cliente:</strong> {data.nomeCompleto}</li>
                        <li><strong>Data:</strong> {dateFormatter(data.dataPrenotazione)}</li>
                        <li><strong>Persone:</strong> {data.numeroPersone}</li>
                    </ul>
                    <p className="text-danger">Questa azione è irreversibile.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button 
                        variant="secondary" 
                        onClick={() => setShowDeleteModal(false)}
                        disabled={deleting}
                    >
                        Annulla
                    </Button>
                    <Button 
                        variant="danger" 
                        onClick={subDelete}
                        disabled={deleting}
                    >
                        {deleting ? (
                            <>
                                <Spinner animation="border" size="sm" className="me-2" />
                                Eliminando...
                            </>
                        ) : (
                            'Elimina Prenotazione'
                        )}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Prenotazione;