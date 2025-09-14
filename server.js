// Section B: Backend code snippets (Node.js + Express + MySQL)
const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const app = express();
app.use(express.json());

const dbConfig = {
  host: 'localhost',
  user: 'your_db_user',
  password: 'your_db_password',
  database: 'your_db_name'
};

// Register / Signup
app.post('/signup', async (req, res) => {
  const { name, email, phone, state, password } = req.body;
  if (!name || !email || !phone || !state || !password) {
    return res.status(400).json({ error: 'All fields required.' });
  }
  // Basic validation (add more robust checks in production)
  const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  const phoneRegex = /^\d{10,20}$/;
  if (!emailRegex.test(email)) return res.status(400).json({ error: 'Invalid email.' });
  if (!phoneRegex.test(phone)) return res.status(400).json({ error: 'Invalid phone.' });
  try {
    const conn = await mysql.createConnection(dbConfig);
    const [existing] = await conn.execute('SELECT id FROM users WHERE email = ? OR phone = ?', [email, phone]);
    if (existing.length > 0) return res.status(409).json({ error: 'Email or phone already registered.' });
    const password_hash = await bcrypt.hash(password, 10);
    await conn.execute(
      'INSERT INTO users (name, email, phone, state, password_hash) VALUES (?, ?, ?, ?, ?)',
      [name, email, phone, state, password_hash]
    );
    await conn.end();
    res.status(201).json({ message: 'User registered.' });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

// Login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required.' });
  try {
    const conn = await mysql.createConnection(dbConfig);
    const [users] = await conn.execute('SELECT * FROM users WHERE email = ?', [email]);
    await conn.end();
    if (users.length === 0) return res.status(401).json({ error: 'Invalid credentials.' });
    const user = users[0];
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(401).json({ error: 'Invalid credentials.' });
    // Exclude password_hash from response
    const { password_hash, ...profile } = user;
    res.json({ message: 'Login successful.', user: profile });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

// Fetch user profile (by id)
app.get('/user/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const conn = await mysql.createConnection(dbConfig);
    const [users] = await conn.execute('SELECT id, name, email, phone, state, email_verified, phone_verified, created_at, updated_at FROM users WHERE id = ?', [id]);
    await conn.end();
    if (users.length === 0) return res.status(404).json({ error: 'User not found.' });
    res.json(users[0]);
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));

// Save user search history securely
app.post('/search-history', async (req, res) => {
  const { user_id, query } = req.body;
  if (!user_id || !query) return res.status(400).json({ error: 'Missing user_id or query.' });
  try {
    const conn = await mysql.createConnection(dbConfig);
    await conn.execute('INSERT INTO search_history (user_id, query) VALUES (?, ?)', [user_id, query]);
    await conn.end();
    res.status(201).json({ message: 'Search history saved.' });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

// Add or update a license for a user
app.post('/license', async (req, res) => {
  const { user_id, license_type, state, city, issued_at, expires_at } = req.body;
  if (!user_id || !license_type || !expires_at) return res.status(400).json({ error: 'Missing required fields.' });
  try {
    const conn = await mysql.createConnection(dbConfig);
    await conn.execute(
      'INSERT INTO licenses (user_id, license_type, state, city, issued_at, expires_at) VALUES (?, ?, ?, ?, ?, ?)',
      [user_id, license_type, state, city, issued_at, expires_at]
    );
    await conn.end();
    res.status(201).json({ message: 'License saved.' });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

// Get notifications for expired licenses
app.get('/license/notifications/:user_id', async (req, res) => {
  const { user_id } = req.params;
  try {
    const conn = await mysql.createConnection(dbConfig);
    const [licenses] = await conn.execute(
      'SELECT * FROM licenses WHERE user_id = ? AND expires_at < NOW() AND notified = FALSE',
      [user_id]
    );
    // Mark as notified and set notification_time
    for (const lic of licenses) {
      await conn.execute('UPDATE licenses SET notified = TRUE, notification_time = NOW() WHERE id = ?', [lic.id]);
    }
    await conn.end();
    res.json({ expired_licenses: licenses });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});
