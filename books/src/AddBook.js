import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function AddBook() {
    const [formData, setFormData] = useState({
        title: "",
        author: "",
        genre: "",
        publication_year: "" // ✅ Updated here
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); // ✅ Always prevent default on form submit
        try {
            await axios.post("http://localhost:6565/books", formData);
            alert("Book added");
            navigate("/library");
        } catch (error) {
            console.error("Error adding book:", error);
            alert("Failed to add book");
        }
    };

    return (
        <div className="container mt-4">
            <h3>Add New Book</h3>
            <input 
                type="text" 
                placeholder="Book Title" 
                value={formData.title} 
                onChange={handleChange} 
                name="title" 
                className="form-control mb-2"
            />
            <input 
                type="text" 
                placeholder="Author" 
                value={formData.author} 
                onChange={handleChange} 
                name="author" 
                className="form-control mb-2"
            />
            <select 
                value={formData.genre} 
                onChange={handleChange} 
                name="genre" 
                className="form-control mb-2"
            >
                <option value="">Select Genre</option>
                <option value="Novel">Novel</option>
                <option value="Biography">Biography</option>
                <option value="Action">Action</option>
                <option value="Travel">Travel</option>
            </select>
            <input 
                type="text" 
                placeholder="Publication Year" 
                value={formData.publication_year} 
                onChange={handleChange} 
                name="publication_year" // ✅ Updated name
                className="form-control mb-2"
            />
            <button className="btn btn-success" onClick={handleSubmit}>
                Add Book
            </button>
        </div>
    );
}
