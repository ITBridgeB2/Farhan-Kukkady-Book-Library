import cors from 'cors';
import express from 'express'
import mysql from 'mysql2/promise'
//const mysql = require("mysql2/promise");
var userapp = express();
userapp.use(express.json());
userapp.use(express.urlencoded());
userapp.use(cors())
const db = {
    host: "localhost",
    user: "root",
    password: 'root',
    database: 'bookLibrary'
};
//get user and validate
//http://localhost:4444/expense
userapp.get("/books", async (req, res) => {
    try {
      const connection = await mysql.createConnection(db);
  
      const [rows] = await connection.execute('SELECT * FROM books');
  
      await connection.close();
  
      res.status(200).json(rows);
    } catch (error) {
      console.error("Error fetching Books:", error);
      res.status(500).json({ error: "Failed to fetch Books" });
    }
  });
  
  userapp.post("/books", async function (req, res) {
    try {
      const connection = await mysql.createConnection(db);
  
      const { title, author, genre, publication_year } = req.body;
  
      const [result] = await connection.execute(
        'INSERT INTO books (title, author, genre, publication_year) VALUES (?, ?, ?, ?)',
[title, author, genre, publication_year]

      );
  
      await connection.close();
  
      res.status(201).json({
        message: "Books inserted successfully", // ✅ clearer message
        bookId: result.insertId
    });
  
    } catch (error) {
      console.error("Error inserting Book:", error);
      res.status(500).json({ error: "Failed to insert Book" });
    }
  });
  // GET books by genre
userapp.get("/books/genre/:genre", async (req, res) => {
    try {
        const connection = await mysql.createConnection(db);
        const genre = req.params.genre;
        const [rows] = await connection.execute(
            'SELECT * FROM books WHERE genre = ?',
            [genre]
        );
        await connection.close();
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error fetching books by genre:", error);
        res.status(500).json({ error: "Failed to fetch books" });
    }
});
userapp.delete("/books/:id", async (req, res) => {
    try {
        const connection = await mysql.createConnection(db);
        const { id } = req.params;

        await connection.execute('DELETE FROM books WHERE id = ?', [id]);
        await connection.end();

        res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
        console.error("Error deleting book:", error);
        res.status(500).json({ error: "Failed to delete book" });
    }
});
// Update book by ID
userapp.put("/books/:id", async (req, res) => {
    try {
        const connection = await mysql.createConnection(db);
        const { id } = req.params;
        const { title, author, genre, publication_year } = req.body;

        const [result] = await connection.execute(
            'UPDATE books SET title = ?, author = ?, genre = ?, publication_year = ? WHERE id = ?',
            [title, author, genre, publication_year, id]
        );

        await connection.close();
        res.status(200).json({ message: "Book updated successfully" });
    } catch (error) {
        console.error("Error updating book:", error);
        res.status(500).json({ error: "Failed to update book" });
    }
});
// GET book by ID
userapp.get("/books/:id", async (req, res) => {
    try {
        const connection = await mysql.createConnection(db);
        const { id } = req.params;
        const [rows] = await connection.execute('SELECT * FROM books WHERE id = ?', [id]);
        await connection.close();
        res.status(200).json(rows[0]);
    } catch (error) {
        console.error("Error fetching book:", error);
        res.status(500).json({ error: "Failed to fetch book" });
    }
});


  

  


userapp.listen(6565)
console.log("Server started on port 6565")


