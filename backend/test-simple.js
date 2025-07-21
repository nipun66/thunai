const express = require('express');
const app = express();

app.get('/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Simple test server running on port ${PORT}`);
});
