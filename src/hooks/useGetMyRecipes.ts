import axios from 'axios';
import { useState, useEffect } from 'react';

import useAuthToken from './useAuthToken';
export const useGetMyRecipes = (myRecipesPage: number, scrapedRecipesPage: number) => {
    interface Recipe {
        recipeId: number;
        recipeName: string;
        recipeThumbnail: string;
    }
    const [myRecipes, setMyRecipes] = useState<Recipe[]>([]);
    const [scrapedRecipes, setScrapedRecipes] = useState<Recipe[]>([]);
    const [totalMyRecipesPages, setTotalMyRecipesPages] = useState(1); // 총 작성 레시피 페이지 수
    const [totalScrapedRecipesPages, setTotalScrapedRecipesPages] = useState(1); // 총 스크랩 레시피 페이지 수

    const token = useAuthToken();

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                console.log('마이페이지레시피 목록 api호출시작');
                const response = await axios.get(
                    `${import.meta.env.VITE_BASE_URL}/users/recipes?myRecipePage=${myRecipesPage}&scrapRecipePage=${scrapedRecipesPage}`,
                    {
                        headers: {
                            'access-token': `Bearer ${token}`,
                        },
                        withCredentials: true,
                    },
                );
                console.log('마이페이지 작성게시글, 스크랩목록', response);
                console.log('게시글 불러오기 , response.data: ', response.data);
                if (response.data.code === 'OK') {
                    // API 응답 데이터를 사용하여 상태 업데이트
                    setMyRecipes(response.data.data.myRecipes.dataList);
                    setScrapedRecipes(response.data.data.myScrapedRecipes.dataList);
                    // 총 페이지 수 업데이트
                    setTotalMyRecipesPages(response.data.data.myRecipes.dataList.totalPage);
                    setTotalScrapedRecipesPages(response.data.data.myScrapedRecipes.dataList.totalPage);
                }
            } catch (error) {
                console.error('게시물 정보를 불러오는데 실패하였습니다', error);
            }
        };
        console.log('작성게시글 목록 : ', myRecipes);
        console.log('스크랩 게시물 목록 : ', scrapedRecipes);
        console.log('게시글 총 페이지 : ', totalMyRecipesPages);
        console.log('스크랩 총 페이지 : ', totalScrapedRecipesPages);

        fetchRecipes();
    }, [myRecipesPage, scrapedRecipesPage]);

    return {
        myRecipes,
        scrapedRecipes,
        totalMyRecipesPages,
        totalScrapedRecipesPages,
    };
};
