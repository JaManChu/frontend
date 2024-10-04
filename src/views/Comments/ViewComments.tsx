// import React, { useState } from 'react';
import styled from 'styled-components';
import { FaRegStar } from 'react-icons/fa';
// import { FaRegStar, FaStarHalfAlt, FaStar } from 'react-icons/fa';

const CommentsContainer = styled.section`
    margin-top: 24px;
    h4 {
        font-size: 24px;
        font-weight: 500;
    }
`;
const CommentsContents = styled.div`
    padding: 16px;
    height: auto;
    display: grid;
    gap: 20px;
    grid-template-columns: 10% 90%;
    border: 1px solid lightgray;
    border: 1px solid lightgray;
`;
const ReviewerFigure = styled.figure`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    img {
        display: inline-block;
        width: 70px;
        height: 70px;
        border: 2px solid;
        border-radius: 50%;
    }
`;
const ReviewerFigcaption = styled.figcaption`
    margin: 16px 0 0px;
`;
const CommentsWrapper = styled.div``;
const RateIcon = styled(FaRegStar)`
    &:hover {
        color: #efb63f;
    }
    cursor: pointer;
`;
const CommentsText = styled.div`
    margin: 16px 0px;
    padding: 16px;
    width: 95%;
    height: 70%;
    background-color: lightgray;
    border-radius: 16px;
`;

export default function ViewComments() {
    // const [rate, setRate] = useState<number>(0);
    // 작성날짜 post
    const handleRating = () => {};

    return (
        <CommentsContainer>
            <h4>Reviewer</h4>
            <CommentsContents>
                <ReviewerFigure>
                    <img src="" alt="유저이미지" />
                    <ReviewerFigcaption>UserId</ReviewerFigcaption>
                </ReviewerFigure>
                <CommentsWrapper>
                    <div>
                        {Array(5)
                            .fill(0)
                            .map((_, idx) => (
                                <RateIcon key={idx} onClick={handleRating} />
                            ))}
                    </div>
                    <CommentsText>
                        <p>Comments는 comments...</p>
                    </CommentsText>
                </CommentsWrapper>
            </CommentsContents>
        </CommentsContainer>
    );
}
