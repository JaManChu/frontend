import { FormEvent, ChangeEvent } from 'react';
import { useParams } from 'react-router-dom';
import { MdStar, MdStarBorder } from 'react-icons/md';
import styled from 'styled-components';

interface CreateHandlerProps {
    recipeId: number;
    comment: string;
    rating: number;
}
interface CreateProps {
    createdRate: number;
    createdComment: string;
    createCommentHandler: (e: FormEvent<HTMLFormElement>, { recipeId, comment, rating }: CreateHandlerProps) => Promise<void>;
    handleCreateComment: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    handleCreateRate: (rate: number) => void;
}

export default function CreateComment({
    createdRate,
    createdComment,
    createCommentHandler,
    handleCreateComment,
    handleCreateRate,
}: CreateProps): JSX.Element {
    const { id } = useParams();

    return (
        <ReviewContainer>
            <h4>Leave a review</h4>
            <ReviewForm
                method="post"
                onSubmit={(e) => createCommentHandler(e, { recipeId: Number(id), comment: createdComment, rating: createdRate })}
            >
                <textarea name="comments" value={createdComment} onChange={handleCreateComment}></textarea>
                <ReviewBottom>
                    <span>Check Rating</span>
                    <ReviewRating>
                        {Array(5)
                            .fill(0)
                            .map((_, idx) => {
                                return createdRate >= idx + 1 ? (
                                    <MdStar key={idx} onClick={() => handleCreateRate(idx + 1)} />
                                ) : (
                                    <MdStarBorder key={idx} onClick={() => handleCreateRate(idx + 1)} />
                                );
                            })}
                    </ReviewRating>

                    <button type="submit">등록하기</button>
                </ReviewBottom>
            </ReviewForm>
        </ReviewContainer>
    );
}

const ReviewContainer = styled.section`
    margin: 44px 0px;
    h4 {
        font-size: 24px;
        font-weight: 500;
    }
`;

const ReviewForm = styled.form`
    margin: 16px 0px;
    padding: 16px;
    width: 95%;
    height: 70%;
    background-color: lightgray;
    border-radius: 16px;
    textarea {
        width: 100%;
    }
`;
const ReviewBottom = styled.div`
    display: flex;
    align-items: center;
    span {
        margin-right: 8px;
    }
    MdStar {
        color: #656565;
    }
`;
const ReviewRating = styled.span`
    cursor: pointer;
`;
