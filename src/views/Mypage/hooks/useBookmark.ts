import { useState } from 'react';

export const useBookmark = () => {
    //map함수에서 개별 게시물 북마크 상태관리 상태배열
    const [bookmarkRecipes, setBookmarkRecipes] = useState<Record<string, boolean>>({});

    //북마크 아이콘 클릭핸들 함수
    const handleClickBookmark = (recipeId: string) => {
        setBookmarkRecipes((prev) => ({
            ...prev,
            [recipeId]: !prev[recipeId],
        }));
    };

    return {
        bookmarkRecipes,
        setBookmarkRecipes,
        handleClickBookmark,
    };
};
