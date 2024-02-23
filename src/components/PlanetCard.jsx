import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaSun, FaUsers, FaMountain } from 'react-icons/fa';
import "../App.css";

const PlanetCard = ({ planet }) => {
  const [residents, setResidents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchResidents = async () => {
      try {
        const residentData = await Promise.all(
          planet.residents.map(async (residentURL) => {
            const response = await axios.get(residentURL);
            return response.data;
          })
        );
        setResidents(residentData);
        setError(null);
      } catch (error) {
        setError("Error fetching residents. Please try again later.");
        console.error("Error fetching residents:", error.message);
      }
    };

    fetchResidents();
  }, [planet.residents]);

  useEffect(() => {
    const cardElement = document.querySelector('.planet-card');
    cardElement.classList.add('fade-in');

    return () => {
      cardElement.classList.remove('fade-in');
    };
  }, []);
  return (
    <div className="planet-card">
      <h2>{planet.name}</h2>
      <p>
        <span className="icon">
          <FaSun />
        </span>
        Climate: {planet.climate}
      </p>
      <p>
        <span className="icon">
          <FaUsers />
        </span>
        Population: {planet.population}
      </p>
      <p>
        <span className="icon">
          <FaMountain />
        </span>
        Terrain: {planet.terrain}
      </p>

      <h3>Residents:</h3>
      {error && <p className="error-message">{error}</p>}
      <ul>
        {residents.length > 0 ? (
          residents.map((resident) => (
            <li key={resident.name}>
              {resident.name} | Height: {resident.height} | Mass: {resident.mass} | Gender: {resident.gender}
            </li>
          ))
        ) : (
          <li>No residents for this planet</li>
        )}
      </ul>
    </div>
  );
};

export default PlanetCard;
