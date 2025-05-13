import { useState, useEffect } from "react";
import axios from "axios";

export default function AllBooksPage() {
    const [allBooks, setAllBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        axios.get("http://localhost:6565/books")
            .then(res => {
                setAllBooks(res.data);
            })
            .catch(err => console.error("Error fetching all books:", err));
    }, []);

    // Filter books based on search
    const filteredBooks = allBooks.filter(book => 
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">All Books</h2>

            {/* Search bar */}
            <div className="mb-4">
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Search by title or author" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Book list */}
            <div className="row">
                {filteredBooks.length === 0 ? (
                    <p>No books found.</p>
                ) : (
                    filteredBooks.map(book => (
                        <div className="col-md-3 mb-4" key={book.id}>
                            <div className="card">
                                <div className="card-body text-center">
                                    <h5 className="card-title">{book.title}</h5>
                                    <p className="card-text">by {book.author}</p>
                                    <p className="card-text">Year: {book.publication_year}</p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
