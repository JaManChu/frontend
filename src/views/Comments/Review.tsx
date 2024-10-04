import { useState } from 'react';
import styled from 'styled-components';
import { FaRegStar, FaStar } from 'react-icons/fa';

const ReviewContainer = styled.section`
    margin: 44px 0px;
    h4 {
        font-size: 24px;
        font-weight: 500;
    }
`;
const ReviewContents = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
`;
const ReviewText = styled.div`
    margin: 16px 0px;
    padding: 16px;
    width: 95%;
    height: 70%;
    background-color: lightgray;
    border-radius: 16px;
`;
const ReviewBottom = styled.div`
    display: flex;
`;

export default function Review() {
    // const [text, setText] = useState<string>();

    const [rate, setRate] = useState(0);
    const handleClickRate = (idx: number) => {
        setRate(idx);
    };
    console.log(rate);
    return (
        <ReviewContainer>
            <h4>Leave a review</h4>
            <ReviewContents>
                <ReviewText>
                    <textarea></textarea>
                </ReviewText>
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
            </ReviewContents>
        </ReviewContainer>
    );
}
