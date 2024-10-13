import { useEffect, useState, ChangeEvent, KeyboardEvent, FormEvent } from 'react';
import { SelectChangeEvent } from '@mui/material/Select';
import axios from 'axios';

export default function useSearchRecipe() {
    const [searching, setSearching] = useState<boolean>(false); // 검색중 여부
    const [searchIngredients, setSearchIngredients] = useState<string>(''); // 사용자 입력 검색어
    const [ingredientsList, setIngredientsList] = useState<string[]>([]); // 공백 기준 검색어 리스트
    const [recipes, setRecipes] = useState([]); // 레시피 데이터 저장
    const [time, setTime] = useState<string>(''); // 소요시간(select에서 선택)
    const [level, setLevel] = useState<string>(''); // 난이도(select에서 선택)
    const [message, setMessage] = useState<string>('');

    // 재료 입력시에 검색어 리스트 입력 재료로 갱신
    useEffect(() => {
        if (searchIngredients.trim()) {
            // 입력값이 공백이 아닐 경우에만 처리
            const ingredients = searchIngredients.split(' ').filter((ingredient) => ingredient);
            setIngredientsList([...ingredients]);
        } else {
            setIngredientsList([]); // 입력값이 공백인 경우 빈 배열 설정
        }
    }, [searchIngredients]);

    // 검색어 상태관리
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchIngredients(e.target.value);
    };

    const token = sessionStorage.getItem('token');
    // 검색 버튼 클릭시 api 통신
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setSearching(true); // 검색 중임을 나타내는 상태
        if (!ingredientsList.length) {
            alert('재료명을 입력해주시기 바랍니다.');
            setSearching(false); // 재료명을 입력하지 않았음 : 검색 중이 아님
            return;
        }

        try {
            const response: any = await axios.get(`${import.meta.env.VITE_BASE_URL}`, {
                params: { ingredientName: ingredientsList, recipeCookingTime: time, recipeLevel: level },
                headers: { 'access-token': `Bearer ${token}` },
            });
            console.log('search response: ', response);
            console.log('검색내용', ingredientsList, time, level);
            if (response.data.code == 'OK') {
                console.log('search response.data: ', response.data);
                console.log('search response: ', response);
                setRecipes(response.data.data);
                setMessage(response.data.message);
            } else {
                console.log('code ok 아닐때');
                setMessage('재료명을 다시 입력해주시기 바랍니다.');
            }
        } catch (err) {
            console.log('search err: ', err);
            console.log('검색 오류입니다.');
            setMessage('검색 중 오류가 발생했습니다. 다시 시도해주세요.');
        } finally {
            setSearching(false);
            setSearchIngredients('');
        }
    };
    console.log(`search messag:${message}`);

    // 재료 입력후 enter 키를 누른 경우 handleSumbit 호출
    const handleKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key == 'Enter') {
            await handleSubmit(e);
        }
    };

    // 난이도를 변경하는 핸들러
    const handleLevel = (e: SelectChangeEvent) => {
        setLevel(e.target.value);
    };

    // 소요시간을 변경하는 핸들러
    const handleTime = (e: SelectChangeEvent) => {
        setTime(e.target.value);
    };

    return {
        handleChange,
        handleSubmit,
        handleKeyDown,
        searching,
        recipes,
        searchIngredients,
        ingredientsList,
        handleLevel,
        handleTime,
        time,
        level,
    };
}
