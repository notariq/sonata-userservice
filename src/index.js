const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const db = require('./models/db');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes')

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

//Auth
app.use('/api/auth', authRoutes)

//User
app.use('/api', userRoutes);

db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }).catch(err => {
    console.log('Error: ' + err);
  }
);
