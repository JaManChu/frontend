import { useState } from 'react';
import CreateComment from './CreateComment';
import CommentList from './CommentList';

export default function CommentsView() {
    const [editing, setEditing] = useState<boolean>(false);

    const handleEditing = () => {
        setEditing((prev) => !prev);
    };
    return (
        <>
            <CreateComment />
            <CommentList isEditing={editing} handleEditing={handleEditing} />
        </>
    );
}
