import { FaStairs, FaRegClock, FaRegStar } from 'react-icons/fa6';
import styled from 'styled-components';

interface Props {
    page?: string;
    time: string;
    level: string;
    rate: string;
}
export default function RecipeMetaData({ page = '', time, level, rate }: Props): JSX.Element {
    return (
        <>
            {page != 'popular' ? (
                <S_RecipeInfo>
                    <FaRegClock />
                    <S_RecipeInfoItem>{time}</S_RecipeInfoItem>
                    <FaStairs />
                    <S_RecipeInfoItem>{level}</S_RecipeInfoItem>
                    <FaRegStar />
                    <S_RecipeInfoItem>{rate}</S_RecipeInfoItem>
                </S_RecipeInfo>
            ) : null}
        </>
    );
}

const S_RecipeInfo = styled.div`
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const S_RecipeInfoItem = styled.span`
    margin: 0 8px 0 5px;
`;
