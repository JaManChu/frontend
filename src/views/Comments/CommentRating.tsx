import { FaRegStar, FaStar } from 'react-icons/fa';
import styled from 'styled-components';

interface CommentRatingProps {
    rating: number;
}

export default function CommentRating({ rating }: CommentRatingProps): JSX.Element {
    return (
        <CommentsRating>
            {Array(5)
                .fill(0)
                .map((_, idx) => {
                    return rating <= idx ? <FaRegStar /> : <FaStar />;
                })}
        </CommentsRating>
    );
}

const CommentsRating = styled.div``;
