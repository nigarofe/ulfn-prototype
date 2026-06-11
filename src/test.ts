import Database from 'better-sqlite3';

async function setupDatabase() {
  const db = new Database('database.db');

  console.log('Database connected successfully!');

  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  console.log('Table "users" created or already exists!');

  const stmt = db.prepare('INSERT OR IGNORE INTO users (name, email) VALUES (?, ?)');
  stmt.run('Alice TypeScript', 'alice@example.com');

  console.log('Test data initialized!');

  db.close();
}

setupDatabase().catch((err) => {
  console.error('Error setting up the database:', err);
});