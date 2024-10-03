import React, { useState } from 'react';
import styled from 'styled-components';
import { GiSpoon } from 'react-icons/gi';
import { FaUtensilSpoon } from 'react-icons/fa';
import { FaSpoon } from 'react-icons/fa6';

const CommentsContaienr = styled.section`
    margin: 24px 0;
`;
const CommentsContents = styled.div`
    padding: 16px;
    border: 1px solid;
    display: grid;
    grid-template-columns: 10% 90%;
    gap: 40px;
`;
const ReviewerFigure = styled.figure`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
        border: 1px solid;
        border-radius: 50%;
        display: inline-block;
        width: 70px;
        height: 70px;
    }
`;
const ReviewerFigcaption = styled.figcaption`
    margin-top: 8px;
`;
const ReviewWriteWrapper = styled.div``;
const RateWrapper = styled.div``;

export default function Comments() {
    const [rating, setRating] = useState<number>(5);

    return (
        <CommentsContaienr>
            <span>Reviewer</span>
            <CommentsContents>
                <ReviewerFigure>
                    <img src="" alt="유저이미지" />
                    <ReviewerFigcaption>UserId</ReviewerFigcaption>
                </ReviewerFigure>
                <ReviewWriteWrapper>
                    <RateWrapper></RateWrapper>
                </ReviewWriteWrapper>
            </CommentsContents>
        </CommentsContaienr>
    );
}
