import { ChangeEvent, KeyboardEvent } from 'react';
import { SearchBox } from './SearchBox';
import { CiSearch } from 'react-icons/ci';
import styled from 'styled-components';

interface SearchConditionProps {
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
    handleSubmit: () => Promise<void>;
    handleTime: (e: ChangeEvent<HTMLSelectElement>) => void;
    handleLevel: (e: ChangeEvent<HTMLSelectElement>) => void;
    ingredientsList: string[];
}

export default function SearchCondition({
    value,
    onChange,
    handleSubmit,
    handleKeyDown,
    handleTime,
    handleLevel,
    ingredientsList,
}: SearchConditionProps): JSX.Element {
    console.log(typeof ingredientsList.length);
    return (
        <>
            <ConditionList>
                <SearchItem>
                    <label htmlFor="ingredient">재료</label>
                    <SearchBox value={value} onChange={onChange} handleKeyDown={handleKeyDown} />
                </SearchItem>
                <SearchItem>
                    <label htmlFor="recipeLevel">난이도</label>
                    <select name="level" id="recipeLevel" onChange={handleLevel}>
                        <option value="">선택해주세요</option>
                        <option value="high">상</option>
                        <option value="middle">중</option>
                        <option value="low">하</option>
                    </select>
                </SearchItem>
                <SearchItem>
                    <label htmlFor="recipeTime">조리시간</label>
                    <select name="time" id="recipeTime" onChange={handleTime}>
                        <option value="">선택해주세요</option>
                        <option value="10">10분</option>
                        <option value="15">15분</option>
                        <option value="30">30분</option>
                        <option value="60">60분</option>
                        <option value="120">120분</option>
                    </select>
                </SearchItem>
                <SearchIcon onClick={handleSubmit} />
            </ConditionList>
            {ingredientsList.length != 0 && (
                <ConditionContent>
                    <h4>선택하신 재료가 맞나요?</h4>
                    <ConditionContentList length={ingredientsList.length}>
                        {ingredientsList.map((ingredient, idx) => (
                            <ConditionContentItem key={idx}>
                                <span>선택재료{idx + 1}</span>
                                <span>{ingredient}</span>
                            </ConditionContentItem>
                        ))}
                    </ConditionContentList>
                </ConditionContent>
            )}
        </>
    );
}

const ConditionList = styled.ul`
    width: 80%;
    margin: 40px auto;
    list-style: none;
    border-radius: 16px;
    background-color: #efb63e;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
const SearchItem = styled.li`
    margin: 8px;
    padding: 8px;
    height: 80px;

    border-radius: 16px;
    background-color: #eaecec;
    label {
        margin-bottom: 8px;
        font-size: 12px;
        display: block;
    }
    &:first-child {
        flex-grow: 2;
    }
`;
const SearchIcon = styled(CiSearch)`
    margin-left: 10px;
    font-size: 24px;
    color: #333;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:hover {
        color: #007bff;
    }
`;

const ConditionContent = styled.div`
    h4 {
        font-size: 20px;
        font-weight: 400;
        text-align: center;
    }
`;
const ConditionContentList = styled.ul<{ length: number }>`
    margin: 0 auto;
    padding: 10px;
    width: 80%;
    height: auto;
    border: 3px solid #efb63e;
    border-radius: 16px;
    list-style: none;

    display: grid;
    grid-template-columns: ${({ length }) => `repeat(${length}, 1fr)`};
    label {
        display: block;
    }
`;
const ConditionContentItem = styled.li`
    padding: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-right: 1px solid lightgray;
    &:last-child {
        border-right: none;
    }
`;
