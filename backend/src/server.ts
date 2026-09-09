import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://alyarshelle.github.io",
    ],
  })
);

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ message: "GameGrid API is running!" });
});

app.get(
  "/api/scoreboard/volleyball-women/d1/:year/:month/:day/all-conf",
  async (req, res) => {
    try {
      const { year, month, day } = req.params;

      const response = await fetch(
        `https://ncaa-api.henrygd.me/scoreboard/volleyball-women/d1/${year}/${month}/${day}/all-conf`
      );

      if (!response.ok) {
        return res.status(response.status).json({
          error: `NCAA API returned ${response.status}`,
        });
      }

      const data = await response.json();

      res.json(data);
    } catch (error) {
      console.error("NCAA API error:", error);

      res.status(500).json({
        error: "Failed to fetch NCAA data",
      });
    }
  }
);

app.get(
  "/api/rankings/volleyball-women/d1/avca-rankings",
  async (_req, res) => {
    try {
      const response = await fetch(
        "https://ncaa-api.henrygd.me/rankings/volleyball-women/d1/avca-rankings"
      );

      if (!response.ok) {
        return res.status(response.status).json({
          error: `NCAA API returned ${response.status}`,
        });
      }

      const data = await response.json();

      res.json(data);
    } catch (error) {
      console.error("NCAA rankings API error:", error);

      res.status(500).json({
        error: "Failed to fetch NCAA rankings",
      });
    }
  }
);

app.get("/api/game/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const response = await fetch(
      `https://ncaa-api.henrygd.me/game/${id}`
    );

    if (!response.ok) {
      return res.status(response.status).json({
        error: `NCAA API returned ${response.status}`,
      });
    }

    const data = await response.json();

    res.json(data);
  } catch (error) {
    console.error("NCAA game API error:", error);

    res.status(500).json({
      error: "Failed to fetch NCAA game data",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});