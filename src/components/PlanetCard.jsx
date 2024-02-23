import React, { useState, useEffect } from "react";
import axios from "axios";
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

  return (
    <div className="planet-card">
      <h2>{planet.name}</h2>
      <p>Climate: {planet.climate}</p>
      <p>Population: {planet.population}</p>
      <p>Terrain: {planet.terrain}</p>

      <h3>Residents:</h3>
      {error && <p className="error-message">{error}</p>}
      <ul>
        {residents.length > 0 ? (
          residents.map((resident) => (
            <li key={resident.name}>
              {resident.name} | Height: {resident.height} | Mass:{" "}
              {resident.mass} | Gender: {resident.gender}
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
