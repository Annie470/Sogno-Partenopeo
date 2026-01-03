import React, { useState } from 'react';
import { Form, Button, Container, Card, Alert, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import corretto da react-icons/fa

function Login({ onLoginSuccess }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const subLogin = (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const loginData = {
            email: email,
            password: password
        };

        fetch('http://localhost:3001/auth/login', { // Cambia porta da 3001 a 8080
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData)
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => {
                    throw new Error(err.message || 'Errore nel login');
                });
            }
            return response.json();
        })
        .then(data => {
            const token = data.accessToken || data.token; // Controlla entrambi i possibili nomi
            if (token) {
                onLoginSuccess(token);
                navigate('/admin');
            } else {
                setError('Token non ricevuto dal server');
            }
            setLoading(false);
        })
        .catch(error => {
            console.error('Errore durante il login:', error);
            setError(error.message || 'Credenziali non valide. Riprova.');
            setLoading(false);
        });
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <Card style={{ width: '400px', padding: '20px' }}>
                <Card.Body>
                    <h2 className="text-center">Login</h2>
                    <h6 className='text-muted text-center mb-4'>Sogno Partenopeo Admin</h6>
                    
                    {error && <Alert variant="danger">{error}</Alert>}
                    
                    <Form onSubmit={subLogin}>
                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="esempio@esemp.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={loading}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <InputGroup>
                                <Form.Control
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Inserisci password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    disabled={loading}
                                />
                                <Button 
                                    variant="outline-secondary"
                                    onClick={() => setShowPassword(!showPassword)}
                                    disabled={loading}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </Button>
                            </InputGroup>
                        </Form.Group>

                        <Button 
                            variant="dark" 
                            type="submit" 
                            className="w-100"
                            disabled={loading}
                        >
                            {loading ? 'Caricamento...' : 'Login'}
                        </Button>
                    </Form>
                    
                    <div className="mt-3 text-center">
                        <small className="text-muted">
                            Usa le credenziali di un admin registrato per accedere
                        </small>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default Login;