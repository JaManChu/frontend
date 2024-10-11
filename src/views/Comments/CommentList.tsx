import { useEffect, ChangeEvent } from 'react';
import { useParams } from 'react-router-dom';
import { FaRegStar, FaStar } from 'react-icons/fa';
import reviewFake from '../../fakeData/reviewFake';
import styled from 'styled-components';

interface UpdateProps {
    commentId: number;
    comment: string;
    rating: number;
}
interface CommentsListProps {
    isEditing: boolean;
    handleEditing: ({ comments, commentId, commentRate }: { comments: string; commentId: number; commentRate: number }) => void;
    commentId?: number;
    updatedRate?: number;
    updatedComment: string;
    commentsList: Record<string, string | number>[];
    handleFetch: (id: string) => Promise<void>;
    handleUpdate: ({ commentId, comment, rating }: UpdateProps) => Promise<void>;
    handleDelete: (commentId: number) => Promise<void>;
    handleUpdateComment: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    handleUpdateRate: (rate: number) => void;
}

export default function CommentList({
    isEditing,
    handleEditing,
    commentId,
    updatedRate,
    updatedComment,
    commentsList,
    handleFetch,
    handleUpdate,
    handleDelete,
    handleUpdateComment,
    handleUpdateRate,
}: CommentsListProps): JSX.Element {
    const { id } = useParams<{ id: string }>();
    const nickName = sessionStorage.getItem('nickname');

    // fetchCommentsList : recipeId 기준 코멘트 조회 & commentsList가 바뀔때마다 handleFetch 호출
    useEffect(() => {
        if (id) {
            handleFetch(id);
        }
    }, [commentsList]);

    return (
        <>
            <CommentsContainer>
                <h4>리뷰보기</h4>
                {reviewFake.map((review) => (
                    <CommentsContents>
                        <ReviewerFigure>
                            <img src="" alt="유저이미지" />
                            <ReviewerFigcaption>{review.nickname}</ReviewerFigcaption>
                        </ReviewerFigure>
                        <CommentsWrapper>
                            <CommentsRating>
                                {Array(5)
                                    .fill(0)
                                    .map((_, idx) => {
                                        return review.rating <= idx ? <FaRegStar /> : <FaStar />;
                                    })}
                            </CommentsRating>
                            <span>{review.createdAt}</span>
                            {
                                // ! session에 저장된 nickname과 review.nickname이 일치할때만 버튼 보이게 구성
                                // ! nickname과 일치하면서 isEditing이 true일때
                                isEditing ? (
                                    nickName == review.nickname && (
                                        <div>
                                            <button
                                                onClick={() => {
                                                    handleEditing({
                                                        comments: review.content,
                                                        commentId: review.commentId,
                                                        commentRate: review.rating,
                                                    });
                                                }}
                                            >
                                                수정
                                            </button>
                                            <button onClick={() => commentId !== undefined && handleDelete(commentId)}>삭제</button>
                                        </div>
                                    )
                                ) : (
                                    <>
                                        {commentId !== undefined && updatedRate != undefined && (
                                            <button
                                                onClick={() =>
                                                    handleUpdate({
                                                        commentId: commentId,
                                                        comment: updatedComment,
                                                        rating: updatedRate,
                                                    })
                                                }
                                            >
                                                완료
                                            </button>
                                        )}
                                    </>
                                )
                            }
                            {isEditing ? (
                                <>
                                    {Array(5)
                                        .fill(0)
                                        .map((_, idx) => {
                                            return updatedRate! >= idx ? (
                                                <FaStar key={idx} onClick={() => handleUpdateRate(idx)} />
                                            ) : (
                                                <FaRegStar key={idx} onClick={() => handleUpdateRate(idx)} />
                                            );
                                        })}
                                    <CommentsTextarea value={updatedComment} onChange={handleUpdateComment}></CommentsTextarea>
                                </>
                            ) : (
                                <CommentsText>{review.content}</CommentsText>
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
