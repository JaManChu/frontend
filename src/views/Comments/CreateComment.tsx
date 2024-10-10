import { useState, FormEvent, ChangeEvent } from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa';
import styled from 'styled-components';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function CreateComment(): JSX.Element {
    const [rate, setRate] = useState(0);
    const [comment, setComment] = useState<string>();
    const [message, setMessage] = useState<string>('');
    const { params } = useParams();

    const handleClickRate = (idx: number) => {
        setRate(idx);
    };

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setComment(e.target.value);
    };

    const handleSubmitCreate = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/comments`, {
                recipeId: params,
                comment: comment,
                rating: rate,
            });
            console.log(response);
            setComment('');
            setRate(0);
            setMessage(response.data.message);
            console.log(message);
        } catch (err) {
            console.log(err);
            alert('댓글 작성에 실패하였습니다.');
        }
    };

    return (
        <ReviewContainer>
            <h4>Leave a review</h4>
            <ReviewForm method="post" onSubmit={handleSubmitCreate}>
                <textarea name="comments" onChange={handleChange}></textarea>
                <ReviewBottom>
                    <span>your rating</span>
                    {Array(5)
                        .fill(0)
                        .map((_, idx) => {
                            return rate >= idx ? (
                                <FaStar key={idx} onClick={() => handleClickRate(idx)} />
                            ) : (
                                <FaRegStar key={idx} onClick={() => handleClickRate(idx)} />
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
