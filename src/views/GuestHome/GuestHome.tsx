import { CiSearch } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';
import MainLogo from '../../assets/img/spoon.jpg';
import { useSearchInput } from '../../hooks/useSearchInput';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Box, Container, TextField, Typography, Button, Card, CardMedia, Grid } from '@mui/material';

// Chart.js 등록
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function GuestHome(): JSX.Element {
    const { searched, changeInputHandler, handleActiveEnter, handleSubmit } = useSearchInput();

    // 임시 데이터 (API 통신을 통해 받아온 값으로 대체)
    const LatestInfo = {
        img: 'https://thumb.ac-illust.com/73/7387030e5a5600726e5309496353969a_t.jpeg',
        title: 'Recipe Title',
        time: '60min',
        level: 'easy',
        content:
            '배추김치는 사방 1cm 크기로 자르고, 양파는 굵게 다져주세요. 실파는 송송 썰고, 베이컨은 한입 크기로 잘라주세요. 볼에 양념 재료를 넣어 섞어주세요.',
    };

    const VisitedInfo = {
        total: 5015,
        Yesterday: 500,
        Today: 15,
    };

    const data = {
        labels: ['Total', 'Yesterday', 'Today'], // x축 라벨
        datasets: [
            {
                label: '방문자 수',
                data: [VisitedInfo.total, VisitedInfo.Yesterday, VisitedInfo.Today], // 각 항목에 대응하는 데이터
                backgroundColor: ['#b2dfdb', '#80cbc4', '#4db6ac'], // 바 색상
                borderColor: '#004d40', // 테두리 색상
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true, //반응형설정
    };

    const navigate = useNavigate();

    return (
        <Container maxWidth="lg" sx={{ mt: 8 }}>
            <Box component="img" src={MainLogo} alt="메인페이지 이미지" sx={{ width: '100%', height: '250px', objectFit: 'cover' }} />

            {/* Search Area */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, position: 'relative' }}>
                <TextField
                    fullWidth
                    value={searched}
                    onChange={changeInputHandler}
                    onKeyDown={handleActiveEnter}
                    placeholder="재료를 입력해주세요."
                    variant="outlined"
                    sx={{ width: '60%', backgroundColor: 'rgba(239, 182, 63, 0.2)', borderRadius: '16px' }}
                />
                <CiSearch
                    onClick={handleSubmit}
                    style={{ position: 'absolute', right: '20%', top: '50%', transform: 'translateY(-50%)', fontSize: '24px', cursor: 'pointer' }}
                />
            </Box>

            {/* Recommend Area */}
            <Box sx={{ textAlign: 'center', mt: 6 }}>
                <Typography variant="h4" color="primary" fontWeight="bold">
                    Recommend for You
                </Typography>
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
                    <Card sx={{ width: '60%', height: '300px', boxShadow: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography variant="h5" fontWeight="bold">
                            회원이 되시면 레시피를 추천 받으실 수 있습니다.
                        </Typography>
                    </Card>
                </Box>
                <Button
                    variant="contained"
                    onClick={() => navigate('/recipes/recommended')}
                    sx={{ mt: 4, backgroundColor: '#b2dfdb', color: 'black', fontWeight: 'bold', ':hover': { backgroundColor: '#80cbc4' } }}
                >
                    View More
                </Button>
            </Box>

            {/* Latest Recipe */}
            <Box sx={{ mt: 8, display: 'flex', backgroundColor: 'lightgray', p: 4, borderRadius: 2 }}>
                <Box sx={{ width: '50%', display: 'flex', justifyContent: 'center' }}>
                    <CardMedia
                        component="img"
                        image={LatestInfo.img}
                        alt="Latest Recipe"
                        sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                </Box>
                <Box sx={{ width: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Typography variant="h4" fontWeight="bold" mb={2}>
                        Latest Recipe
                    </Typography>
                    <Typography variant="h5" mb={1}>
                        {LatestInfo.title}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                        <Typography>{LatestInfo.time}</Typography>
                        <Typography>{LatestInfo.level}</Typography>
                    </Box>
                    <Typography variant="body1" mb={3}>
                        {LatestInfo.content}
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={() => navigate('/recipes/latest')}
                        sx={{ backgroundColor: '#b2dfdb', color: 'black', fontWeight: 'bold', ':hover': { backgroundColor: '#80cbc4' } }}
                    >
                        View More Latest Recipes
                    </Button>
                </Box>
            </Box>

            {/* Popular Recipes & Visited Info */}
            <Grid container spacing={4} sx={{ mt: 8 }}>
                {/* Popular Recipes */}
                <Grid item xs={12} md={6}>
                    <Typography variant="h4" color="primary" fontWeight="bold" textAlign="center">
                        Popular Recipes
                    </Typography>
                    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
                        <Card sx={{ width: '100%', display: 'flex', justifyContent: 'space-around', p: 2 }}>
                            <CardMedia
                                component="img"
                                image="https://thumb.ac-illust.com/73/7387030e5a5600726e5309496353969a_t.jpeg"
                                sx={{ width: '45%', objectFit: 'cover' }}
                            />
                            <CardMedia
                                component="img"
                                image="https://thumb.ac-illust.com/73/7387030e5a5600726e5309496353969a_t.jpeg"
                                sx={{ width: '45%', objectFit: 'cover' }}
                            />
                        </Card>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button
                            variant="contained"
                            onClick={() => navigate('/recipes/popular')}
                            sx={{ mt: 3, backgroundColor: '#b2dfdb', color: 'black', fontWeight: 'bold', ':hover': { backgroundColor: '#80cbc4' } }}
                        >
                            View More Popular Recipes
                        </Button>
                    </Box>
                </Grid>

                {/* Visited Info */}
                <Grid item xs={12} md={6}>
                    <Typography variant="h4" color="primary" fontWeight="bold" textAlign="center">
                        Visited
                    </Typography>
                    <Box sx={{ mt: 3 }}>
                        <Bar data={data} options={options} />
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
}
