interface Props {
    commentId: number;
    nickname: string;
    content: string;
    rating: number;
    createdAt: string;
    updatedAt: string;
}
interface UpdateProps {
    commentId: number;
    comment: string;
    rating: number;
}
interface EditBtnProps {
    recipeId?: string;
    review: Props;
    isEditing: boolean;
    commentId?: number;
    currentRate: number;
    currentComment: string;
    handleClickEdit: ({ comments, commentId, commentRate }: { comments: string; commentId: number; commentRate: number }) => void;
    updateCommentHandler: ({ commentId, comment, rating }: UpdateProps, recipeId: string) => Promise<void>;
    deleteCommentHandler: (commentId: number, recipeId: string) => Promise<void>;
}

export default function CommentEditBtn({
    recipeId,
    review,
    isEditing,
    commentId,
    currentRate,
    currentComment,
    handleClickEdit,
    updateCommentHandler,
    deleteCommentHandler,
}: EditBtnProps) {
    // const nickName = sessionStorage.getItem('nickname');

    return (
        <>
            {isEditing ? (
                <>
                    {commentId !== undefined && currentRate != undefined && recipeId !== undefined && (
                        <button
                            onClick={() =>
                                updateCommentHandler(
                                    {
                                        commentId: commentId,
                                        comment: currentComment,
                                        rating: currentRate,
                                    },
                                    recipeId,
                                )
                            }
                        >
                            완료
                        </button>
                    )}
                </>
            ) : (
                // nickName == review.nickname
                <div>
                    <button
                        onClick={() => {
                            handleClickEdit({
                                comments: review.content,
                                commentId: review.commentId,
                                commentRate: review.rating,
                            });
                        }}
                    >
                        수정
                    </button>
                    {recipeId !== undefined && (
                        <button
                            onClick={() => {
                                deleteCommentHandler(review.commentId, recipeId);
                            }}
                        >
                            삭제
                        </button>
                    )}
                </div>
            )}
        </>
    );
}
