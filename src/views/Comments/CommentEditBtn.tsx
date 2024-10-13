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
    review: Props;
    isEditing: boolean;
    commentId?: number;
    currentRate: number;
    currentComment: string;
    handleClickEdit: ({ comments, commentId, commentRate }: { comments: string; commentId: number; commentRate: number }) => void;
    updateCommentHandler: ({ commentId, comment, rating }: UpdateProps) => Promise<void>;
    deleteCommentHandler: (commentId: number) => Promise<void>;
}

export default function CommentEditBtn({
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
                    {commentId !== undefined && currentRate != undefined && (
                        <button
                            onClick={() =>
                                updateCommentHandler({
                                    commentId: commentId,
                                    comment: currentComment,
                                    rating: currentRate,
                                })
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
                    <button
                        onClick={() => {
                            deleteCommentHandler(review.commentId);
                        }}
                    >
                        삭제
                    </button>
                </div>
            )}
        </>
    );
}
