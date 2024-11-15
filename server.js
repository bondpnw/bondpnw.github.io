const express = require('express');
const dotenv = require('dotenv');
const pnwkit = require('pnwkit');

dotenv.config();

const app = express();

// Set the PnW API key
pnwkit.setKey(process.env.PNW_API_KEY);

app.get('/', async (req, res) => {
  try {
    const nations = await pnwkit.nationQuery(
      { id: [100541], first: 1 },
      `nation_name`
    );
    res.json({ nationName: nations[0].nation_name });
  } catch (error) {
    res.status(500).send('Error fetching data: ' + error.message);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
