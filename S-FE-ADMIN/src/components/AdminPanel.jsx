import React, { useState, useEffect } from 'react';
import { 
    Container, 
    Row, 
    Col, 
    Card, 
    Button, 
    Form, 
    InputGroup, 
    Alert,
    Spinner,
    Modal,
    Badge
} from 'react-bootstrap';
import { FaSearch, FaCalendarAlt, FaTrash, FaTrashAlt, FaEye, FaSync, FaLock } from 'react-icons/fa';
import Prenotazione from './Prenotazione';

function AdminPanel({ token, onLogout }) {
    const [prenotazioni, setPrenotazioni] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [searchId, setSearchId] = useState('');
    const [selectedDate, setSelectedDate] = useState(getTodayDate());
    
    const [showDeleteAllModal, setShowDeleteAllModal] = useState(false);
    const [deletingAll, setDeletingAll] = useState(false);
    

    function getTodayDate() {
        const today = new Date();
        return today.toISOString().split('T')[0];
    }
    

    const loadPrenotazioniByDate = (date = selectedDate) => {
        setLoading(true);
        setError('');
        setSuccessMessage('');
        
        fetch(`http://localhost:3001/api/prenotazioni?data=${date}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                if (response.status === 404) {
                    return [];
                }
                throw new Error('Errore nel caricamento delle prenotazioni');
            }
            return response.json();
        })
        .then(data => {
            setPrenotazioni(data);
            setLoading(false);
        })
        .catch(error => {
            console.error('Errore:', error);
            setError('Impossibile caricare le prenotazioni');
            setLoading(false);
            setPrenotazioni([]);
        });
    };
    

    const refreshPrenotazioni = () => {
        setRefreshing(true);
        loadPrenotazioniByDate();
        setTimeout(() => setRefreshing(false), 500);
    };
    

    useEffect(() => {
        loadPrenotazioniByDate();
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    

    const subSearchById = (e) => {
        e.preventDefault();
        if (!searchId.trim()) {
            setError('Inserisci un ID valido');
            return;
        }
        
        setLoading(true);
        setError('');
        setSuccessMessage('');
        
        fetch(`http://localhost:3001/api/prenotazioni/${searchId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Prenotazione non trovata');
            }
            return response.json();
        })
        .then(data => {
            setPrenotazioni([data]); // Mostra solo la prenotazione trovata
            setLoading(false);
            setSuccessMessage(`Prenotazione ${searchId} trovata`);
        })
        .catch(error => {
            console.error('Errore:', error);
            setError(error.message);
            setLoading(false);
            setPrenotazioni([]);
        });
    };
    

    const subDateChange = (e) => {
        const newDate = e.target.value;
        setSelectedDate(newDate);
        loadPrenotazioniByDate(newDate);
    };
    

