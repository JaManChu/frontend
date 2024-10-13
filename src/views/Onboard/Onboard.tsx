import { useNavigate } from 'react-router-dom';
import { Layout } from '../../styles/layout';
import logo from '../../assets/img/logo.png';
import { Box, Button, Typography, Container, Card, CardMedia, CardContent } from '@mui/material';
import { styled } from '@mui/system';

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
            <StyledContainer maxWidth="md">
                <HeaderBox>
                    <img src={logo} alt="Logo" style={{ width: '120px', marginRight: '16px' }} />
                    <Box>
                        <Typography variant="h6" component="span" display="block">
                            자만추에서는
                        </Typography>
                        <Typography variant="h4" fontWeight="bold">
                            한번의 클릭으로, 다양한 요리를!
                        </Typography>
                    </Box>
                </HeaderBox>

                <CardBox>
                    {RecomendItemsArray.map((item, idx) => (
                        <StyledCard key={idx}>
                            <CardMedia component="img" image={item.imgUrl} alt="Recommendation Image" sx={{ height: 200 }} />
                            <CardContent>
                                <Typography variant="body1" align="center">
                                    {item.content}
                                </Typography>
                            </CardContent>
                        </StyledCard>
                    ))}
                </CardBox>

                <ButtonBox>
                    <JoinButton variant="contained" onClick={() => navigate('/login')}>
                        Join
                    </JoinButton>
                    <BrowseButton variant="outlined" onClick={() => navigate('/guesthome')}>
                        둘러보기
                    </BrowseButton>
                </ButtonBox>
            </StyledContainer>
        </Layout>
    );
}

const StyledContainer = styled(Container)({
    marginTop: '64px',
});

const HeaderBox = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '32px',
});

const CardBox = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    gap: '16px',
    flexWrap: 'wrap',
});

const StyledCard = styled(Card)({
    width: '300px',
    borderRadius: '16px',
    boxShadow: '3px 3px 10px rgba(0, 0, 0, 0.2)',
});

const ButtonBox = styled(Box)({
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '40px',
});

const JoinButton = styled(Button)({
    backgroundColor: '#b2dfdb',
    color: 'black',
    fontWeight: 'bold',
    width: '150px',
    height: '50px',
    '&:hover': {
        backgroundColor: '#80cbc4',
    },
});

const BrowseButton = styled(Button)({
    borderColor: '#b2dfdb',
    color: '#70d1c9',
    fontWeight: 'bold',
    width: '150px',
    height: '50px',
    '&:hover': {
        borderColor: '#80cbc4',
        color: '#4db6ac',
    },
});
