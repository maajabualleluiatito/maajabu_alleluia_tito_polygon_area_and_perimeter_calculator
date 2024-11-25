export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { numSides, sideLength, unit } = req.body;

  if (!numSides || !sideLength || numSides < 3) {
    return res.status(400).json({ error: "Invalid input" });
  }

  try {
    const perimeter = numSides * sideLength;
    const angle = Math.PI / numSides;
    const area = (1 / 4) * numSides * Math.pow(sideLength, 2) / Math.tan(angle);

    res.status(200).json({ area, perimeter, unit });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while calculating" });
  }
}

