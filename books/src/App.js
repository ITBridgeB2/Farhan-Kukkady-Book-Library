import { Route, Routes } from "react-router-dom";
import Navbar from "./Navbar"; // Import the Navbar component
import CategoryPage from "./CategoryPage";
import BooksByGenre from "./BooksByGenre";
import AddBook from "./AddBook";
import AllBooksPage from "./AllBookPage"; // Import the AllBooksPage
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
    return (
        <div>
            {/* Navbar is now globally available */}
            <Navbar />
            <Routes>
                <Route path="/add" element={<AddBook />} />
                <Route path="/*" element={<CategoryPage />} />
                <Route path="/books/:genre" element={<BooksByGenre />} />
                <Route path="/books/all" element={<AllBooksPage />} /> {/* Update to AllBooksPage */}
            </Routes>
        </div>
    );
}
