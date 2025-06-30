const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const dataPath = path.join(__dirname, 'data', 'books.json');

app.use(express.json());

// Get all books
app.get('/books', (req, res) => {
  const books = JSON.parse(fs.readFileSync(dataPath));
  res.json(books);
});

// Creating a new book with validation
app.post('/books', (req, res) => {
  const { title, author } = req.body;

  if (!title || !author) {
    return res.status(400).json({ error: 'Missing title or author in request body' });
  }

  const books = JSON.parse(fs.readFileSync(dataPath));
  const newBook = {
    id: books.length + 1,
    title,
    author,
  };

  books.push(newBook);
  fs.writeFileSync(dataPath, JSON.stringify(books, null, 2));
  res.status(201).json(newBook);
});

// Delete a book by ID
app.delete('/books/:id', (req, res) => {
  let books = JSON.parse(fs.readFileSync(dataPath));
  const bookId = parseInt(req.params.id);
  books = books.filter(book => book.id !== bookId);
  fs.writeFileSync(dataPath, JSON.stringify(books, null, 2));
  res.json({ message: `Book with id ${bookId} deleted.` });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
