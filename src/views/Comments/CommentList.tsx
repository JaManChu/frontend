import { useState, useEffect, ChangeEvent } from 'react';
import { useParams } from 'react-router-dom';
import { FaRegStar, FaStar } from 'react-icons/fa';
import reviewFake from '../../fakeData/reviewFake';
import styled from 'styled-components';
import axios from 'axios';

interface CommentsListProps {
    isEditing: boolean;
    handleEditing: () => void;
}

export default function CommentList({ isEditing, handleEditing }: CommentsListProps): JSX.Element {
    const [commentsData, setCommentsData] = useState([]);
    const [responseMessage, setResponseMessage] = useState<string>();
    const [commentId, setCommentId] = useState<number>(0);
    const [commentRate, setCommentRate] = useState<number>();
    const [commentBody, setCommentBody] = useState<string>();

    const { id } = useParams();
    // ! 리팩토링 진행 필요 -> comments가 작성되면 데이터 get
    useEffect(() => {
        try {
            const response: any = axios.get(`${import.meta.env.VITE_BASE_URL}/comments/${id}`); // id는 recipeId
            console.log(response);
            setCommentsData(response.data);
        } catch (err) {
            console.log(err);
        }
    }, [commentsData]);

    const handleClickDelete = () => {
        // ! 매개변수로 Idx를 받도록 처리(commentId)
        try {
            // ? delet 데이터에 commentId 넣어서 보내주기
            const response: any = axios.delete(`${import.meta.env.VITE_BASE_URL}/comments`);
            console.log(response);
            setResponseMessage(response.data.message);
            console.log(responseMessage); // 버셀 error 방지용
            alert('댓글이 삭제되었습니다.');
            //  ! comments 리렌더링 조건 생가해보기
            // 현재는 comments를 새로 생성하지 않고 삭제만 했음 - useEffect 동작 이유 없음
        } catch (err) {
            console.log(err);
            alert('댓글 삭제에 실패하였습니다.');
        }
    };
    const handleClickUpdate = () => {
        handleEditing(); // ? prev=> !prev가 나은지 vs 직접적으로 true/false 설정
        // ! 매개변수로 comments 받기
        // ! 보낼 데이터: id, comments, rating
        try {
            const response: any = axios.put(`${import.meta.env.VITE_BASE_URL}/comments`, {
                commentId: commentId,
                comments: commentBody,
                rating: commentRate,
            });
            console.log(response);
            setResponseMessage(response.data.message);
            // 초기화 -> 안하면 다시 수정 버튼 눌렀을때 어떻게 반영되는지 확인
            setCommentRate(0);
            setCommentBody('');
            setCommentId(0);
            alert('댓글이 수정되었습니다.');
        } catch (err) {
            console.log(err);
            alert('댓글 수정에 실패하였습니다.');
        }
    };

    const handleChangeComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setCommentBody(e.target.value);
    };

    return (
        <>
            <CommentsContainer>
                <h4>리뷰보기</h4>
                {reviewFake.map((review) => (
                    <CommentsContents>
                        <ReviewerFigure>
                            <img src="" alt="유저이미지" />
                            <ReviewerFigcaption>nickname</ReviewerFigcaption>
                        </ReviewerFigure>
                        <CommentsWrapper>
                            <CommentsRating>
                                {Array(5)
                                    .fill(0)
                                    .map((_, idx) => {
                                        return review.rate <= idx ? <FaRegStar /> : <FaStar />;
                                    })}
                            </CommentsRating>
                            {
                                // ! session에 저장된 nickname과 review.nickname이 일치할때만 버튼 보이게 구성
                                // ! nickname과 일치하면서 isEditing이 true일때
                                isEditing ? (
                                    <button onClick={handleClickUpdate}>수정</button>
                                ) : (
                                    <div>
                                        <button
                                            onClick={() => {
                                                handleEditing();
                                                setCommentBody(review.comment);
                                                setCommentId(1); // ! 1로 설정했으나 데이터 받아오고 변경
                                                setCommentRate(1); // 1로 설정했으나 데이터 받아오고 변경
                                            }}
                                        >
                                            수정
                                        </button>
                                        <button onClick={() => handleClickDelete()}>삭제</button>
                                    </div>
                                )
                            }
                            {isEditing ? (
                                <CommentsTextarea value={commentBody} onChange={handleChangeComment}></CommentsTextarea>
                            ) : (
                                <CommentsText>{review.comment}</CommentsText>
                            )}
                        </CommentsWrapper>
                    </CommentsContents>
                ))}
            </CommentsContainer>
        </>
    );
}
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
const CommentsWrapper = styled.div`
    width: 95%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;
const CommentsRating = styled.div``;
const CommentsText = styled.p`
    margin: 16px 0px;
    padding: 16px;
    width: 100%;
    height: 70%;
    background-color: lightgray;
    border-radius: 16px;
`;
const CommentsTextarea = styled.textarea`
    margin: 16px 0px;
    padding: 16px;
    width: 100%;
    height: 70%;
    border-radius: 16px;
`;
