import styled from 'styled-components';
import { CiSearch } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';
import MainLogo from '../../assets/img/spoon.jpg';
import { useSearchInput } from '../../hooks/useSearchInput';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Chart.js 등록
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function GuestHome(): JSX.Element {
    const { searched, changeInputHandler, handleActiveEnter, handleSubmit } = useSearchInput();
    // !추후 api통신을통해 받은 값으로 대체
    const LatestInfo = {
        img: 'https://thumb.ac-illust.com/73/7387030e5a5600726e5309496353969a_t.jpeg',
        title: 'Recipe Title',
        time: '60min',
        level: 'easy',
        content:
            '배추김치는 사방 1cm 크기로 자르고, 양파는 굵게 다져주세요. 실파는 송송 썰고, 베이컨은 한입 크기로 잘라주세요. 볼에 양념 재료를 넣어 섞어주세요.',
    };
    // !추후 api통신을통해 받은 값으로 대체
    const VisitedInfo = {
        total: 5015,
        Yesterday: 500,
        Today: 15,
    };

    // 그래프 데이터 설정
    const data = {
        labels: ['Total', 'Yesterday', 'Today'], // x축 라벨
        datasets: [
            {
                label: '방문자 수',
                data: [VisitedInfo.total, VisitedInfo.Yesterday, VisitedInfo.Today], // 각 항목에 대응하는 데이터
                backgroundColor: 'brown', // 바 색상
                borderColor: 'brown',
                borderWidth: 1,
            },
        ],
    };

    // 옵션 설정 (선택 사항)
    const options = {
        responsive: true, //반응형설정
    };

    const navigate = useNavigate();

    return (
        <GuestContainer>
            <GusetImage src={MainLogo} alt="메인페이지 이미지" />
            <SearchArea>
                <SearchBox
                    type="text"
                    value={searched}
                    onChange={(e) => changeInputHandler(e)}
                    onKeyDown={(e) => handleActiveEnter(e)}
                    placeholder="재료를 입력해주세요."
                />
                <SearchIcon onClick={handleSubmit} />
            </SearchArea>
            <RecommendArea>
                <S_Title>Recommend for You</S_Title>
                <RecommendSection>
                    <Notice>회원이 되시면 레시피를 추천 받으실 수 있습니다.</Notice>
                </RecommendSection>
                <Button onClick={() => navigate('/recipes/recommended')}>view more</Button>
            </RecommendArea>
            <LatestArea>
                <LatestImgSection>
                    <img src={LatestInfo.img}></img>
                </LatestImgSection>
                <LatestContent>
                    <S_Title>Latest Recipe</S_Title>
                    <h1>{LatestInfo.title}</h1>
                    <RecipeStatus>
                        <span>{LatestInfo.time}</span>
                        <span>{LatestInfo.level}</span>
                    </RecipeStatus>
                    <RecipeSteps>{LatestInfo.content}</RecipeSteps>
                    <Button onClick={() => navigate('/recipes/latest')}>view more latest recipes</Button>
                </LatestContent>
            </LatestArea>
            <PopularArea>
                <PopularRecipesArea>
                    <S_Title>Popular Recipes</S_Title>
                    <PopularRecipesImgArea>
                        <img src="https://thumb.ac-illust.com/73/7387030e5a5600726e5309496353969a_t.jpeg"></img>
                        <img src="https://thumb.ac-illust.com/73/7387030e5a5600726e5309496353969a_t.jpeg"></img>
                    </PopularRecipesImgArea>
                    <Button onClick={() => navigate('/recipes/popular')}>view more popular recipes</Button>
                </PopularRecipesArea>
                <VisitedArea>
                    <S_Title>Visited</S_Title>
                    <VisitedInfoArea>
                        <VisitedInfoArea>
                            {/* Bar 차트 추가 */}
                            <Bar data={data} options={options} />
                        </VisitedInfoArea>
                    </VisitedInfoArea>
                </VisitedArea>
            </PopularArea>
        </GuestContainer>
    );
}

const GuestContainer = styled.section`
    background-color: #f5f4f3;
    height: 100%;
    width: 100%;
    overflow-x: hidden;
`;
const GusetImage = styled.img`
    display: block;
    width: 100%;
    height: 250px;
    object-fit: cover;
`;
const SearchArea = styled.div`
    width: 50%;
    margin: 16px auto;
    position: relative;
`;
const SearchBox = styled.input`
    display: block;
    width: 90%;
    height: 40px;
    padding-left: 16px;
    border: transparent;
    border-radius: 16px;
    color: black;
    background-color: rgba(239, 182, 63, 0.2);
`;
const SearchIcon = styled(CiSearch)`
    position: absolute;
    right: 15%;
    top: 50%;
    transform: translateY(-50%);
    font-size: 20px;
    cursor: pointer;
`;

const S_Title = styled.p`
    color: brown;
    font-size: 2rem;
    margin-top: 50px;
    text-align: center;
`;

const Button = styled.button`
    cursor: pointer;
    margin-top: 30px;
    border: none;
    background-color: transparent;
`;

const RecommendArea = styled.div`
    width: 100vw;
    height: 500px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const RecommendSection = styled.div`
    width: 60%;
    height: 300px;
    background-color: white;
    border: 1px solid gray;
    border-radius: 10px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
`;

const Notice = styled.h1`
    font-size: 3rem;
    font-weight: bold;
`;

const LatestArea = styled.div`
    width: 100vw;
    height: 400px;
    background-color: lightgray;
    display: flex;
`;

const LatestImgSection = styled.div`
    width: 50%;
    img {
        width: 100%;
        height: 100%;
    }
`;

const LatestContent = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;

    h1 {
        margin-top: 30px;
    }
`;

const RecipeStatus = styled.div`
    display: flex;
    width: 100px;
    justify-content: space-between;
`;

const RecipeSteps = styled.div`
    width: 300px;
    margin-top: 20px;
`;

const PopularArea = styled.div`
    width: 100%;
    height: 500px;
    display: flex;
    justify-content: center;
    gap: 40px;
`;

const PopularRecipesArea = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 50px;
    flex-grow: 1;
`;

const PopularRecipesImgArea = styled.div`
    display: flex;
    margin-top: 20px;
    img {
        margin-left: 30px;
    }
`;

const VisitedArea = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    flex-grow: 1;
`;

const VisitedInfoArea = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    height: 400px;
`;
