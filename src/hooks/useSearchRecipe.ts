import { useEffect, useState, ChangeEvent, KeyboardEvent } from 'react';
import axios from 'axios';

export default function useSearchRecipe() {
    const [searching, setSearching] = useState<boolean>(false); // 검색중 여부
    const [searchIngredients, setSearchIngredients] = useState<string>(''); // 사용자 입력 검색어
    const [ingredientsList, setIngredientsList] = useState<string[]>([]); // 공백 기준 검색어 리스트
    const [recipes, setRecipes] = useState<Record<string, string | number>[]>([]); // 레시피 데이터 저장

    // 재료 입력시에 검색어 리스트 입력 재료로 갱신
    useEffect(() => {
        const ingredients = searchIngredients.split(' '); // 사용자 검색 재료 공백기준으로 배열로 저장
        setIngredientsList([...ingredients]);
    }, [searchIngredients]);

    // 검색어 상태관리
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchIngredients(e.target.value);
    };

    // 검색을 하는 경우 api 통신 진행
    const handleSubmit = async () => {
        setSearching(true); // 검색 중임을 나타내는 상태
        if (!ingredientsList.length) {
            alert('재료명을 입력해주시기 바랍니다.');
            setSearching(false); // 재료명을 입력하지 않았음 : 검색 중이 아님
            return;
        }
        try {
            const response: any = await axios.get(`${import.meta.env.VITE_BASE_URL}`, { params: ingredientsList });
            if (response.code == 200) {
                console.log(response.data);
                setRecipes(response.data);
            } else {
                alert('재료명을 다시 입력해주시기 바랍니다.');
            }
        } catch (err) {
            console.log(err);
            console.log('검색 오류입니다.');
            alert('검색 중 오류가 발생했습니다. 다시 시도해주세요.');
        } finally {
            setSearching(false);
            setSearchIngredients('');
        }
    };

    // 재료 입력후 enter 키를 누른 경우 handleSumbit 호출
    const handleKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key == 'Enter') {
            await handleSubmit();
        }
    };

    return { handleChange, handleSubmit, handleKeyDown, searching, recipes, searchIngredients };
}
