/**
 * API Route: Calculate Area and Perimeter of a Regular Polygon
 * Accepts POST requests with `numSides`, `sideLength`, and `unit` in the body.
 * Validates inputs and calculates area and perimeter for valid polygons.
 */
export default function handler(req, res) {
  // Allow only POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed. Use POST instead." });
  }

  const { numSides, sideLength, unit } = req.body;

  // Validate required inputs
  if (!numSides || !sideLength || !unit) {
    return res.status(400).json({ error: "Missing required input(s): numSides, sideLength, and unit are required." });
  }

  // Ensure `numSides` is an integer greater than or equal to 3
  if (!Number.isInteger(numSides) || numSides < 3) {
    return res.status(400).json({ error: "Number of sides must be an integer greater than or equal to 3." });
  }

  // Ensure `sideLength` is a positive number
  if (sideLength <= 0) {
    return res.status(400).json({ error: "Side length must be a positive number." });
  }

  try {
    // Calculate the perimeter of the polygon
    const perimeter = numSides * sideLength;

    // Calculate the area of the polygon
    // Formula: (1/4) * n * s^2 * cot(π/n), where `n` is numSides, `s` is sideLength
    const angle = Math.PI / numSides;
    const area = (1 / 4) * numSides * Math.pow(sideLength, 2) / Math.tan(angle);

    // Respond with the calculated area and perimeter
    res.status(200).json({
      area: parseFloat(area.toFixed(2)), // Return area rounded to 2 decimal places
      perimeter: parseFloat(perimeter.toFixed(2)), // Return perimeter rounded to 2 decimal places
      unit,
    });
  } catch (error) {
    // Catch and handle unexpected errors
    console.error("Calculation error:", error);
    res.status(500).json({ error: "An error occurred while performing the calculation." });
  }
}

