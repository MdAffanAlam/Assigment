const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 5000;


app.use(cors());


app.get("/api/matches", async (req, res) => {
  const options = {
    method: "GET",
    url: "https://api-football-v1.p.rapidapi.com/v3/fixtures",
    params: {
      league: "39",     
      season: "2024",   
      next: "10"        
    },
    headers: {
      "x-rapidapi-key": "310e2aedb8mshfc3f98599dec7e1p100586jsn8fdc1192dd63",
      "x-rapidapi-host": "api-football-v1.p.rapidapi.com"
    }
  };

  try {
    const response = await axios.request(options);
    const matches = response.data.response;
    const simplifiedMatches = matches.map(match => ({
      homeTeam: match.teams.home.name,
      awayTeam: match.teams.away.name,
      date: match.fixture.date
    }));

    res.json(simplifiedMatches);
  } catch (error) {
    console.error("Error fetching matches:", error.message);
    res.status(500).json({ error: "Failed to fetch matches" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
