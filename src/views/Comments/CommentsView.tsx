import CreateComment from './CreateComment';
import CommentList from './CommentList';
import useComments from '../../hooks/useComments';

export default function CommentsView(): JSX.Element {
    const {
        editing,
        handleClickEdit,
        commentId,
        currentRate,
        updateRate,
        createComment,
        updateComment,
        commentDataList,
        fetchCommentHandler,
        createCommentHandler,
        updateCommentHandler,
        deleteCommentHandler,
        handleCreateComment,
        handleUpdateComment,
        handleMakeRate,
        handleUpdateRate,
    } = useComments();

    return (
        <>
            <CreateComment
                createdRate={currentRate}
                createdComment={createComment}
                createCommentHandler={createCommentHandler}
                handleCreateComment={handleCreateComment}
                handleCreateRate={handleMakeRate}
            />
            <CommentList
                isEditing={editing}
                handleClickEdit={handleClickEdit}
                commentId={commentId}
                updateRate={updateRate}
                updateComment={updateComment}
                commentDataList={commentDataList}
                fetchCommentHandler={fetchCommentHandler}
                updateCommentHandler={updateCommentHandler}
                deleteCommentHandler={deleteCommentHandler}
                handleUpdateComment={handleUpdateComment}
                handleUpdateRate={handleUpdateRate}
            />
        </>
    );
}
