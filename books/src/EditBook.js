import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function EditBook() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        author: "",
        genre: "",
        publication_year: ""
    });

    // Fetch book by ID when component mounts
    useEffect(() => {
        axios.get(`http://localhost:6565/books/${id}`)
            .then(res => {
                if (res.data) {
                    setFormData(res.data);
                }
            })
            .catch(err => console.error("Error fetching book:", err));
    }, [id]);

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Submit updated data
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:6565/books/${id}`, formData);
            alert("Book updated successfully");
            navigate(`/books/${formData.genre}`);
        } catch (err) {
            console.error("Error updating book:", err);
            alert("Failed to update book");
        }
    };

    return (
        <div className="container mt-5">
            <h3 className="text-center mb-4">Edit Book</h3>
            <form onSubmit={handleSubmit} className="p-4 shadow rounded bg-light">
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input type="text" className="form-control" name="title" value={formData.title} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Author</label>
                    <input type="text" className="form-control" name="author" value={formData.author} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Genre</label>
                    <select className="form-select" name="genre" value={formData.genre} onChange={handleChange} required>
                        <option value="">Select Genre</option>
                        <option value="Novel">Novel</option>
                        <option value="Biography">Biography</option>
                        <option value="Action">Action</option>
                        <option value="Travel">Travel</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Publication Year</label>
                    <input type="number" className="form-control" name="publication_year" value={formData.publication_year} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary">Update Book</button>
            </form>
        </div>
    );
}
