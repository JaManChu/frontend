import { useState, ChangeEvent } from 'react';
// import axios from 'axios';
export const useSearchInput = () => {
    const [searched, setSearched] = useState<string>('');
    const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
    const [message, setMessage] = useState<string>('');

    const changeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const search = e.target.value;
        setSelectedIngredients(search.split(' '));
        setSearched(search);
    };

    const handleSubmit = async () => {
        if (searched === '') {
            alert('검색어를 입력해주세요');
        } else {
            alert(selectedIngredients);
        }
        try {
            // const response = await axios.get('/recipes/search');
            // ! 데이터 들어오는 구조 확인 - 데이터 받아오면 setSelectedIngredients 데이터 가공해서 화면 렌더링 처리
        } catch (err: any) {
            console.log(err);
            setMessage(err);
        }
    };

    const handleActiveEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSubmit();
        }
    };

    return {
        searched,
        setSearched,
        message,
        setMessage,
        changeInputHandler,
        handleSubmit,
        handleActiveEnter,
    };
};
