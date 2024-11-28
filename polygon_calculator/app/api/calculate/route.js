/**
 * API Route: Calculate Area and Perimeter of a Regular Polygon
 * Accepts POST requests with `numSides`, `sideLength`, and `unit` in the body.
 * Validates inputs and calculates area and perimeter for valid polygons.
 */

// Handle POST request
export async function POST(req) {
  // Parse the JSON body from the request
  const { numSides, sideLength, unit } = await req.json();

  // Validate required inputs
  if (!numSides || !sideLength || !unit) {
    return new Response(
      JSON.stringify({ error: "Missing required input(s): numSides, sideLength, and unit are required." }),
      { status: 400 }
    );
  }

  // Ensure `numSides` is an integer greater than or equal to 3
  if (!Number.isInteger(numSides) || numSides < 3) {
    return new Response(
      JSON.stringify({ error: "Number of sides must be an integer greater than or equal to 3." }),
      { status: 400 }
    );
  }

  // Ensure `sideLength` is a positive number
  if (sideLength <= 0) {
    return new Response(
      JSON.stringify({ error: "Side length must be a positive number." }),
      { status: 400 }
    );
  }

  try {
    // Calculate the perimeter of the polygon
    const perimeter = numSides * sideLength;

    // Calculate the area of the polygon
    // Formula: (1/4) * n * s^2 * cot(π/n), where `n` is numSides, `s` is sideLength
    const angle = Math.PI / numSides;
    const area = (1 / 4) * numSides * Math.pow(sideLength, 2) / Math.tan(angle);

    // Respond with the calculated area and perimeter
    return new Response(
      JSON.stringify({
        area: parseFloat(area.toFixed(2)), // Return area rounded to 2 decimal places
        perimeter: parseFloat(perimeter.toFixed(2)), // Return perimeter rounded to 2 decimal places
        unit,
      }),
      { status: 200 }
    );
  } catch (error) {
    // Catch and handle unexpected errors
    console.error("Calculation error:", error);
    return new Response(
      JSON.stringify({ error: "An error occurred while performing the calculation." }),
      { status: 500 }
    );
  }
}

// Handle other HTTP methods (if needed, such as GET, PUT, DELETE)
export async function GET(req) {
  return new Response(
    JSON.stringify({ message: "This API only supports POST requests." }),
    { status: 405 }
  );
}
