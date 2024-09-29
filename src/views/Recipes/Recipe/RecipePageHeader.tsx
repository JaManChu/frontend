import styled from 'styled-components';

const TitleHeader = styled.div`
    height: 150px;
    display: grid;
    grid-template-columns: 1fr 300px;
    border: 0.4px solid;

    img {
        border-left: 1px solid;
    }
`;

const Title = styled.h3`
    margin: auto;
    color: #622b18;
    font-size: 32px;
    text-align: start;
`;

interface TitleProps {
    title: string;
}

export default function RecipePageHeader({ title }: TitleProps) {
    return (
        <>
            <TitleHeader>
                <Title>
                    Choose for your meal,
                    <br />
                    {title} Recipes
                </Title>
                <img src="" alt="음식이미지" />
            </TitleHeader>
        </>
    );
}
