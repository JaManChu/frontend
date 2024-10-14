import { useState } from 'react';
import axios from 'axios';
export const useBookmark = () => {
    //map함수에서 개별 게시물 북마크 상태관리 상태배열
    const [bookmarkRecipes, setBookmarkRecipes] = useState<Record<string, boolean>>({});

    //북마크 아이콘 클릭핸들 함수
    const handleClickBookmark = async (recipeId: string) => {
        const token = sessionStorage.getItem('token');
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/recipes/${recipeId}`,
                {},
                {
                    headers: {
                        'access-token': `Bearer ${token}`,
                    },
                    withCredentials: true,
                },
            );
            if (response.data.data === 'SCRAPED') {
                //스크랩 성공 : 해당 게시물 스크랩 상태로 설정
                setBookmarkRecipes((prev) => ({
                    ...prev,
                    [recipeId]: true,
                }));
            } else if (response.data.data === 'CANCELED') {
                //스크랩 취소: 해당 게시물 스크랩 해제
                setBookmarkRecipes((prev) => ({
                    ...prev,
                    [recipeId]: false,
                }));
            }
        } catch (error) {
            console.error('스크랩 처리 중 오류 발생', error);
        }
    };

    return {
        bookmarkRecipes,
        setBookmarkRecipes,
        handleClickBookmark,
    };
};
