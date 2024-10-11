import CreateComment from './CreateComment';
import CommentList from './CommentList';
import useComments from '../../hooks/useComments';

export default function CommentsView(): JSX.Element {
    const {
        editing,
        handleClickEdit,
        commentId,
        currentRate,
        currentComment,
        commentDataList,
        fetchCommentHandler,
        createCommentHandler,
        updateCommentHandler,
        deleteCommentHandler,
        handleMakeComment,
        handleMakeRate,
    } = useComments();

    return (
        <>
            <CreateComment
                createdRate={currentRate}
                createdComment={currentComment}
                createCommentHandler={createCommentHandler}
                handleCreateComment={handleMakeComment}
                handleCreateRate={handleMakeRate}
            />
            <CommentList
                isEditing={editing}
                handleClickEdit={handleClickEdit}
                commentId={commentId}
                currentRate={currentRate}
                currentComment={currentComment}
                commentDataList={commentDataList}
                fetchCommentHandler={fetchCommentHandler}
                updateCommentHandler={updateCommentHandler}
                deleteCommentHandler={deleteCommentHandler}
                handleUpdateComment={handleMakeComment}
                // handleUpdateRate={handleMakeRate}
            />
        </>
    );
}
