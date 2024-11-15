require('dotenv').config();
const express = require('express');
const PnwKit = require('pnwkit');

const app = express();
const port = 3000;

const kit = new PnwKit(process.env.PNW_API_KEY);

app.use(express.static('public'));

app.get('/api/nation/:id', async (req, res) => {
  const nationID = req.params.id;

  try {
    const data = await kit.query({
      nations: {
        id: nationID,
        name: true,
        leaderName: true,
        alliance: { name: true },
      },
    });

    res.json(data.nations[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch nation data' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});