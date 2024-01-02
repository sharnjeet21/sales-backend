const express = require('express');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

const app = express();
const port = 3001;

app.get('/api/sales-data', async (req, res) => {
  try {
    // Open the SQLite database
    const db = await open({
      filename: './sqlite/sales.db',
      driver: sqlite3.Database,
    });

    // Query the database
    const salesData = await db.all('SELECT * FROM Sales');

    res.json(salesData);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
