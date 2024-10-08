import { ChangeEvent, KeyboardEvent } from 'react';

import styled from 'styled-components';

interface SearchBoxProps {
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
}

export function SearchBox({ value, onChange, handleKeyDown }: SearchBoxProps) {
    return (
        <SearchWrapper>
            <SearchInput type="search" value={value} onChange={onChange} onKeyDown={handleKeyDown} placeholder="재료를 입력하세요" />
        </SearchWrapper>
    );
}

const SearchWrapper = styled.div`
    margin: 0 auto;
`;
const SearchInput = styled.input`
    display: block;
    width: 100%;
    height: 40px;
    padding-left: 16px;
    border: transparent;
    border-radius: 16px;
    background-color: rgba(239, 182, 63, 0.2);
`;
