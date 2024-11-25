import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [numSides, setNumSides] = useState("");
  const [sideLength, setSideLength] = useState("");
  const [area, setArea] = useState(null);
  const [perimeter, setPerimeter] = useState(null);
  const [unit, setUnit] = useState("cm");
  const [error, setError] = useState("");

  const calculate = async () => {
    if (!numSides || !sideLength) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setError("");
      const response = await axios.post("/api/calculate", {
        numSides: parseInt(numSides),
        sideLength: parseFloat(sideLength),
        unit,
      });
      setArea(response.data.area);
      setPerimeter(response.data.perimeter);
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Polygon Area and Perimeter Calculator</h1>
      <div>
        <label>Number of Sides:</label>
        <input
          type="number"
          value={numSides}
          onChange={(e) => setNumSides(e.target.value)}
        />
      </div>
      <div>
        <label>Side Length:</label>
        <input
          type="number"
          value={sideLength}
          onChange={(e) => setSideLength(e.target.value)}
        />
      </div>
      <div>
        <label>Units:</label>
        <select value={unit} onChange={(e) => setUnit(e.target.value)}>
          <option value="cm">Centimeters</option>
          <option value="m">Meters</option>
          <option value="in">Inches</option>
        </select>
      </div>
      <button onClick={calculate}>Calculate</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {area !== null && perimeter !== null && (
        <div>
          <h3>Results:</h3>
          <p>Area: {area.toFixed(2)} {unit}²</p>
          <p>Perimeter: {perimeter.toFixed(2)} {unit}</p>
        </div>
      )}
    </div>
  );
}

