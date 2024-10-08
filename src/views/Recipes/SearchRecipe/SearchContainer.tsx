import { ChangeEvent, KeyboardEvent } from 'react';
import { SearchResult } from './SearchResult';
import SearchCondition from './SearchCondition';

interface ContainerProps {
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
    handleSubmit: () => Promise<void>;
    handleTime: (e: ChangeEvent<HTMLSelectElement>) => void;
    handleLevel: (e: ChangeEvent<HTMLSelectElement>) => void;
    ingredientsList: string[];
    recipes: Record<string, string | number>[]; // ! api통신 후 키와 타입 재정의
    searching: boolean;
}

export default function SearchContainer({
    value,
    onChange,
    handleSubmit,
    handleKeyDown,
    handleLevel,
    handleTime,
    ingredientsList,
    recipes,
    searching,
}: ContainerProps): JSX.Element {
    return (
        <>
            <SearchCondition
                value={value}
                onChange={onChange}
                handleSubmit={handleSubmit}
                handleKeyDown={handleKeyDown}
                handleLevel={handleLevel}
                handleTime={handleTime}
                ingredientsList={ingredientsList}
            />
            <SearchResult recipes={recipes} searching={searching} />
        </>
    );
}
