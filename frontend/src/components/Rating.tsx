import {useState} from 'react';
import {FaStar} from 'react-icons/fa'; // Requires 'react-icons' package

const StarRating = ({startRating}: { startRating: number }) => {
    const [rating, setRating] = useState(startRating); // State to store the selected rating
    const [hover, setHover] = useState(rating);   // State to handle hover effect
    return (
        <div className="flex items-center">
            {[...Array(5)].map((_, index) => {
                const currentRating = index + 1;
                return (
                    <label key={index}>
                        <input
                            type="radio"
                            name="rating"
                            value={currentRating}
                            style={{display: 'none'}} // Hide the radio button
                        />
                        <FaStar
                            size={30}
                            color={currentRating <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
                            style={{cursor: 'pointer'}}
                        />
                    </label>
                );
            })}
            <p>{rating}</p>
        </div>
    );
};

export default StarRating;