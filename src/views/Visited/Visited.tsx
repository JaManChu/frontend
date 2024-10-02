import styled from 'styled-components';

const VisitedContainer = styled.section`
    width: 40%;
`;
const VisitedTitle = styled.h2`
    margin: 36px 16px 0px;
    color: #622b18;
    font-size: 40px;
    text-align: center;
`;
const VisitedContents = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
`;
const VistedDiv = styled.div`
    border-right: 2px solid;
    font-size: 20px;
    padding-right: 16px;
    margin-right: 16px;
`;

export default function Visited() {
    return (
        <VisitedContainer>
            <VisitedTitle>Visited</VisitedTitle>
            <VisitedContents>
                <VistedDiv>Total</VistedDiv>
                <VistedDiv>Daily</VistedDiv>
                <VistedDiv>Monthly</VistedDiv>
            </VisitedContents>
        </VisitedContainer>
    );
}
