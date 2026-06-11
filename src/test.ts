import Database from 'better-sqlite3';

async function setupDatabase() {
    // 1. Open the database connection
    // This will create 'database.sqlite' in your root folder if it doesn't exist
    const db = new Database('./database.db');

    console.log('Database connected successfully!');

    // 2. Create a table
    db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

    console.log('Table "users" created or already exists!');

    // 3. (Optional) Insert some test data
    const stmt = db.prepare('INSERT OR IGNORE INTO users (name, email) VALUES (?, ?)');
    stmt.run('Alice TypeScript', 'alice@example.com');

    console.log('Test data initialized!');

    // 4. Close the connection
    db.close();
}

// Execute the function and catch any errors
setupDatabase().catch((err) => {
    console.error('Error setting up the database:', err);
});