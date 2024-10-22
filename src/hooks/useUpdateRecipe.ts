import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecipeCreate } from './useRecipeCreate';
import useAuthToken from './useAuthToken';
import instance from '../utils/api/instance';
import DefaultImg from '../assets/img/defaultImg.jpeg';
export const useUpdateRecipes = (id: string | undefined) => {
    const navigate = useNavigate();
    const token = useAuthToken();
    const [userNickname, setUserNickname] = useState(''); // 로그인된 유저의 닉네임
    const [isAuthor, setIsAuthor] = useState(false); // 작성자 여부 확인용
    const {
        setRecipeName,
        setRecipeLevel,
        setRecipeCookingTime,
        setIngredients,
        setSteps,
        recipeName,
        recipeLevel,
        recipeCookingTime,
        ingredients,
        steps,
        setImagePreviews,
    } = useRecipeCreate();

    // 1. 로그인된 유저의 닉네임 가져오기
    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }

        const fetchUserInfo = async () => {
            try {
                const response = await instance.get('/users');
                console.log('게시물수정 유저정보', response);
                setUserNickname(response.data.data.nickname);
            } catch (error) {
                console.error('유저 정보를 불러오는 데 실패했습니다', error);
                navigate('/login');
            }
        };
        fetchUserInfo();
    }, [navigate]);

    // 2. 레시피 데이터 불러오기 및 작성자 확인
    useEffect(() => {
        const fetchRecipeData = async () => {
            try {
                const response = await instance.get(`/recipes/${id}`);
                console.log('게시물수정 레시피데이터', response);
                console.log('게시물수정 레시피데이터.data', response.data);

                const recipeData = response.data.data;

                // API에서 반환된 `recipeAuthor`와 로그인된 유저의 닉네임을 비교
                if (recipeData.recipeAuthor !== userNickname) {
                    alert('이 레시피를 수정할 권한이 없습니다.');
                    navigate(`/recipes/${id}`);
                    return;
                }

                // 작성자일 경우 레시피 데이터를 상태에 저장
                setIsAuthor(true);
                setRecipeName(recipeData.recipeName);
                setRecipeLevel(recipeData.recipeLevel);
                setRecipeCookingTime(recipeData.recipeCookingTime);
                setIngredients(recipeData.recipeIngredients);

                // Steps 데이터를 변환하여 상태에 저장
                const stepsData = recipeData.recipeManuals.map((manual: any) => ({
                    content: manual.recipeOrderContent,
                    picture: manual.recipeOrderImage || null,
                }));
                setSteps(stepsData);

                // 이미지 미리보기 데이터를 동기화
                const imagePreviewsData = recipeData.recipeManuals.map((manual: any) => manual.recipeOrderImage || DefaultImg);
                setImagePreviews(imagePreviewsData);

                console.log('recipeData.recipeName :', recipeData.recipeName);
                console.log('recipeData.recipeLevel :', recipeData.recipeLevel);
                console.log('recipeData.recipeCookingTime :', recipeData.recipeCookingTime);
                console.log('recipeData.recipeIngredients :', recipeData.recipeIngredients);
                console.log('recipeData.recipeManuals :', recipeData.recipesManuals);
            } catch (error) {
                console.error('레시피 데이터를 불러오는 데 실패했습니다', error);
                navigate('/recipes');
            }
        };

        if (userNickname) {
            fetchRecipeData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, navigate, userNickname]);

    // 3. 레시피 수정 요청
    const handleUpdateRecipe = async () => {
        if (!isAuthor) {
            alert('이 레시피를 수정할 권한이 없습니다.');
            return;
        }
        if (!id) {
            alert('레시피 ID가 없습니다.');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('recipeId', id);
            formData.append('recipeName', recipeName);
            formData.append('recipeLevel', recipeLevel);
            formData.append('recipeCookingTime', recipeCookingTime);
            ingredients.forEach((ingredient, index) => {
                formData.append(`recipeIngredients[${index}].ingredientName`, ingredient.ingredientName);
                formData.append(`recipeIngredients[${index}].ingredientQuantity`, ingredient.ingredientQuantity);
            });
            steps.forEach((step, index) => {
                formData.append(`recipeManuals[${index}].recipeOrderContent`, step.content);
                if (step.picture) {
                    formData.append(`recipeManuals[${index}].recipeOrderImage`, step.picture);
                }
            });

            await instance.put('/recipes', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('레시피가 성공적으로 수정되었습니다.');
            navigate(`/recipes/${id}`);
        } catch (error) {
            console.error('레시피 수정에 실패했습니다', error);
            alert('레시피 수정에 실패했습니다. 다시 시도해주세요.');
        }
    };
    return {
        recipeName,
        setRecipeName,
        recipeLevel,
        setRecipeLevel,
        recipeCookingTime,
        setRecipeCookingTime,
        ingredients,
        setIngredients,
        steps,
        setSteps,
        handleUpdateRecipe,
    };
};
