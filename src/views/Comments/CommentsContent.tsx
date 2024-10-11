import { ChangeEvent } from 'react';
import styled from 'styled-components';

interface CommentsTextProps {
    isEditing: boolean;
    commentId: number;
    reviewId: number;
    content: string;
    currentComment: string;
    handleUpdateComment: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function CommentsContent({ isEditing, commentId, reviewId, content, currentComment, handleUpdateComment }: CommentsTextProps) {
    return (
        <>
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
