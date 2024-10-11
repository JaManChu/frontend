import CreateComment from './CreateComment';
import CommentList from './CommentList';
import useComments from '../../hooks/useComments';

export default function CommentsView(): JSX.Element {
    const {
        editing,
        handleEditing,
        commentId,
        newRate,
        newComment,
        commentDataList,
        handleFetch,
        handleCreate,
        handleUpdate,
        handleDelete,
        handleMakeComment,
        handleMakeRate,
    } = useComments();

    return (
        <>
            <CreateComment
                createdRate={newRate}
                createdComment={newComment}
                handleCreate={handleCreate}
                handleCreateComment={handleMakeComment}
                handleCreateRate={handleMakeRate}
            />
            <CommentList
                isEditing={editing}
                handleEditing={handleEditing}
                commentId={commentId}
                updatedRate={newRate}
                updatedComment={newComment}
                commentsList={commentDataList}
                handleFetch={handleFetch}
                handleUpdate={handleUpdate}
                handleDelete={handleDelete}
                handleUpdateComment={handleMakeComment}
                handleUpdateRate={handleMakeRate}
            />
        </>
    );
}
