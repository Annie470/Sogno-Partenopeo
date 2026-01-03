import { useState } from "react";
import { Card, ListGroup } from "react-bootstrap";
import { FaChevronRight } from "react-icons/fa";
import Sala from "./Sala";

type OpeningHours = {
  day: string;
  hours: string;
};

const openingHours: OpeningHours[] = [
  { day: "Lunedì", hours: "12:30 - 15:30 / 19:30 - 23:00" },
  { day: "Martedì", hours: "12:30 - 15:30 / 19:30 - 23:00" },
  { day: "Mercoledì", hours: "12:30 - 15:30 / 19:30 - 23:00" },
  { day: "Giovedì", hours: "12:30 - 15:30 / 19:30 - 23:00" },
  { day: "Venerdì", hours: "12:30 - 15:30 / 19:30 - 23:30" },
  { day: "Sabato", hours: "12:30 - 15:30 / 19:30 - 23:30" },
  { day: "Domenica", hours: "12:30 - 15:30 / 19:30 - 23:00" },
];

const Orari = () => {
  const todayIndex = new Date().getDay();
  const daysMap = [
    "Domenica",
    "Lunedì",
    "Martedì",
    "Mercoledì",
    "Giovedì",
    "Venerdì",
    "Sabato",
  ];
  const today = daysMap[todayIndex];

  const [showSala, setShowSala] = useState(false);

  return (
    <>
      <Card className="bg-transparent border-0 border-bottom pb-3 mb-4">
        <Card.Body className="p-0">
          <Card.Title className="mb-3">
            Ogni giorno, il <strong>meglio</strong> della nostra cucina
          </Card.Title>
          <ListGroup variant="flush">
            {openingHours.map(({ day, hours }) => (
              <ListGroup.Item
                className="bg-transparent border-0 py-1"
                key={day}
                style={
                  day === today ? { color: "#b79653", fontWeight: "bold" } : {}
                }>
                {day}: {hours}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>

      <Card className="bg-transparent border-0 me-5 pe-3 mt-3">
        <Card.Body className="p-0">
          <Card.Title className="mb-3">
            Scopri la <strong>sala</strong> del locale <FaChevronRight className="tert me-2" />{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setShowSala(true);
              }}
              className=" fw-bold">
              vai
            </a>
          </Card.Title>
        </Card.Body>
      </Card>
      <img src="/SPLogo.png" alt="logo" className="spin logo-spin me-3" />

      {showSala && <Sala onClose={() => setShowSala(false)} />}
    </>
  );
};

export default Orari;