const refreshDeletedState = (id) => {
    // Rimuovi direttamente dallo stato locale senza fare una nuova richiesta
    // DELETE è già stata fatta dal componente figlio Prenotazione
    setPrenotazioni(prenotazioni.filter(p => p.id !== id));
    setSuccessMessage('Prenotazione eliminata con successo');
};

    const subDeleteAllExpired = () => {
        setDeletingAll(true);
        
        fetch('http://localhost:3001/api/prenotazioni/cleanup', {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            if (response.status === 204) {
                setShowDeleteAllModal(false);
                setPrenotazioni([]);
                setSuccessMessage('Tutte le prenotazioni passate sono state eliminate');
            } else {
                throw new Error('Errore durante l\'eliminazione');
            }
        })
        .catch(error => {
            console.error('Errore:', error);
            setError('Impossibile eliminare le prenotazioni passate');
        })
        .finally(() => {
            setDeletingAll(false);
        });
    };
    

    const resetView = () => {
        setSearchId('');
        loadPrenotazioniByDate();
    };
    
    const dateFormatterIta = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('it-IT', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };
    
      const chiudiPrenotazioni =()=> {
        const today = getTodayDate();
          fetch(`http://localhost:3001/api/prenotazioni/close`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data: today })
        })   
        .then(response => {
            if (!response.ok) {
                if (response.status === 404) {
                    return [];
                }
                throw new Error('Errore nella chiusura delle prenotazioni');
            }
            return response.json();
        })
        .then(() => {
            setSuccessMessage('Prenotazioni chiuse con successo');
            loadPrenotazioniByDate(selectedDate);
        })
        .catch(error => {
            console.error('Errore:', error);
            setError('Impossibile chiudere le prenotazioni');
        });
    }

    return (
        <Container fluid className="py-4">
            <Row className="mb-4">
                <Col>
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <h1 className="mb-0">Admin Panel</h1>
                            <p className="text-muted">Gestione Prenotazioni Sogno Partenopeo</p>
                        </div>
                        <div className="d-flex gap-2">
                             <Button variant="outline-danger" onClick={chiudiPrenotazioni}>
                                <FaLock /> Chiudi Prenotazioni
                            </Button>
                            <Button 
                                variant="outline-dark" 
                                onClick={refreshPrenotazioni}
                                disabled={refreshing || loading}
                            >
                                {refreshing ? (
                                    <Spinner animation="border" size="sm" />
                                ) : (
                                    <>
                                        <FaSync className="me-1" /> Refresh
                                    </>
                                )}
                            </Button>
                            <Button variant="outline-danger" onClick={onLogout}>
                                Logout
                            </Button>
                        </div>
                    </div>
                </Col>
            </Row>
            

            <Card className="mb-4 shadow">
                <Card.Body>
                    <Row>
                        <Col md={6}>
                            <Form>
                                <Form.Label>Data:</Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        type="date"
                                        value={selectedDate}
                                        onChange={subDateChange}
                                       className="cursor-pointer"
                                    /> 
                                    <Button 
                                        variant="outline-dark"
                                        onClick={resetView}
                                        disabled={loading || refreshing}
                                    >
                                        <FaCalendarAlt /> Cerca
                                    </Button>
                                </InputGroup>
                            </Form>
                        </Col>
                        <Col md={6}>
                            <Form onSubmit={subSearchById}>
                                <Form.Label>ID Prenotazione:</Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        type="text"
                                        placeholder="Inserisci l'ID della prenotazione"
                                        value={searchId}
                                        onChange={(e) => setSearchId(e.target.value)}
                                    />
                                    <Button 
                                         variant="outline-dark"
                                        type="submit"
                                        disabled={loading || refreshing}
                                    >
                                        <FaSearch /> Cerca
                                    </Button>
                                </InputGroup>
                            </Form>
                        </Col>
                        
                        
                    </Row>
                    
      
                    <div className="mt-3 d-flex justify-content-between align-items-center">
                        <Badge bg="secondary" className="p-2">
                            <FaCalendarAlt className="me-2" />
                            Visualizzando prenotazioni per: {dateFormatterIta(selectedDate)}
                        </Badge>
                        <Badge bg="secondary" className="p-2">
                            Totale: {prenotazioni.length} prenotazioni
                        </Badge>
                    </div>
                </Card.Body>
            </Card>
     
            {error && (
                <Alert variant="danger" onClose={() => setError('')} dismissible>
                    {error}
                </Alert>
            )}
            
            {successMessage && (
                <Alert variant="success" onClose={() => setSuccessMessage('')} dismissible>
                    {successMessage}
                </Alert>
            )}
            
            <Card className="shadow">
                <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <Card.Title className="mb-0">
                            Prenotazioni ({prenotazioni.length})
                        </Card.Title>
                        {loading && (
                            <Spinner animation="border" size="sm" variant="primary" />
                        )}
                    </div>
                    
                    {loading ? (
                        <div className="text-center py-5">
                            <Spinner animation="border" variant="primary" />
                            <p className="mt-3">Caricamento prenotazioni...</p>
                        </div>
                    ) : prenotazioni.length === 0 ? (
                        <Alert variant="info">
                            <FaEye className="me-2" />
                            Nessuna prenotazione trovata per la data selezionata.
                        </Alert>
                    ) : (
                        <Row>
                            {prenotazioni.map((prenotazione) => (
                                <Col key={prenotazione.id} xs={12} md={6} lg={4} className="mb-4">
                                    <Prenotazione 
                                        data={prenotazione}
                                        onDelete={refreshDeletedState}
                                        token={token}
                                    />
                                </Col>
                            ))}
                        </Row>
                    )}
                </Card.Body>
            </Card>
            

            <div className="position-fixed bottom-0 end-0 m-4">
                <Button 
                    variant="danger" 
                    size="lg"
                    onClick={() => setShowDeleteAllModal(true)}
                    className="rounded shadow-lg"
                    title="Elimina tutte le prenotazioni passate"
                >
                    <FaTrashAlt /> Pulizia Database
                </Button>
            </div>
            
            {/* Modal di conferma eliminazione totale */}
            <Modal show={showDeleteAllModal} onHide={() => !deletingAll && setShowDeleteAllModal(false)}>
                <Modal.Header closeButton disabled={deletingAll}>
                    <Modal.Title>Conferma Eliminazione</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Alert variant="warning">
                        <FaTrash className="me-2" />
                        <strong>Attenzione!</strong> Stai per eliminare tutte le prenotazioni passate.
                        Questa azione è irreversibile. Vuoi procedere?
                    </Alert>
                </Modal.Body>
                <Modal.Footer>
                    <Button 
                        variant="secondary" 
                        onClick={() => setShowDeleteAllModal(false)}
                        disabled={deletingAll}
                    >
                        Annulla
                    </Button>
                    <Button 
                        variant="danger" 
                        onClick={subDeleteAllExpired}
                        disabled={deletingAll}
                    >
                        {deletingAll ? (
                            <>
                                <Spinner animation="border" size="sm" className="me-2" />
                                Eliminazione...
                            </>
                        ) : (
                            'Elimina Tutto'
                        )}
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default AdminPanel;