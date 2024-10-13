import { ChangeEvent } from 'react';
import styled from 'styled-components';

interface CommentsTextProps {
    isEditing: boolean;
    commentId?: number;
    reviewId: number;
    content: string;
    currentComment: string;
    handleUpdateComment: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function CommentsContent({ isEditing, commentId, reviewId, content, currentComment, handleUpdateComment }: CommentsTextProps) {
    return (
        <>
            {/* commentId는 수정하기 버튼을 눌렀을때 설정, commentId와 commentDataList-commentId가 일치하는 경우 */}
            {isEditing && commentId == reviewId ? (
                <CommentsTextarea value={currentComment} onChange={handleUpdateComment}></CommentsTextarea>
            ) : (
                <CommentsText>{content}</CommentsText>
            )}
        </>
    );
}

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
