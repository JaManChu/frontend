interface Props {
    nickname: string;
    content: string;
    rating: number;
    commentId: number;
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
                            // ! 데이터 연동 후 타입 명확히 지정 & if문 삭제
                            if (typeof review.content === 'string' && typeof review.rating === 'number' && typeof review.commentId === 'number') {
                                handleClickEdit({
                                    comments: review.content,
                                    commentId: review.commentId,
                                    commentRate: review.rating,
                                });
                            }
                        }}
                    >
                        수정
                    </button>
                    <button
                        onClick={() => {
                            if (typeof review.commentId === 'number') {
                                deleteCommentHandler(review.commentId);
                            }
                        }}
                    >
                        삭제
                    </button>
                </div>
            )}
        </>
    );
}
