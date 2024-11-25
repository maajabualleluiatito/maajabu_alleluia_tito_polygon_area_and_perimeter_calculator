// Import necessary libraries
import { useState } from "react";
import axios from "axios";

/**
 * Component: Polygon Calculator
 * Combines an introduction to the app with the calculator functionality.
 * Validates inputs to ensure that the number of sides is an integer greater than 2.
 */
export default function Home() {
  // State variables for user inputs and results
  const [numSides, setNumSides] = useState(""); // Number of sides of the polygon
  const [sideLength, setSideLength] = useState(""); // Length of one side of the polygon
  const [area, setArea] = useState(null); // Computed area of the polygon
  const [perimeter, setPerimeter] = useState(null); // Computed perimeter of the polygon
  const [unit, setUnit] = useState("cm"); // Unit of measurement for inputs and results
  const [error, setError] = useState(""); // Error message to display in case of invalid input or API issues

  /**
   * Function: calculate
   * Sends input data to the server API and retrieves calculated area and perimeter.
   * Displays results or an error message based on the API response.
   */
  const calculate = async () => {
    // Validate user inputs
    if (!numSides || !sideLength) {
      setError("Please fill in all fields.");
      return;
    }

    // Ensure the number of sides is an integer greater than 2
    if (!Number.isInteger(Number(numSides)) || numSides <= 2) {
      setError("Number of sides must be an integer greater than 2.");
      return;
    }

    // Ensure side length is positive
    if (sideLength <= 0) {
      setError("Side length must be a positive number.");
      return;
    }

    try {
      setError(""); // Clear any existing error messages

      // Send calculation request to API
      const response = await axios.post("/api/calculate", {
        numSides: parseInt(numSides), // Convert number of sides to integer
        sideLength: parseFloat(sideLength), // Convert side length to float
        unit, // Include selected unit in request
      });

      // Update results state with API response data
      setArea(response.data.area);
      setPerimeter(response.data.perimeter);
    } catch (err) {
      // Handle errors (e.g., API or network issues)
      setError("An error occurred while calculating. Please try again.");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto", fontFamily: "Arial, sans-serif" }}>
      {/* Introduction Section */}
      <div>
        <h1>Polygon Calculator</h1>
        <p>
          Welcome to the Polygon Calculator! Use this app to calculate the area and perimeter of regular polygons.
          Simply enter the number of sides, the side length, and select the unit of measurement.
        </p>
      </div>

      {/* Calculator Section */}
      <div style={{ marginTop: "20px" }}>
        {/* Input: Number of sides */}
        <div style={{ marginBottom: "10px" }}>
          <label>Number of Sides:</label>
          <input
            type="number"
            value={numSides}
            onChange={(e) => setNumSides(e.target.value)}
            placeholder="e.g., 5"
            min="3"
            style={{ marginLeft: "10px", padding: "5px", width: "100%" }}
          />
        </div>

        {/* Input: Side length */}
        <div style={{ marginBottom: "10px" }}>
          <label>Side Length:</label>
          <input
            type="number"
            value={sideLength}
            onChange={(e) => setSideLength(e.target.value)}
            placeholder="e.g., 10"
            min="0.01"
            style={{ marginLeft: "10px", padding: "5px", width: "100%" }}
          />
        </div>

        {/* Dropdown: Unit of measurement */}
        <div style={{ marginBottom: "10px" }}>
          <label>Units:</label>
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            style={{ marginLeft: "10px", padding: "5px" }}
          >
            <option value="cm">Centimeters</option>
            <option value="m">Meters</option>
            <option value="in">Inches</option>
          </select>
        </div>

        {/* Calculate button */}
        <button
          onClick={calculate}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007BFF",
            color: "#FFFFFF",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Calculate
        </button>

        {/* Error message */}
        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

        {/* Display results */}
        {area !== null && perimeter !== null && (
          <div style={{ marginTop: "20px", padding: "10px", border: "1px solid #ddd", borderRadius: "5px" }}>
            <h3>Results:</h3>
            <p>Area: {area.toFixed(2)} {unit}²</p>
            <p>Perimeter: {perimeter.toFixed(2)} {unit}</p>
          </div>
        )}
      </div>
    </div>
  );
}

