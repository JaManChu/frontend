import { ChangeEvent, KeyboardEvent } from 'react';
import { SearchBox } from './SearchBox';
import { CiSearch } from 'react-icons/ci';
import CustomSelect from '../../../ui/Select/CustomSelect';
import { SelectChangeEvent } from '@mui/material/Select';
import { levelOptions, timeOption } from '../../../common/options';
import colors from '../../../styles/colors';
import styled from 'styled-components';

interface SearchConditionProps {
    time: string;
    level: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
    handleSubmit: () => Promise<void>;
    handleTime: (e: SelectChangeEvent) => void;
    handleLevel: (e: SelectChangeEvent) => void;
    ingredientsList: string[];
}

export default function SearchCondition({
    time,
    level,
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
            <S_ConditionList>
                <S_SearchItem>
                    <SearchBox value={value} onChange={onChange} handleKeyDown={handleKeyDown} />
                </S_SearchItem>
                <S_SearchItem>
                    <CustomSelect id="recipeLevel" options={timeOption} value={level} label="난이도" handleChange={handleTime} />
                </S_SearchItem>
                <S_SearchItem>
                    <CustomSelect id="recipeTime" options={levelOptions} value={time} label="조리시간" handleChange={handleLevel} />
                </S_SearchItem>
                <S_SearchIcon onClick={handleSubmit} />
            </S_ConditionList>
            {ingredientsList.length != 0 && (
                <S_ConditionContent>
                    <h4>선택하신 재료를 확인후, 엔터 혹은 검색버튼을 눌러주세요</h4>
                    <S_ConditionContentList length={ingredientsList.length}>
                        {ingredientsList.map((ingredient, idx) => (
                            <S_ConditionContentItem key={idx}>
                                <span>선택재료{idx + 1}</span>
                                <span>{ingredient}</span>
                            </S_ConditionContentItem>
                        ))}
                    </S_ConditionContentList>
                </S_ConditionContent>
            )}
        </>
    );
}

const S_ConditionList = styled.ul`
    width: 80%;
    margin: 40px auto;
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

const S_ConditionContent = styled.div`
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
