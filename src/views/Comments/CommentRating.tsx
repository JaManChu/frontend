import { MdStar, MdStarBorder } from 'react-icons/md';
import styled from 'styled-components';

interface CommentRatingProps {
    isEditing: boolean;
    commentId?: number;
    reviewId: number;
    rating: number;
    updateRate: number;
    handleUpdateRate: (rate: number) => void;
}

export default function CommentRating({ rating, isEditing, commentId, reviewId, updateRate, handleUpdateRate }: CommentRatingProps): JSX.Element {
    return (
        <>
            {isEditing && commentId == reviewId ? (
                <CommentsRating>
                    {Array(5)
                        .fill(0)
                        .map((_, idx) => {
                            return updateRate >= idx + 1 ? (
                                <MdStar key={idx} onClick={() => handleUpdateRate(idx + 1)} />
                            ) : (
                                <MdStarBorder key={idx} onClick={() => handleUpdateRate(idx + 1)} />
                            );
                        })}
                </CommentsRating>
            ) : (
                <CommentsRating>
                    {Array(5)
                        .fill(0)
                        .map((_, idx) => {
                            return rating <= idx ? <MdStarBorder /> : <MdStar />;
                        })}
                </CommentsRating>
            )}
        </>
    );
}

const CommentsRating = styled.div`
    color: #656565;
`;
