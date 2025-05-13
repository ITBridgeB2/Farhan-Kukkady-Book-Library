import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function BooksByGenre() {
    const { genre } = useParams();
    const [books, setBooks] = useState([]);

    useEffect(() => {
        // If genre is "all", fetch all books
        const url = genre === "all" ? "http://localhost:6565/books" : `http://localhost:6565/books/genre/${genre}`;
        axios.get(url)
            .then((res) => setBooks(res.data))
            .catch((err) => console.error("Error fetching books:", err));
    }, [genre]);

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">
                {genre === "all" ? "All Books" : `Books in "${genre}" Category`}
            </h2>

            {/* Add search bar */}
            <input
                type="text"
                placeholder="Search for books..."
                className="form-control mb-4"
                // Add functionality for searching if needed
            />

            {books.length === 0 ? (
                <div className="alert alert-info text-center">No books found.</div>
            ) : (
                <div className="row">
                    {books.map((book) => (
                        <div className="col-md-4 mb-4" key={book.id}>
                            <div className="card shadow-sm h-100 border-0 rounded-3">
                                <div className="card-body d-flex flex-column justify-content-between">
                                    <h5 className="card-title text-primary">{book.title}</h5>
                                    <p className="card-text mb-1"><strong>Author:</strong> {book.author}</p>
                                    <p className="card-text mb-2"><strong>Published:</strong> {book.publication_year}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
