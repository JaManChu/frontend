import { useState, FormEvent, ChangeEvent } from 'react';
import axios from 'axios';

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

export default function useComments() {
    const [commentDataList, setCommentDataList] = useState<Record<string, string | number>[]>([]);
    const [recipeId, setRecipeId] = useState<number>();
    const [commentId, setCommentId] = useState<number>();
    const [newComment, setNewComment] = useState<string>('');
    const [newRate, setNewRate] = useState<number>(0);
    const [editing, setEditing] = useState<boolean>(false); // 수정 중인지 check
    const [responseMessage, setResponseMessage] = useState<string>(''); // 메시지 알람창

    // 세션에 저장된 토큰
    const token = sessionStorage.getItem('token');

    // get : recipeId
    const handleFetch = async (recipeId: string) => {
        try {
            const response: any = await axios.get(`${import.meta.env.VITE_BASE_URL}/comments/${recipeId}`, {
                headers: {
                    'Access-Token': `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                console.log('get response: ', response);
                setCommentDataList(response.data);
            }
        } catch (err) {
            console.log(err);
            alert('댓글을 가져오는데 실패했습니다.');
        }
    };

    console.log(recipeId);
    // create : recipeId, comment, rating
    const handleCreate = async (e: FormEvent<HTMLFormElement>, { recipeId, comment, rating }: CreateHandlerProps) => {
        e.preventDefault();
        setRecipeId(recipeId);
        setNewRate(rating);

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/comments`,
                {
                    recipeId: recipeId,
                    comment: comment,
                    rating: rating,
                },
                {
                    headers: {
                        'Access-Token': `Bearer ${token}`,
                    },
                },
            );
            console.log('comment create response: ', response);
            console.log('comment response message:', response.data.message);
            setResponseMessage(response.data.message);
            // ! 초기화 : 필요여부 체크(test필요)
            setNewComment('');
            setNewRate(0);
        } catch (err: any) {
            console.log(err);
            alert('댓글 작성에 실패하였습니다.');
        }
    };

    // update : commentId, comment, rating
    const handleUpdate = async ({ commentId, comment, rating }: UpdateHandlerProps) => {
        setEditing(false); // 수정완료 : false로 상태변경
        try {
            const response: any = await axios.put(
                `${import.meta.env.VITE_BASE_URL}/comments`,
                {
                    commentId: commentId,
                    comment: comment,
                    rating: rating,
                },
                {
                    headers: {
                        'Access-Token': `Bearer ${token}`,
                    },
                },
            );

            if (response.staus === 200) {
                console.log('update response: ', response);
                setResponseMessage(response.data.message);
                // 초기화 -> 안하면 다시 수정 버튼 눌렀을때 어떻게 반영되는지 확인
                setNewRate(0);
                setNewComment('');
                setCommentId(0);
                alert('댓글이 수정되었습니다.');
            }
        } catch (err) {
            console.log(err);
            alert('댓글 수정에 실패하였습니다.');
        }
    };

    // 코멘트, 평점 update / create 핸들러
    const handleMakeComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setNewComment(e.target.value);
    };
    const handleMakeRate = (rate: number) => {
        setNewRate(rate);
    };
    // 코멘트 수정
    const handleEditing = ({ comments, commentId, commentRate }: EditingProps) => {
        setEditing(true);
        setNewComment(comments);
        setCommentId(commentId);
        setNewRate(commentRate);
    };

    const handleDelete = async (commentId: number) => {
        try {
            const response: any = await axios.delete(`${import.meta.env.VITE_BASE_URL}/comments`, { data: { commentId: commentId } });
            console.log('delete response: ', response);
            setResponseMessage(response.data.message);
            console.log(responseMessage);
            alert('댓글이 삭제되었습니다.');
            //  ! comments 리렌더링 조건 추가 필요 삭제 / 수정 / 생성 될때마다 알아서 호출되도록 구현
            // 현재는 comments를 새로 생성하지 않고 삭제만 했음 - useEffect 동작 이유 없음
        } catch (err) {
            console.log(err);
            alert('댓글 삭제에 실패하였습니다.');
        }
    };

    return {
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
    };
}
