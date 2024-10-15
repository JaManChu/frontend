import { useState } from 'react';
export const useRecipesPagination = (myRecipes: any[], scrapedRecipes: any[], ITEMS_PER_PAGE: number) => {
    const [myRecipesPage, setMyRecipesPage] = useState(1); // 작성한 레시피의 현재 페이지
    const [scrapedRecipesPage, setScrapedRecipesPage] = useState(1); // 스크랩된 레시피의 현재 페이지

    //게시물 개수당 총 페이지수
    const totalMyRecipesPages = Math.ceil(myRecipes.length / ITEMS_PER_PAGE);
    const totalScrapedRecipesPages = Math.ceil(scrapedRecipes.length / ITEMS_PER_PAGE);

    // 현재 페이지에 해당하는 아이템만 보여주도록 슬라이싱
    // myRecipesPage : 현재페이지 ITEMS_PER_PAGE : 현재페이지당 보여질 게시물 수
    // myRecipes = dummyMyRecipes.slice(0,4) => dummyMyRecipes[0]~dummyMyRecipes[3] 값 저장 .
    // 즉 현재페이지에 해당하는 게시물4개
    const myRecipesArr = myRecipes.slice((myRecipesPage - 1) * ITEMS_PER_PAGE, myRecipesPage * ITEMS_PER_PAGE);
    const scrapedRecipesArr = scrapedRecipes.slice((scrapedRecipesPage - 1) * ITEMS_PER_PAGE, scrapedRecipesPage * ITEMS_PER_PAGE);

    return {
        myRecipesArr,
        scrapedRecipesArr,
        myRecipesPage,
        scrapedRecipesPage,
        totalMyRecipesPages,
        totalScrapedRecipesPages,
        setMyRecipesPage,
        setScrapedRecipesPage,
    };
};
