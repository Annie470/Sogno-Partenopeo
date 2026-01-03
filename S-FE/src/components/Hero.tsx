import React, { useState } from "react";
import { Card, Form, Button, Row, Col, Alert } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type FasciaOraria = "pranzo" | "cena";
const FASCE_ORARIE = {
  PRANZO: "pranzo" as FasciaOraria,
  CENA: "cena" as FasciaOraria,
} as const;

interface PrenotazioneResponse {
  id: string;
  numeroPersone: number;
  dataPrenotazione: string;
  email: string;
  telefono: string;
  nomeCompleto: string;
}

const Hero: React.FC = () => {
  const [numeroPersone, setNumeroPersone] = useState<number>(2);
  const [dataPrenotazione, setDataPrenotazione] = useState<Date>(() => {
    const now = new Date();
    now.setHours(19, 30, 0, 0);
    return now;
  });
  const [email, setEmail] = useState<string>("");
  const [telefono, setTelefono] = useState<string>("");
  const [nomeCompleto, setNomeCompleto] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fasciaOraria, setFasciaOraria] = useState<FasciaOraria>(
    FASCE_ORARIE.CENA
  );

  //genera orari in base alla fascia
  const generateTimeSlots = (fascia: FasciaOraria): string[] => {
    const slots: string[] = [];

    if (fascia === FASCE_ORARIE.PRANZO) {
      for (let hour = 12; hour <= 15; hour++) {
        for (let minute = 0; minute < 60; minute += 15) {
          if (hour === 12 && minute < 30) continue;
          if (hour === 15 && minute > 0) break;
          slots.push(
            `${hour.toString().padStart(2, "0")}:${minute
              .toString()
              .padStart(2, "0")}`
          );
        }
      }
    } else {
      for (let hour = 19; hour <= 22; hour++) {
        for (let minute = 0; minute < 60; minute += 15) {
          if (hour === 19 && minute < 30) continue;
          if (hour === 22 && minute > 45) break;
          slots.push(
            `${hour.toString().padStart(2, "0")}:${minute
              .toString()
              .padStart(2, "0")}`
          );
        }
      }
    }

    return slots;
  };

  const aggiornaOrariPerFascia = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nuovaFascia = e.target.value as FasciaOraria;
    setFasciaOraria(nuovaFascia);

    const nuoviOrari = generateTimeSlots(nuovaFascia);
    if (nuoviOrari.length > 0) {
      const [ore, minuti] = nuoviOrari[0].split(":").map(Number);
      const nuovaData = new Date(dataPrenotazione);
      nuovaData.setHours(ore, minuti, 0, 0);
      setDataPrenotazione(nuovaData);
    }
  };

  const dateFormatter = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  };

  const subForm = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setMessage("");
    setIsLoading(true);

    if (numeroPersone < 1 || numeroPersone > 12) {
      setMessage(
        "Prenotazione concessa per max 12 persone, per ulteriori coperti chiamare il ristorante!"
      );
      setIsLoading(false);
      return;
    }

    // Verifica
    const orariValidi = generateTimeSlots(fasciaOraria);
    const oraSelezionata = `${dataPrenotazione
      .getHours()
      .toString()
      .padStart(2, "0")}:${dataPrenotazione
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;

    if (!orariValidi.includes(oraSelezionata)) {
      setMessage(
        `Seleziona un orario valido per il ${
          fasciaOraria === FASCE_ORARIE.PRANZO ? "pranzo" : "cena"
        }`
      );
      setIsLoading(false);
      return;
    }

    const prenotazioneData = {
      numeroPersone,
      dataPrenotazione: dateFormatter(dataPrenotazione),
      email,
      telefono,
      nomeCompleto,
    };

    fetch("http://localhost:3001/api/prenotazioni", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(prenotazioneData),
    })
      .then(async (response: Response) => {
        if (!response.ok) {
          const data = await response.json();
          const errorsText = data.errors?.join(", ");
          const messageErr = `${data.message}: ${errorsText}`;
          throw new Error(messageErr);
        }
        return response.json() as Promise<PrenotazioneResponse>;
      })
      .then(() => {
        setIsSuccess(true);
        setMessage(
          "Prenotazione effettuata con successo! Ti abbiamo inviato una mail di conferma."
        );
        setNumeroPersone(2);
        const now = new Date();
        now.setHours(19, 30, 0, 0);
        setDataPrenotazione(now);
        setFasciaOraria(FASCE_ORARIE.CENA);
        setEmail("");
        setTelefono("");
        setNomeCompleto("");
      })
      .catch((error: Error) => {
        setIsSuccess(false);
        setMessage(`${error.message}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const subImpostaOrario = (date: Date | null): void => {
    if (date) {
      const currentHours = dataPrenotazione.getHours();
      const currentMinutes = dataPrenotazione.getMinutes();
      date.setHours(currentHours, currentMinutes, 0, 0);
      setDataPrenotazione(date);
    }
  };

  interface TimePickerProps {
    date: Date;
    onChange: (date: Date) => void;
    fascia: FasciaOraria;
  }

  // TimePicker
  const TimePickerComponent: React.FC<TimePickerProps> = ({
    date,
    onChange,
    fascia,
  }) => {
    const timeSlots = generateTimeSlots(fascia);
    const currentTime = `${date.getHours().toString().padStart(2, "0")}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;

    const handleTimeChange = (
      e: React.ChangeEvent<HTMLSelectElement>
    ): void => {
      const [hours, minutes] = e.target.value.split(":").map(Number);
      const newDate = new Date(date);
      newDate.setHours(hours, minutes);
      onChange(newDate);
    };

    return (
      <Form.Select
        value={currentTime}
        onChange={handleTimeChange}
        className="mt-2">
        {timeSlots.map((time) => (
          <option key={time} value={time}>
            {time}
          </option>
        ))}
      </Form.Select>
    );
  };

  return (
    <Card className="bg-transparent border-0">
      <Card.Title className="mb-4 text-center">
        <h2>
          Prenota un <strong>tavolo</strong> da Sogno
        </h2>
        <p className="mt-2 mb-0">
          Aperto <strong>tutti</strong> i giorni!
        </p>
      </Card.Title>

      <Form onSubmit={subForm}>
        <Row className="mb-3 d-flex align-items-center justify-content-center">
          <Col xs={10} md={10} className="text-start mb-1">
            <Form.Group controlId="formNomeCompleto">
              <Form.Control
                type="text"
                placeholder="Nome e Cognome "
                value={nomeCompleto}
                onChange={(e) => setNomeCompleto(e.target.value)}
                required
                minLength={2}
                maxLength={100}
              />
            </Form.Group>
          </Col>

          <Col xs={10} md={10} className="text-start mb-1">
            <Form.Group controlId="formEmail">
              <Form.Control
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
          </Col>

          <Col xs={10} md={10} className="text-start">
            <Form.Group controlId="formTelefono">
              <Form.Control
                type="tel"
                placeholder="Telefono"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                required
                pattern="^\+?[0-9]{9,15}$"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3 align-items-center justify-content-center">
          <Col xs={4} md={4} className="text-start">
            <Form.Group controlId="formNumeroPersone">
              <Form.Select
                value={numeroPersone}
                onChange={(e) => setNumeroPersone(Number(e.target.value))}
                required>
                {Array.from({ length: 12 }, (_, i) => i + 1).map((num) => (
                  <option key={num} value={num}>
                    {num} pax
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          <Col xs={6} md={6}>
            <Form.Group controlId="formData">
              <DatePicker
                selected={dataPrenotazione}
                onChange={subImpostaOrario}
                dateFormat="dd/MM/yyyy"
                className="form-control"
                minDate={new Date()}
                placeholderText="Seleziona una data"
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3 align-items-center justify-content-center">
          <Col xs={10} md={10} className="text-start ">
            <Form.Group controlId="formFasciaOraria">
              <Form.Select
                value={fasciaOraria}
                onChange={aggiornaOrariPerFascia}>
                <option value={FASCE_ORARIE.PRANZO}>
                  Pranzo (12:30 - 15:00)
                </option>
                <option value={FASCE_ORARIE.CENA}>Cena (19:30 - 22:45)</option>
              </Form.Select>
            </Form.Group>
          </Col>

          <Col xs={10} md={10}>
            <Form.Group controlId="formOra">
              <TimePickerComponent
                date={dataPrenotazione}
                onChange={setDataPrenotazione}
                fascia={fasciaOraria}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3 align-items-center justify-content-center">
          <Col xs={10} md={10}>
            <Button
              variant="primary"
              type="submit"
              size="lg"
              disabled={isLoading}
              className="w-100">
              {isLoading ? "Prenotazione in corso..." : "Prenota Ora"}
            </Button>
          </Col>
          <Col xs={10} md={10}>
            {message && (
              <Alert
                variant={isSuccess ? "success" : "danger"}
                className="mt-3">
                {message}
              </Alert>
            )}
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default Hero;
