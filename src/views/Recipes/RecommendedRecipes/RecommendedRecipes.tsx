import { useEffect, useState } from 'react';
import RecipeList from '../../../components/Recipe/RecipeList.js';
import withAuth from '../../../hooks/withAuth.js';
import { S_RecipeContainer } from '../../../styles/RecipeContainer.js';
import instance from '../../../utils/api/instance.js';
import { useDispatch } from 'react-redux';
import { showModal } from '../../../redux/reducer/modalSlice.js';

interface RecipeProps {
    recipeId: number;
    recipeName: string;
    recipeAuthor: string;
    recipeLevel: string;
    recipeCookingTime: string;
    recipeThumbnail: string;
    recipeRating: string;
}

function RecommendedRecipes(): JSX.Element {
    const dispatch = useDispatch();
    const [recipes, setRecipes] = useState<RecipeProps[]>([]);
    useEffect(() => {
        fetchRecipes();
    }, []);

    const fetchRecipes = async () => {
        try {
            const response = await instance.get('/recipes/recommended');
            console.log('recommend resoonse:    ', response);
            if (response.data.code == 'OK') {
                console.log('recommend response.data:       ', response.data);
                setRecipes(response.data.data);
                const parsedData = JSON.parse(sessionStorage.getItem('persist:root')!);
                const userData = JSON.parse(parsedData.user);
                const parsedProvider = userData.value.provider;
                console.log(parsedProvider);
            }
        } catch (err) {
            console.log(err);
            dispatch(showModal({ isOpen: true, content: '추천 레시피 조회에 실패했습니다. 잠시 후 다시 시도해주세요.', onConfirm: null }));
        }
    };

    return (
        <S_RecipeContainer>
            <RecipeList recipes={recipes} />
        </S_RecipeContainer>
    );
}

export default withAuth(RecommendedRecipes);
