import { useState, useEffect, ChangeEvent, FormEvent, KeyboardEvent } from 'react';
import { SearchBox } from './SearchBox';
import { SearchResult } from './SearchResult';
import { levelOptions, timeOption } from '../../../common/options';
import CustomSelect from '../../../ui/Select/CustomSelect';
import { useDispatch } from 'react-redux';
import { showModal } from '../../../redux/reducer/modalSlice';
import { SelectChangeEvent } from '@mui/material/Select';
import { CiSearch } from 'react-icons/ci';
import colors from '../../../styles/colors';
import styled from 'styled-components';
import instance from '../../../utils/api/instance';
import qs from 'qs';
import Navibar from '../../../components/Navibar/Navibar';
import { convertLevel, convertTime } from '../../../common/convertFunc.js';

export interface RecipeProps {
    recipeId: number;
    recipeName: string;
    recipeAuthor: string;
    recipeLevel: string;
    recipeCookingTime: string;
    recipeThumbnail: string;
    recipeRating: string;
    ingredients: Record<string, string | number>[];
    instructions: Record<number | string, string>[];
}

export default function SearchCondition(): JSX.Element {
    const dispatch = useDispatch();
    const [recipes, setRecipes] = useState<RecipeProps[]>([]); // 레시피 데이터 저장
    const [searchIngredients, setSearchIngredients] = useState<string>(''); // 입력 검색어
    const [ingredientsList, setIngredientsList] = useState<string[]>([]); // 입력 검색어 저장 리스트
    const [time, setTime] = useState<string>(''); // 소요시간(select에서 선택)
    const [level, setLevel] = useState<string>(''); // 난이도(select에서 선택)
    const [offset, setOffset] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [hasSearched, setHasSearched] = useState<boolean>(false);

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

    // 검색 버튼 클릭시 api 통신
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!ingredientsList.length && !time && !level) {
            dispatch(showModal({ isOpen: true, content: '재료명, 조리시간, 난이도 중 하나는 입력해주시기 바랍니다.', onConfirm: null }));
            return;
        }
        await fetchRecipes();
    };

    const fetchRecipes = async () => {
        if (isLoading) return;
        setIsLoading(true);
        try {
            const response: any = await instance.get(`/recipes/search`, {
                params: {
                    ingredientName: ingredientsList,
                    ...(time && { recipeCookingTime: time }),
                    ...(level && { recipeLevel: level }),
                    page: offset,
                    size: 15,
                },
                paramsSerializer: (params) => {
                    return qs.stringify(params, { arrayFormat: 'repeat' });
                },
            });
            console.log('search response: ', response);
            console.log('검색내용', ingredientsList, time, level);
            if (response.data.code == 'OK') {
                console.log('search response.data: ', response.data);
                console.log('search response: ', response);
                const newRecipes: RecipeProps[] = response.data.data;
                const uniqueRecipes = newRecipes.filter(
                    (newRecipe) => !recipes.some((existingRecipe) => existingRecipe.recipeId === newRecipe.recipeId),
                );
                const convertData = uniqueRecipes.map((recipe) => ({
                    ...recipe,
                    recipeLevel: convertLevel(recipe.recipeLevel),
                    recipeCookingTime: convertTime(recipe.recipeCookingTime),
                }));
                setRecipes((prev) => [...prev, ...convertData]);
                setOffset((prev) => prev + 1);
                setHasSearched(true);
                dispatch(showModal({ isOpen: true, content: response.data.message, onConfirm: null }));
            } else {
                console.log('code ok 아닐때');
                dispatch(showModal({ isOpen: true, content: '재료명을 다시 입력해주시기 바랍니다.', onConfirm: null }));
            }
        } catch (err) {
            console.log('레시피 검색 error : ', err);
            dispatch(showModal({ isOpen: true, content: '검색 중 오류가 발생했습니다. 다시 시도해주세요.', onConfirm: null }));
        } finally {
            setIsLoading(false);
            setSearchIngredients('');
        }
    };

    // 재료 입력후 enter 키를 누른 경우 handleSumbit 호출
    const handleKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key == 'Enter') {
            await handleSubmit(e);
        }
    };

    // 난이도를 변경하는 핸들러
    const handleLevel = (e: SelectChangeEvent) => {
        console.log(e.target.value);
        setLevel(e.target.value);
    };

    // 소요시간을 변경하는 핸들러
    const handleTime = (e: SelectChangeEvent) => {
        setTime(e.target.value);
        console.log(e.target.value);
    };

    return (
        <S_ConditionContainer>
            <S_ConditionList>
                <S_SearchItem>
                    <SearchBox value={searchIngredients} onChange={handleChange} handleKeyDown={handleKeyDown} />
                </S_SearchItem>
                <S_SearchItem>
                    <CustomSelect id="recipeLevel" options={timeOption} value={level} label="난이도" handleChange={handleLevel} />
                </S_SearchItem>
                <S_SearchItem>
                    <CustomSelect id="recipeTime" options={levelOptions} value={time} label="조리시간" handleChange={handleTime} />
                </S_SearchItem>
                <S_SearchIcon onClick={handleSubmit} />
            </S_ConditionList>
            {ingredientsList.length != 0 && (
                <S_SearchedContent>
                    <h4>선택하신 재료를 확인후, 엔터 혹은 검색버튼을 눌러주세요</h4>
                    <S_ConditionContentList length={ingredientsList.length}>
                        {ingredientsList.map((ingredient, idx) => (
                            <S_ConditionContentItem key={idx}>
                                <span>선택재료{idx + 1}</span>
                                <span>{ingredient}</span>
                            </S_ConditionContentItem>
                        ))}
                    </S_ConditionContentList>
                </S_SearchedContent>
            )}
            <SearchResult recipes={recipes} isLoading={isLoading} hasSearched={hasSearched} fetchRecipes={fetchRecipes} />
            <Navibar />
        </S_ConditionContainer>
    );
}
const S_ConditionContainer = styled.div`
    padding: 38px;
`;
const S_ConditionList = styled.ul`
    list-style: none;
    border-radius: 16px;
    background-color: ${colors[400]};
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
const S_SearchItem = styled.li`
    margin: 8px;
    padding: 8px;
    height: 80px;
    border-radius: 16px;
    background-color: #eaecec;

    &:first-child {
        flex-grow: 4;
    }
`;
const S_SearchIcon = styled(CiSearch)`
    margin-left: 10px;
    font-size: 24px;
    color: #333;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:hover {
        color: #fff;
    }
`;

const S_SearchedContent = styled.div`
    h4 {
        font-size: 20px;
        font-weight: 400;
        text-align: center;
    }
`;
const S_ConditionContentList = styled.ul<{ length: number }>`
    margin: 0 auto 70px;
    padding: 10px;
    width: 80%;
    height: auto;
    border: 3px solid ${colors[400]};
    border-radius: 16px;
    list-style: none;

    display: grid;
    grid-template-columns: ${({ length }) => `repeat(${length}, 1fr)`};
    label {
        display: block;
    }
`;
const S_ConditionContentItem = styled.li`
    padding: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-right: 1px solid lightgray;
    &:last-child {
        border-right: none;
    }
`;
