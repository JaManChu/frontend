import { useEffect, useState } from 'react';
import RecipeList from '../../../components/Recipe/RecipeList.js';
import RecipePageHeader from '../../../components/Recipe/RecipePageHeader.js';
import axios from 'axios';

interface RecipeLimitProps {
    limit?: number;
    page?: string;
}
interface RecipeProps {
    recipeId: number;
    recipeName: string;
    recipeAuthor: string;
    recipeLevel: string;
    recipeCookingTime: string;
    recipeThumbnail: string;
    // rate: string;
    // desc: string;
}

export default function LatestRecipe({ limit, page }: RecipeLimitProps): JSX.Element {
    const [recipes, setRecipes] = useState<RecipeProps[]>([]);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/recipes`);
                console.log('전체레시피 response 확인중...:', response);
                if (response.status == 200) {
                    console.log('all recipes response : ', response);
                    console.log('all recipes response.data: ', response.data);
                    console.log('all recipes response.data.message: ', response.data.message);
                    setRecipes(response.data);

                    alert('전체 레시피 조회성공');
                }
            } catch (err: any) {
                console.log(err);
                console.log(err.response.message);
                alert('레ㅣㅅ피 조회에 실패했습니다.');
            }
        };

        fetchRecipes();
    }, [recipes]);

    return (
        <>
            {!page && <RecipePageHeader title="Latest" />}
            <RecipeList recipes={recipes} limit={limit} page={page} />
        </>
    );
}
