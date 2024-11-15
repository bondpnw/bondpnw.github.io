const express = require('express');
const dotenv = require('dotenv');
const pnwkit = require('pnwkit');

dotenv.config();

const app = express();

// Set the PnW API key
pnwkit.setKey(process.env.PNW_API_KEY);

// Serve static files (like index.html) from the current directory
app.use(express.static(__dirname));

// API endpoint for nation data
app.get('/api/nation/:id', async (req, res) => {
  try {
    const nationID = parseInt(req.params.id, 10);
    if (isNaN(nationID)) {
      return res.status(400).json({ error: 'Invalid Nation ID' });
    }

    const nations = await pnwkit.nationQuery(
      { id: [nationID], first: 1 },
      `nation_name leader_name alliance { name }`
    );

    if (!nations.length) {
      return res.status(404).json({ error: 'Nation not found' });
    }

    const nation = nations[0];
    res.json({
      name: nation.nation_name,
      leaderName: nation.leader_name,
      alliance: nation.alliance || { name: 'None' },
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch nation data' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
