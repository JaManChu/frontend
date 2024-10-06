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
                <RecipeInfo>
                    <FaRegClock />
                    <RecipeInfoItem>{time}</RecipeInfoItem>
                    <FaStairs />
                    <RecipeInfoItem>{level}</RecipeInfoItem>
                    <FaRegStar />
                    <RecipeInfoItem>{rate}</RecipeInfoItem>
                </RecipeInfo>
            ) : null}
        </>
    );
}

const RecipeInfo = styled.div`
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const RecipeInfoItem = styled.span`
    margin: 0 8px 0 5px;
`;
