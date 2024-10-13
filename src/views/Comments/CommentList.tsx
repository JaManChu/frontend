import { useEffect, ChangeEvent } from 'react';
import { useParams } from 'react-router-dom';
import CommentRating from './CommentRating';
import CommentsContent from './CommentsContent';
import CommentEditBtn from './CommentEditBtn';
import styled from 'styled-components';

interface UpdateProps {
    commentId: number;
    comment: string;
    rating: number;
}
interface CommentDataProps {
    commentId: number;
    nickname: string;
    content: string;
    rating: number;
    createdAt: string;
    updatedAt: string;
}
interface CommentsListProps {
    isEditing: boolean;
    handleClickEdit: ({ comments, commentId, commentRate }: { comments: string; commentId: number; commentRate: number }) => void;
    commentId?: number;
    currentRate?: number;
    currentComment: string;
    commentDataList: CommentDataProps[];
    fetchCommentHandler: (id: string) => Promise<void>;
    updateCommentHandler: ({ commentId, comment, rating }: UpdateProps) => Promise<void>;
    deleteCommentHandler: (commentId: number) => Promise<void>;
    handleUpdateComment: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    // handleUpdateRate: (rate: number) => void;
}
// ! commentId! 강제로 넣어놓은 부분 데이터 연동 후 확인 & 다른 방식으로 구현할것
export default function CommentList({
    isEditing,
    handleClickEdit,
    commentId,
    currentRate,
    currentComment,
    commentDataList,
    fetchCommentHandler,
    updateCommentHandler,
    deleteCommentHandler,
    handleUpdateComment,
}: // handleUpdateRate,
CommentsListProps): JSX.Element {
    const { id } = useParams<{ id: string }>();

    // fetchCommentsList : recipeId 기준 코멘트 조회 & recipeId가 바뀔때마다 fetchCommentHandler 호출
    useEffect(() => {
        console.log('commentList : ', commentDataList);
        if (id) {
            fetchCommentHandler(id);
        }
    }, [id]);

    return (
        <>
            <CommentsContainer>
                <h4>리뷰보기</h4>
                {commentDataList.map((comment) => (
                    <CommentsWrapper>
                        <ReviewerFigure>
                            <img src="" alt="유저이미지" />
                            <ReviewerFigcaption>{comment.nickname}</ReviewerFigcaption>
                        </ReviewerFigure>
                        <CommentsDataWrapper>
                            <CommentRating rating={comment.rating} />
                            <span>{comment.createdAt}</span>
                            <CommentEditBtn
                                isEditing={isEditing}
                                commentId={commentId}
                                currentRate={currentRate ?? 0}
                                currentComment={currentComment}
                                handleClickEdit={handleClickEdit}
                                updateCommentHandler={updateCommentHandler}
                                deleteCommentHandler={deleteCommentHandler}
                                review={comment}
                            />
                            <CommentsContent
                                isEditing={isEditing}
                                reviewId={comment.commentId}
                                commentId={commentId}
                                content={comment.content}
                                currentComment={currentComment}
                                handleUpdateComment={handleUpdateComment}
                            />
                        </CommentsDataWrapper>
                    </CommentsWrapper>
                ))}
            </CommentsContainer>
            s
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
const CommentsWrapper = styled.div`
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
const CommentsDataWrapper = styled.div`
    width: 95%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;
