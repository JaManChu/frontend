import { useState, useEffect } from 'react';

// import useAuthToken from './useAuthToken';
import instance from '../utils/api/instance';

export const useGetMyRecipes = (myRecipesPage: number, scrapedRecipesPage: number) => {
    interface MyRecipe {
        myRecipeId: number;
        myRecipeName: string;
        myRecipeThumbnail: string;
    }

    interface ScrabRecipe {
        recipeAuthor: string;
        recipeId: number;
        recipeName: string;
        recipeThumbnail: string;
    }
    const [myRecipes, setMyRecipes] = useState<MyRecipe[]>([]);
    const [scrapedRecipes, setScrapedRecipes] = useState<ScrabRecipe[]>([]);
    const [totalMyRecipesPages, setTotalMyRecipesPages] = useState(1); // 총 작성 레시피 페이지 수
    const [totalScrapedRecipesPages, setTotalScrapedRecipesPages] = useState(1); // 총 스크랩 레시피 페이지 수

    // const token = useAuthToken();

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                console.log('마이페이지레시피 목록 api호출시작');
                const response = await instance.get(`/users/recipes?myRecipePage=${myRecipesPage}&scrapRecipePage=${scrapedRecipesPage}`);
                console.log('마이페이지 작성게시글, 스크랩목록', response);
                console.log('게시글 불러오기 , response.data: ', response.data);
                if (response.data.code === 'OK') {
                    // API 응답 데이터를 사용하여 상태 업데이트
                    setMyRecipes(response.data.data.myRecipes.dataList);
                    setScrapedRecipes(response.data.data.myScrapedRecipes.dataList);
                    // 총 페이지 수 업데이트
                    setTotalMyRecipesPages(response.data.data.myRecipes.totalPage);
                    setTotalScrapedRecipesPages(response.data.data.myScrapedRecipes.totalPage);

                    console.log('작성게시글 목록 : ', myRecipes);
                    console.log('스크랩 게시물 목록 : ', scrapedRecipes);
                    console.log('게시글 총 페이지 : ', totalMyRecipesPages);
                    console.log('스크랩 총 페이지 : ', totalScrapedRecipesPages);
                }
            } catch (error) {
                console.error('게시물 정보를 불러오는데 실패하였습니다', error);
            }
        };

        fetchRecipes();
    }, [myRecipesPage, scrapedRecipesPage]);

    return {
        myRecipes,
        setMyRecipes,
        scrapedRecipes,
        totalMyRecipesPages,
        totalScrapedRecipesPages,
    };
};
