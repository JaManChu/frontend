import { useState } from 'react';
import axios from 'axios';

export const useRecipeWrite = () => {
    //steps의 객체는 각각 타입이다르므로 인터페이스로 타입정의.
    interface Step {
        order: number;
        content: string;
        picture: File | null; // File | null 타입으로 지정
    }

    //레시피 정보들
    const [recipeName, setRecipeName] = useState(''); // 레시피명
    const [recipeLevel, setRecipeLevel] = useState('EASY'); // 레시피난이도
    const [recipeCookingTime, setRecipeCookingTime] = useState(''); // 조리소요시간
    const [ingredients, setIngredients] = useState([{ ingredientName: '', ingredientQuantity: '' }]); //레시피에 필요한 재료들
    const [steps, setSteps] = useState<Step[]>([{ order: 1, content: '', picture: null }]); //레시피 조리 순서

    // 이미지 미리보기 상태
    const [imagePreviews, setImagePreviews] = useState<(string | null)[]>([]);

    //재료추가 버튼 클릭 시 ingredients(재료상태)값에 추가
    const handleAddIngredient = () => {
        setIngredients([...ingredients, { ingredientName: '', ingredientQuantity: '' }]);
    };

    //단계 추가 버튼 클릭 시 steps(단계과정)값에 추가
    const handleAddStep = () => {
        setSteps([...steps, { order: steps.length + 1, content: '', picture: null }]);
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

        // const token = JSON.parse(localStorage.getItem('token') || '');

        //유효성검사
        if (!recipeName || !recipeCookingTime) {
            alert('레시피명과 요리시간을 입력해주세요');
            return;
        }

        const invalidIngredients = ingredients.some((ingredient) => !ingredient.ingredientName || !ingredient.ingredientQuantity);

        if (invalidIngredients) {
            alert('모든 재료의 이름과 양을 입력해주세요');
        }

        const invalidSteps = steps.some((step) => !step.content);

        if (invalidSteps) {
            alert('조리과정을 입력해주세요');
        }

        // FormData 생성
        const formData = new FormData();
        formData.append('recipeName', recipeName);
        formData.append('recipeLevel', recipeLevel);
        formData.append('recipeCookingTime', recipeCookingTime);

        //api명세서 request요청 형태에 따라
        //recipeIngredient[0][ingredientName] = 재료명
        //recipeIngredient[0][ingredientQuantity] = 재료 양
        ingredients.forEach((ingredient, index) => {
            formData.append(`recipeIngredient[${index}][ingredientName]`, ingredient.ingredientName);
            formData.append(`recipeIngredient[${index}][ingredientQuantity]`, ingredient.ingredientQuantity);
        });

        //재료와 동일한 형태로 formData에 저장.
        steps.forEach((step, index) => {
            formData.append(`recipeOrderContent[${index}][order]`, step.order.toString());
            formData.append(`recipeOrderContent[${index}][content]`, step.content);

            //이미지가 존재할때만 추가.
            if (step.picture) {
                formData.append(`recipeOrderContent[${index}][picture]`, step.picture);
            }
        });

        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/recipes`, formData, {
                // headers: {
                //     'Access-Token': `Bearer ${token}`,
                //     'Content-Type': 'multipart/form-data',
                // },
            });
            console.log(response.data); // 요청 성공 후 처리
        } catch (error) {
            console.error(error);
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
