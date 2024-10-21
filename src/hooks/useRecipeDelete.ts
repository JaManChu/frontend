import axios from 'axios';
import useAuthToken from './useAuthToken';

export const useRecipeDelete = () => {
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
            console.log('response : ', response);
        } catch (error) {
            console.error('레시피 삭제 실패', error);
        }
    };

    return {
        handleMyRecipeDelete,
    };
};
