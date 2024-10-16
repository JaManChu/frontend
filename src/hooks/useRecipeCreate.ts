import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuthToken from './useAuthToken';

export const useRecipeCreate = () => {
    const navigate = useNavigate();
    const token = useAuthToken();
    //steps의 객체는 각각 타입이다르므로 인터페이스로 타입정의.
    interface Step {
        content: string;
        picture: File | null; // File | null 타입으로 지정
    }

    //레시피 정보들
    const [recipeName, setRecipeName] = useState(''); // 레시피명
    const [recipeLevel, setRecipeLevel] = useState('LOW'); // 레시피난이도
    const [recipeCookingTime, setRecipeCookingTime] = useState(''); // 조리소요시간
    const [ingredients, setIngredients] = useState([{ ingredientName: '', ingredientQuantity: '' }]); //레시피에 필요한 재료들
    const [steps, setSteps] = useState<Step[]>([{ content: '', picture: null }]); //레시피 조리 순서

    // 이미지 미리보기 상태
    const [imagePreviews, setImagePreviews] = useState<(string | null)[]>([]);

    //재료추가 버튼 클릭 시 ingredients(재료상태)값에 추가
    const handleAddIngredient = () => {
        setIngredients([...ingredients, { ingredientName: '', ingredientQuantity: '' }]);
    };

    //단계 추가 버튼 클릭 시 steps(단계과정)값에 추가
    const handleAddStep = () => {
        setSteps([...steps, { content: '', picture: null }]);
    };

    //미리보기 상태관리.
    const handleImageChange = (e: any, index: number) => {
        const file = e.target.files?.[0] || null; //사용자가 업로드한 파일있으면 가져오고 없으면 null
        const newSteps = [...steps];
        newSteps[index].picture = file; // 해당 단계에 이미지 파일 저장
        setSteps(newSteps);

        // 이미지 미리보기 URL 생성
        const newImagePreviews = [...imagePreviews];
        if (file) {
            newImagePreviews[index] = URL.createObjectURL(file); //파일이있는경우 미리보기 URL생성
        } else {
            newImagePreviews[index] = null;
        }
        setImagePreviews(newImagePreviews);
    };

    //재료, 조리과정 삭제버튼
    const handleDeleteIngredient = (index: number) => {
        const newIngredient = ingredients.filter((_, i) => i !== index);
        setIngredients(newIngredient);
    };

    const handleDeleteStep = (index: number) => {
        const newStep = steps.filter((_, i) => i !== index);
        setSteps(newStep);

        const newImagePreviews = imagePreviews.filter((_, i) => i !== index);
        setImagePreviews(newImagePreviews);
    };

    //레시피 등록 버튼 클릭 시 api호출
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!token) {
            alert('잘못된 접근입니다. 로그인해주세요.');
            navigate('/login');
            return;
        }

        // 유효성 검사
        if (!recipeName || !recipeCookingTime) {
            alert('레시피명과 요리 시간을 입력해주세요.');
            return;
        }

        const invalidIngredients = ingredients.some((ingredient) => !ingredient.ingredientName || !ingredient.ingredientQuantity);
        if (invalidIngredients) {
            alert('모든 재료의 이름과 양을 입력해주세요.');
            return;
        }

        const invalidSteps = steps.some((step) => !step.content);
        if (invalidSteps) {
            alert('조리 과정을 입력해주세요.');
            return;
        }

        // JSON 객체 생성
        const requestBody = {
            recipeName: recipeName,
            recipeLevel: recipeLevel,
            recipeCookingTime: recipeCookingTime,
            recipeThumbnail: '',
            recipeIngredients: ingredients.map((ingredient) => ({
                ingredientName: ingredient.ingredientName,
                ingredientQuantity: ingredient.ingredientQuantity,
            })),
            recipeOrderContents: steps.map((step) => ({
                recipeOrderContent: step.content,
                recipeOrderImage: '',
            })),
        };

        // 첫 번째 조리 단계의 이미지를 썸네일로 설정 (이미지 URL로 설정할 경우)
        if (steps.length > 0 && typeof steps[0].picture === 'string') {
            requestBody.recipeThumbnail = steps[0].picture;
        }

        // 각 단계에 이미지가 있는 경우 이미지 URL을 설정
        requestBody.recipeOrderContents = steps.map((step) => ({
            recipeOrderContent: step.content,
            recipeOrderImage: typeof step.picture === 'string' ? step.picture : '', // 이미지가 URL이면 추가
        }));

        console.log('전달할 JSON 데이터 확인:', requestBody);
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/recipes`, requestBody, {
                headers: {
                    'Access-Token': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });
            console.log('게시물 작성 response', response);
            console.log('response.data', response.data);

            if (response.status === 201) {
                console.log('성공', response.data);
                alert('레시피가 성공적으로 등록되었습니다!');
                // 등록 후 리다이렉트
                navigate('/recipes');
            }
        } catch (error) {
            console.error('레시피 등록 실패', error);
            alert('레시피 등록에 실패했습니다. 다시 시도해주세요.');
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
        handleAddIngredient,
        handleAddStep,
        handleSubmit,
        steps,
        setSteps,
        handleDeleteIngredient,
        handleDeleteStep,
        handleImageChange,
        imagePreviews,
    };
};
