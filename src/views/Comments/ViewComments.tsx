// import { useState } from 'react';
import styled from 'styled-components';
import { FaRegStar, FaStar } from 'react-icons/fa';
// import { FaStarHalfAlt, FaStar } from 'react-icons/fa';
import reviewFake from '../../fakeData/reviewFake';

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
// const RateIcon = styled(FaRegStar)``;
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

    return (
        <CommentsContainer>
            <h4>리뷰보기</h4>
            {reviewFake.map((review) => (
                <CommentsContents>
                    <ReviewerFigure>
                        <img src="" alt="유저이미지" />
                        <ReviewerFigcaption>UserId</ReviewerFigcaption>
                    </ReviewerFigure>
                    <CommentsWrapper>
                        {Array(5)
                            .fill(0)
                            .map((_, idx) => {
                                return review.rate <= idx ? <FaRegStar /> : <FaStar />;
                            })}
                        <CommentsText>
                            <p>{review.comment}</p>
                        </CommentsText>
                    </CommentsWrapper>
                </CommentsContents>
            ))}
        </CommentsContainer>
    );
}
