import axios from 'axios';
import useAuthToken from './useAuthToken';

interface Recipe {
    myRecipeId: number;
    myRecipeThumbnail: string;
    myRecipeName: string;
}

type SetMyRecipes = React.Dispatch<React.SetStateAction<Recipe[]>>;

export const useRecipeDelete = (setMyRecipes: SetMyRecipes) => {
    const token = useAuthToken();

    const handleMyRecipeDelete = async (myRecipeId: number) => {
        try {
            const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/recipes`, {
                headers: {
                    'access-token': `Bearer ${token}`,
                },
                data: {
                    recipeId: myRecipeId,
                },
            });
            setMyRecipes((prevRecipes) => prevRecipes.filter((recipe) => recipe.myRecipeId !== myRecipeId));
            console.log('response : ', response);
        } catch (error) {
            console.error('레시피 삭제 실패', error);
        }
    };

    return {
        handleMyRecipeDelete,
    };
};
