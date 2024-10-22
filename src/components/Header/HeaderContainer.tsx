import { useState, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store/store';
import { FiLogOut, FiUser, FiBell } from 'react-icons/fi';
import { logoutSuccess } from '../../redux/reducer/userSlice';
import Alarm from '../Alarm/Alarm';
import styled from 'styled-components';
import logo from '../../assets/img/logo.png';
import colors from '../../styles/colors';

interface HeaderProps {
    menuItems: Record<string, string>[];
    isActive: string;
    handleClickMenu: (menu: string) => void;
}

export default function HeaderContainer({ menuItems, handleClickMenu, isActive }: HeaderProps): JSX.Element {
    const [showAlarm, setShowAlarm] = useState<boolean>(false);
    const isLogin = useSelector((state: RootState) => state.user.value.isLoggedIn);
    const dispatch = useDispatch();

    const handleShowAlarm = (e: MouseEvent) => {
        e.stopPropagation();
        setShowAlarm(!showAlarm);
    };

    const logout = () => {
        dispatch(logoutSuccess());
    };

    return (
        <>
            <S_HeaderSection onClick={() => setShowAlarm(false)}>
                <Link to="/">
                    <S_Logo src={logo} alt="LOGO" />
                </Link>
                <S_MenuList>
                    {menuItems.map((item, idx) => {
                        return (
                            <S_MenuItem key={item.name + idx} active={isActive === item.name}>
                                <S_StyledLink to={item.to} onClick={() => handleClickMenu(item.name)}>
                                    {item.name}
                                </S_StyledLink>
                            </S_MenuItem>
                        );
                    })}
                </S_MenuList>
                <S_UserAction>
                    {isLogin ? (
                        <S_LoginUserList>
                            <S_StyledLink to="/">
                                <FiLogOut onClick={logout} />
                            </S_StyledLink>
                            <S_StyledLink to="/mypage">
                                <FiUser />
                            </S_StyledLink>
                            <S_BellIcon>
                                <FiBell onClick={handleShowAlarm} />
                            </S_BellIcon>
                            {showAlarm && <Alarm />}
                        </S_LoginUserList>
                    ) : (
                        <>
                            <S_HeaderButton>
                                <Link to="/login">로그인</Link>
                            </S_HeaderButton>
                            <S_HeaderButton>
                                <Link to="signup">회원가입</Link>
                            </S_HeaderButton>
                        </>
                    )}
                </S_UserAction>
            </S_HeaderSection>
        </>
    );
}

const S_HeaderSection = styled.section`
    margin: 0 auto;
    padding: 16px;
    width: 90vw;
    height: 100px;
    font-size: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
const S_Logo = styled.img`
    margin-top: 5px;
    width: 150px;
`;
const S_MenuList = styled.ul`
    padding: 0;
    margin: 0;
    list-style: none;
    justify-content: flex-end;
    display: flex;
    flex-grow: 1;
`;
const S_MenuItem = styled.li<{ active: boolean }>`
    margin: 10px;
    cursor: pointer;
    &:hover {
        border-bottom: 3px solid ${colors[300]};
    }
    border-bottom: ${(props) => (props.active ? `3px solid ${colors[300]}` : 'none')};
`;
const S_StyledLink = styled(Link)`
    text-decoration: none;
    margin: 10px;
    color: inherit;
`;
const S_BellIcon = styled.div`
    margin: 10px;
    cursor: pointer;
`;
const S_UserAction = styled.div`
    flex-grow: 1;
    display: flex;
    justify-content: flex-end;
    cursor: pointer;
`;
const S_LoginUserList = styled.div`
    display: flex;
    align-items: center;
`;
const S_HeaderButton = styled.div`
    margin-left: 16px;
    font-size: 16px;
    outline: none;
    background-color: transparent;
    a {
        color: #000;
        text-decoration: none;
    }
`;
