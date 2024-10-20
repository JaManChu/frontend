import { useState } from 'react';
import instance from '../utils/api/instance';
import { useNavigate } from 'react-router-dom';
import useAuthToken from './useAuthToken';
import axios from 'axios';

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
    const [thumbnail, setThumbnail] = useState<string>('');
    // 이미지 미리보기 상태
    const [imagePreviews, setImagePreviews] = useState<(string | null)[]>([]);

    //썸네일 이미지관리.
    const handleThumbnailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            const tuumbnailImg = URL.createObjectURL(file);
            setThumbnail(tuumbnailImg); // 썸네일 파일 상태 업데이트
        }
    };

    //조리단계 미리보기 상태관리.
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

    //재료추가 버튼 클릭 시 ingredients(재료상태)값에 추가
    const handleAddIngredient = () => {
        setIngredients([...ingredients, { ingredientName: '', ingredientQuantity: '' }]);
    };

    //단계 추가 버튼 클릭 시 steps(단계과정)값에 추가
    const handleAddStep = () => {
        setSteps([...steps, { content: '', picture: null }]);
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
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

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

        try {
            // 1. S3에 썸네일 이미지 업로드
            let thumbnailUrl = '';
            console.log(' 1. thumbnail : ', thumbnail);
            if (thumbnail) {
                const formDataThumbnail = new FormData();
                formDataThumbnail.append('file', thumbnail);

                const s3ThumbnailResponse = await instance.post(`/recipes/thumbnail?recipeName=${recipeName}`, formDataThumbnail, {
                    headers: {
                        'access-token': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.log('s3Thumbnail Response : ', s3ThumbnailResponse);
                console.log('s3Thumbnail Response.data : ', s3ThumbnailResponse.data);
                //! response된 값 보고 수정필요
                thumbnailUrl = s3ThumbnailResponse.data['Response body'];
            }
            console.log(' 1. thumbnailUrl : ', thumbnailUrl);

            // 2. S3에 조리 순서 이미지 업로드
            const formDataOrderImages = new FormData();
            steps.forEach((step) => {
                if (step.picture) {
                    formDataOrderImages.append('file', step.picture);
                }
            });
            console.log('2.formDataOrderImages : ', formDataOrderImages);

            const s3OrderImagesResponse = await instance.post(`/recipes/orderImage?recipeName=${recipeName}`, formDataOrderImages, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('s3OrderImageResponse : ', s3OrderImagesResponse);
            console.log('s3OrderImageResponse.data : ', s3OrderImagesResponse.data);
            //! response된 값 보고 수정필요
            const orderImageUrls = s3OrderImagesResponse.data.body; // 조리 과정 이미지 URL 배열
            console.log('orderImageUrls : ', orderImageUrls);
            // 3. 레시피 등록 API 호출
            const recipeData = {
                recipeName: recipeName,
                recipeLevel: recipeLevel,
                recipeCookingTime: recipeCookingTime,
                // recipeThumbnail: thumbnailUrl,
                recipeIngredients: ingredients.map((ingredient) => ({
                    ingredientName: ingredient.ingredientName,
                    ingredientQuantity: ingredient.ingredientQuantity,
                })),
                recipeOrderContents: steps.map((step) => ({
                    recipeOrderContent: step.content,
                    // recipeOrderImage: orderImageUrls[index] || '',
                })),
            };
            console.log('recipeData : ', recipeData);

            const response = await axios.post(`/recipes?thumbnailUrl=${thumbnailUrl}&recipeOrderImagesUrl=${orderImageUrls.join(',')}`, recipeData, {
                headers: {
                    'access-token': `Bearer ${token}`,
                },
            });
            console.log('레시피등록 최종 response : ', response);
            console.log('레시피등록 최종 response.data : ', response.data);

            //! 레시피등록 최종 response보고 수정
            if (response.status === 201) {
                alert('레시피가 성공적으로 등록되었습니다!');
                navigate('/recipes');
            }
        } catch (error) {
            console.error('레시피 등록 실패:', error);
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
        handleThumbnailChange,
        thumbnail,
    };
};
