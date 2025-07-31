const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
app.use(cors());

const PORT = process.env.PORT || 10000;

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`HTN backend running at http://localhost:${PORT}`);
});
