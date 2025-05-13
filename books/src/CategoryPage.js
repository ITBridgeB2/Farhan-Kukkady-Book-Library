import { useNavigate } from "react-router-dom";

// Map genres to image URLs
const genreImages = {
    Action: "/images/action.jpeg",
    Novel: "/images/novel.jpg",
    Biography: "/images/bio.jpeg",
    Travel: "/images/travel.jpeg"
};

export default function CategoryPage() {
    const navigate = useNavigate();
    const categories = ["Action", "Novel", "Biography", "Travel"];

    const handleCategoryClick = (genre) => {
        navigate(`/books/${genre}`);
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4 text-primary">Select a Category</h2>

            <div className="row">
                {categories.map((genre) => (
                    <div className="col-md-3 mb-4" key={genre}>
                        <div className="card shadow-lg border-0 rounded-3 h-100">
                            <img 
                                src={genreImages[genre]} 
                                className="card-img-top rounded-top" 
                                alt={`${genre} category`} 
                                style={{ height: "200px", objectFit: "cover" }}
                            />
                            <div className="card-body text-center">
                                <h5 className="card-title text-primary">{genre}</h5>
                                <button 
                                    className="btn btn-outline-primary btn-lg w-100" 
                                    onClick={() => handleCategoryClick(genre)}
                                >
                                    View {genre} Books
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
