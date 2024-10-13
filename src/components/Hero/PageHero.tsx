import styled from 'styled-components';
import colors from '../../styles/colors';

interface TitleProps {
    title: string;
}

export default function PageHero({ title }: TitleProps): JSX.Element {
    return (
        <>
            <S_TitleHeader>
                <S_Title>{title} Recipes</S_Title>
            </S_TitleHeader>
        </>
    );
}

const S_TitleHeader = styled.div`
    min-height: 20vh;
    background-color: ${colors[100]};
    display: flex;
    align-items: center;
    justify-content: center;
`;

const S_Title = styled.h3`
    font-size: 32px;
    color: ${colors[900]};
`;
