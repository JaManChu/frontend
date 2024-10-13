import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useState, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import RecipeMetaData from './RecipeMetaData';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { FaRegBookmark, FaBookmark } from 'react-icons/fa6';
import colors from '../../styles/colors';
import axios from 'axios';

// ! main 페이지가 아닌 all isMain을 콘솔에 찍으면 false값이 찍힘 -> 최적화 방안 생각(RecipeCard에서는 4번 : main, all, recipeList, recipeCard인듯

interface CardProps {
    page?: string;
    recipeId: number;
    recipeName: string;
    recipeAuthor: string;
    recipeLevel: string;
    recipeCookingTime: string;
    recipeThumbnail: string;
    // rate: string;
    // desc: string;
}

export default function RecipeNewCard({ page = '', recipeId, recipeName, recipeThumbnail, recipeCookingTime, recipeLevel }: CardProps): JSX.Element {
    const [marked, setMarked] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');

    console.log('bookmark card - recipeId ? : ', recipeId);
    const token = sessionStorage.getItem('token');

    const handleClickBookmark = async (e: MouseEvent) => {
        e.stopPropagation();
        try {
            if (marked) {
                setMarked(false);
            } else {
                const response = await axios.post(
                    `${import.meta.env.VITE_BASE_URL}/recipes/${recipeId}/scrap`,
                    {},
                    {
                        headers: {
                            'access-token': `Bearer ${token}`,
                        },
                    },
                );
                console.log('scarp response: ', response);
                if (response.data.code == 'OK') {
                    console.log('post scrap response: ', response);
                    console.log(response.data);
                    setMarked(true);
                    setMessage(response.data.message);
                    alert(response.data.message);
                }
            }
        } catch (err: any) {
            console.log(err);
            console.log('err.response: ', err.response);
            setMessage(marked ? '찜한 레시피에서 삭제하였습니다.' : '레시피를 찜하지 못했습니다.');
        }
    };
    console.log(marked);
    console.log('scrap message: ', message);

    return (
        <Grid size={{ xs: 12, md: 4 }} sx={{ margin: 1 }}>
            <M_SyledCard variant="outlined" tabIndex={0} sx={{ height: '100%' }}>
                <CardMedia
                    component="img"
                    alt="레시피이미지"
                    image={recipeThumbnail}
                    sx={{
                        height: { sm: 'auto', md: '50%' },
                        aspectRatio: { sm: '16 / 9', md: '' },
                    }}
                />
                <M_SyledCardContent>
                    <M_BookmarkIcons onClick={handleClickBookmark} mark={marked}>
                        {marked ? <FaBookmark /> : <FaRegBookmark />}
                    </M_BookmarkIcons>
                    <Typography gutterBottom variant="caption" component="div">
                        여기는...아마 카테고리?
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div">
                        <M_Linked to={`/recipes/${recipeId}`}>{recipeName}</M_Linked>
                    </Typography>
                    <M_StyledTypography variant="body2" color="text.secondary" gutterBottom>
                        Overview 내용들어가면 좋을듯 ? 그 오늘은 뭐 만들겠다는 내용?그리고 나머지
                        가나다라마바사아자차가타파하가갸거겨교고교그긔나냐너녀노뇨뉴ㅜ뉴느늬
                    </M_StyledTypography>
                    <M_StyledInfo>
                        <RecipeMetaData time={recipeCookingTime} level={recipeLevel} rate="평점주세요" />
                    </M_StyledInfo>
                </M_SyledCardContent>
            </M_SyledCard>
        </Grid>
    );
}

const M_SyledCard = styled(Card)({
    display: 'flex',
    flexDirection: 'column',
    padding: 0,
    height: '100%',
    borderRadius: '8px',
    backgroundColor: '#F5F6FA',
    '&:hover': {
        backgroundColor: '#fff',
    },
});

const M_SyledCardContent = styled(CardContent)({
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    padding: 16,
    flexGrow: 1,
    position: 'relative',

    '&:last-child': {
        paddingBottom: 16,
    },
});

const M_StyledTypography = styled(Typography)({
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
});
const M_StyledInfo = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '14px',
});
const M_Linked = styled(Link)({
    textDecorationLine: 'none',
    color: '#000',

    '&:hover': {
        color: colors[400],
        cursor: 'pointer',
    },
});

const M_BookmarkIcons = styled(Box)<{ mark: boolean }>(({ mark }) => ({
    position: 'absolute',
    top: '10px',
    right: '10px',
    color: mark ? colors[400] : 'inherit',
    '&:hover': {
        color: colors[400],
        cursor: 'pointer',
    },
}));
