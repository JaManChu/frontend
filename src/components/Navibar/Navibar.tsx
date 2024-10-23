import styled from 'styled-components';
import { HiListBullet, HiOutlinePencilSquare, HiOutlineHeart } from 'react-icons/hi2';
import { Link } from 'react-router-dom';

export default function Navibar() {
    return (
        <S_BarContainer>
            <S_BarHeader>
                <h5>Menus</h5>
            </S_BarHeader>
            <S_BarList>
                <S_BarItem>
                    <HiListBullet />
                    <Link to="/recipes/create">게시글 작성</Link>
                </S_BarItem>
                <S_BarItem>
                    <HiOutlineHeart />
                    <Link to="/mypage">찜목록 보기</Link>
                </S_BarItem>
                <S_BarItem>
                    <HiOutlinePencilSquare />
                    <Link to="/mypage">작성글 보기</Link>
                </S_BarItem>
            </S_BarList>
        </S_BarContainer>
    );
}

const S_BarContainer = styled.div`
    width: 120px;
    position: absolute;
    top: 38px;
    right: -110px;
`;
const S_BarHeader = styled.div`
    margin-bottom: 10px;
    width: 100%;
    font-weight: 600;
    font-size: 18px;
    color: #fff;
    background-color: #1f2532;
    border-radius: 3px;
    h5 {
        padding: 5px 15px;
    }
`;
const S_BarList = styled.ul`
    list-style: none;
`;
const S_BarItem = styled.li`
    padding-top: 8px;
    margin-top: 8px;
    position: relative;
    display: flex;
    align-items: center;

    &:hover {
        color: #0288d1;
    }
    &::after {
        content: '';
        width: 120px;
        position: absolute;
        bottom: 0;
        border-bottom: 0.8px solid #656565;
    }

    a {
        margin-left: 5px;
        text-decoration: none;
        color: #1f2532;
    }
    a:hover {
        color: #0288d1;
    }
`;

// import colors from '../../styles/colors';

// export default function NaviBar() {
//     return (
//         <S_BarContainer>
//             <S_BarWrapper>
//                 <S_BarList>
//                     <S_BarItem>
//                         <HiListBullet />
//                         <Link to="/recipes/create">게시글 작성</Link>
//                     </S_BarItem>
//                     <S_BarItem>
//                         <HiOutlineHeart />
//                         <Link to="/mypage">찜목록 보기</Link>
//                     </S_BarItem>
//                     <S_BarItem>
//                         <HiOutlinePencilSquare />
//                         <Link to="/mypage">작성글 보기</Link>
//                     </S_BarItem>
//                 </S_BarList>
//             </S_BarWrapper>
//         </S_BarContainer>
//     );
// }

// const S_BarContainer = styled.div`
//     position: fixed;
//     top: 200px;
//     right: 250px;
// `;
// const S_BarWrapper = styled.div`
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: space-between;
//     flex-shrink: 0;
//     border-radius: 8px;
//     backdrop-filter: blur(24px);
//     border: 1px solid;
//     border-color: rgba(0, 0, 0, 0.12);
//     background-color: rgba(250, 250, 250, 0.4);
//     box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2);
//     padding: 8px 12px;
// `;

// const S_BarButton = styled.button`
//     margin: 8px;
//     padding: 8px;
//     border: none;
//     border-radius: 8px;
//     color: ${colors[700]};
//     background-color: none;
//     cursor: pointer;

//     &:hover {
//         background-color: #eef2f7;
//     }
// `;
