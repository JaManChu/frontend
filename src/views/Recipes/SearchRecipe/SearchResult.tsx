import styled from 'styled-components';
// import RecipeCard from '../Recipe/RecipeCard';
// import RecipeList from '../Recipe/RecipeList';

interface SearchResultProps {
    recipes: Record<string, string | number>[]; // ! api통신 후 키와 타입 재정의
    searching: boolean;
}

export function SearchResult({ recipes, searching }: SearchResultProps) {
    return (
        <ResultContainer>
            {searching ? (
                <div>검색중입니다.</div>
            ) : (
                <ResultList>
                    {recipes.map((recipe, idx) => (
                        <ResultItem key={idx}>
                            <ItemFigure>
                                {/*  // ! src 속성 추가 */}
                                <img alt="레시피 이미지" />
                                {/* // ! 설명 추가 */}
                                <ItemFigcaption></ItemFigcaption>
                            </ItemFigure>
                        </ResultItem>
                    ))}
                </ResultList>
            )}
        </ResultContainer>
    );
}

const ResultContainer = styled.section``;
const ResultList = styled.ul``;
const ResultItem = styled.li``;
const ItemFigure = styled.figure``;
const ItemFigcaption = styled.figcaption``;
