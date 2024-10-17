import { useState, FormEvent, ChangeEvent } from 'react';
import instance from '../utils/api/instance';

interface CreateHandlerProps {
    recipeId: number;
    comment: string;
    rating: number;
}
interface UpdateHandlerProps {
    commentId: number;
    comment: string;
    rating: number;
}
interface EditingProps {
    commentId: number;
    comments: string;
    commentRate: number;
}
interface CommentDataProps {
    commentAuthor: string;
    commentContent: string;
    commentId: number;
    rating: number;
    createdAt: string;
    updatedAt: string;
}

export default function useComments() {
    const [editing, setEditing] = useState<boolean>(false); // 수정 중인지 check
    const [commentDataList, setCommentDataList] = useState<CommentDataProps[]>([]);
    const [recipeId, setRecipeId] = useState<number>();
    const [commentId, setCommentId] = useState<number>();
    const [createComment, setCreateComment] = useState<string>('');
    const [updateComment, setUpdateComment] = useState<string>('');
    const [currentRate, setCurrentRate] = useState<number>(0);
    const [responseMessage, setResponseMessage] = useState<string>(''); // 메시지 알람창

    // get : recipeId
    const fetchCommentHandler = async (recipeId: string) => {
        try {
            const response: any = await instance.get(`/comments/${recipeId}`);
            if (response.data.code === 'OK') {
                console.log('response.data.data: ', response.data.data);
                setCommentDataList(response.data.data.comments);
            }
        } catch (err) {
            console.log(err);
            alert('댓글을 가져오는데 실패했습니다.');
        }
    };
    console.log('recipeId', recipeId);
    console.log('responseMsg', responseMessage);

    // create : recipeId, comment, rating
    const createCommentHandler = async (e: FormEvent<HTMLFormElement>, { recipeId, comment, rating }: CreateHandlerProps) => {
        e.preventDefault();
        setRecipeId(recipeId);
        setCurrentRate(rating);

        try {
            const response = await instance.post('/comments', {
                recipeId: recipeId,
                comment: comment,
                rating: rating,
            });

            if (response.data.code == 'CREATED') {
                setResponseMessage(response.data.message);
                // 초기화
                setCreateComment('');
                setCurrentRate(0);
                await fetchCommentHandler(recipeId.toString());
                alert('댓글 작성 성공!');
            }
        } catch (err: any) {
            if (err.message == 'No token') {
                alert('로그인 후 이용바랍니다.');
                window.location.href = '/login';
            } else {
                console.log(err);
                alert('댓글 작성에 실패하였습니다.');
            }
        }
    };

    // update : commentId, comment, rating
    const updateCommentHandler = async ({ commentId, comment, rating }: UpdateHandlerProps, recipeId: string) => {
        setEditing(false); // 수정완료 시 false로 상태변경
        try {
            const response: any = await instance.put('/comments', {
                commentsId: commentId,
                comment: comment,
                rating: rating,
            });

            if (response.data.code === 'OK') {
                setResponseMessage(response.data.message);
                setUpdateComment('');
                setCommentId(0);
                await fetchCommentHandler(recipeId.toString());
                alert('댓글이 수정되었습니다.');
            }
        } catch (err) {
            console.log(err);
            alert('댓글 수정에 실패하였습니다.');
        }
    };

    // 코멘트, 평점 update / create 핸들러
    const handleCreateComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setCreateComment(e.target.value);
    };
    const handleUpdateComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setUpdateComment(e.target.value);
    };
    const handleMakeRate = (rate: number) => {
        setCurrentRate(rate);
    };
    console.log('rate는? ', currentRate);

    // 코멘트 수정 버튼과 연결
    const handleClickEdit = ({ comments, commentId, commentRate }: EditingProps) => {
        setEditing(true);
        setCommentId(commentId); // 수정버튼 누른 commentId값 저장 => commentsDataList에서 같은 commentid값을 가진 코멘트 filter하기 위함
        setUpdateComment(comments);
        setCurrentRate(commentRate);
    };

    const deleteCommentHandler = async (commentId: number, recipeId: string) => {
        try {
            const response: any = await instance.delete('/comments', {
                data: {
                    commentId: commentId,
                },
            });

            if (response.data.code == 'OK') {
                setResponseMessage(response.data.message);
                alert('댓글이 삭제되었습니다.');
                await fetchCommentHandler(recipeId);
            }
        } catch (err) {
            console.log(err);
            alert('댓글 삭제에 실패하였습니다.');
        }
    };

    return {
        editing,
        handleClickEdit,
        commentId,
        currentRate,
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
    };
}
