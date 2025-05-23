import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm mb-4">
            <div className="container">
                <Link className="navbar-brand" to="/">Book Library</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        {/* Add New Book Button */}
                        <li className="nav-item">
                            <Link className="nav-link" to="/add">
                                Add New Book
                            </Link>
                        </li>
                        {/* All Books Button */}
                        <li className="nav-item">
                            <Link className="nav-link" to="/books/all">
                                All Books
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
