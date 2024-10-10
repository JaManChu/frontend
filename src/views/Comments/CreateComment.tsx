import { FormEvent, ChangeEvent } from 'react';
import { useParams } from 'react-router-dom';
import { FaRegStar, FaStar } from 'react-icons/fa';
import styled from 'styled-components';
interface CreateHandlerProps {
    recipeId: number;
    comment: string;
    rating: number;
}
interface CreateProps {
    createdRate: number;
    createdComment: string;
    handleCreate: (e: FormEvent<HTMLFormElement>, { recipeId, comment, rating }: CreateHandlerProps) => Promise<void>;
    handleCreateComment: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    handleCreateRate: (rate: number) => void;
}

export default function CreateComment({
    createdRate,
    createdComment,
    handleCreate,
    handleCreateComment,
    handleCreateRate,
}: CreateProps): JSX.Element {
    const { id } = useParams();

    return (
        <ReviewContainer>
            <h4>Leave a review</h4>
            <ReviewForm method="post" onSubmit={(e) => handleCreate(e, { recipeId: Number(id), comment: createdComment, rating: createdRate })}>
                <textarea name="comments" onChange={handleCreateComment}></textarea>
                <ReviewBottom>
                    <span>your rating</span>
                    {Array(5)
                        .fill(0)
                        .map((_, idx) => {
                            return createdRate >= idx ? (
                                <FaStar key={idx} onClick={() => handleCreateRate(idx)} />
                            ) : (
                                <FaRegStar key={idx} onClick={() => handleCreateRate(idx)} />
                            );
                        })}

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
`;
