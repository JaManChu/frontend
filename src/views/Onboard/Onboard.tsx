import { useNavigate } from 'react-router-dom';
import { Layout } from '../../styles/layout';
import styled from 'styled-components';
import logo from '../../assets/img/logo.png';

export default function Onboard(): JSX.Element {
    const navigate = useNavigate();

    const RecomendItemsArray = [
        { imgUrl: 'https://thumb.ac-illust.com/73/7387030e5a5600726e5309496353969a_t.jpeg', content: '자취할때 어떻게 요리를 선택하시나요 ?' },
        {
            imgUrl: 'https://thumb.ac-illust.com/73/7387030e5a5600726e5309496353969a_t.jpeg',
            content: '좋아하는 요리를 선택해 오늘의 요리를 추천받아보세요.',
        },
        { imgUrl: 'https://thumb.ac-illust.com/73/7387030e5a5600726e5309496353969a_t.jpeg', content: '원하는 요리를 직접 고를수도 있어요' },
        {
            imgUrl: 'https://thumb.ac-illust.com/73/7387030e5a5600726e5309496353969a_t.jpeg',
            content: '나중에 도전하고 싶은 요리는 저장해 놓을 수 있어요',
        },
    ];
    return (
        <Layout>
            <OnboardContainer>
                <OnboardHeader>
                    <img src={logo} alt="Logo" />
                    <HeaderText>
                        <span>자만추에서는</span>
                        <strong>한번의 클릭으로, 다양한 요리를!</strong>
                    </HeaderText>
                </OnboardHeader>

                <OnboardSlider>
                    {RecomendItemsArray.map((item, idx) => (
                        <OnboardFigure key={idx}>
                            <img src={item.imgUrl} />
                            <OnboardFigcaption>{item.content}</OnboardFigcaption>
                        </OnboardFigure>
                    ))}
                </OnboardSlider>
                <ButtonWrapper>
                    <Button onClick={() => navigate('/login')}>Join</Button>
                    <Button onClick={() => navigate('/guesthome')}>둘러보기</Button>
                </ButtonWrapper>
            </OnboardContainer>
        </Layout>
    );
}

const OnboardContainer = styled.section``;
const OnboardHeader = styled.header`
    width: 60%;
    margin-right: auto;
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    img {
        display: block;
        width: 150px;
    }
`;
const HeaderText = styled.div`
    display: flex;
    flex-direction: column;
`;

//슬라이더 섹션
const OnboardSlider = styled.section`
    margin-top: 20px;
    display: flex;
    justify-content: center;
    gap: 20px;
`;
const OnboardFigure = styled.figure`
    border: 1px solid black;
    border-radius: 10px;
    width: 350px;
    padding: 20px;
    flex-shrink: 0;

    img {
        width: 100%;
        height: auto;
    }
`;
const OnboardFigcaption = styled.figcaption`
    font-size: 16px;
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    width: 100%;
    margin-top: 100px;
`;
const Button = styled.button`
    width: 150px;
    height: 50px;
    color: white;
    background-color: black;
    border: none;
    border-radius: 10px;
    cursor: pointer;
`;
