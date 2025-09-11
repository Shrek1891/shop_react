import {FaStar} from 'react-icons/fa'; // Requires 'react-icons' package

const StarRating = ({startRating}: { startRating: number }) => {
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
                            color={currentRating <= startRating ? '#ffc107' : '#e4e5e9'}
                            style={{cursor: 'pointer'}}
                        />
                    </label>
                );
            })}
            <p className="ml-2 text-gray-600">{startRating}</p>
        </div>
    );
};

export default StarRating;