import React, { useState, useEffect } from "react";
import axios from "axios";
import PlanetCard from "./PlanetCard";
import "../App.css";

const PlanetsDirectory = () => {
  const [planets, setPlanets] = useState([]);
  const [nextPage, setNextPage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPlanets = async (
    url = "https://swapi.dev/api/planets/?format=json"
  ) => {
    try {
      setLoading(true);
      const response = await axios.get(url);
      const data = response.data;
      setPlanets((prevPlanets) => [...prevPlanets, ...data.results]);
      setNextPage(data.next);
      setError(null);
    } catch (error) {
      setError("Error fetching planets. Please try again later.");
      console.error("Error fetching planets:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlanets();
  }, []);

  const handlePagination = () => {
    if (nextPage && !loading) {
      fetchPlanets(nextPage);
    }
  };

  return (
    <div className="planets-directory">
      <header className="project-header">
        <h1>Star Wars Planets Directory</h1>
        <p>
          Welcome to the Star Wars Planets Directory project! This web
          application fetches information about planets from the Star Wars API
          (SWAPI) and presents it in an interactive and visually appealing
          format.
        </p>
      </header>

      {error && <p className="error-message">{error}</p>}
      {planets.map((planet) => (
        <PlanetCard key={planet.name} planet={planet} />
      ))}

      {nextPage && (
        <button
          onClick={handlePagination}
          className="pagination-button"
          disabled={loading}
        >
          {loading ? "Loading..." : "Next"}
        </button>
      )}
    </div>
  );
};

export default PlanetsDirectory;
