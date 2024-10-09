import { useState, MouseEvent } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { FiLogOut, FiUser, FiBell } from 'react-icons/fi';
import Alarm from '../Alarm/Alarm';
import logo from '../../assets/img/logo.png';
import styled from 'styled-components';

interface HeaderProps {
    menuItems: Record<string, string>[];
    isActive: string;
    handleClickMenu: (menu: string) => void;
}

export default function HeaderContainer({ menuItems, handleClickMenu, isActive }: HeaderProps): JSX.Element {
    const [showAlarm, setShowAlarm] = useState<boolean>(false);
    const isLogin = Boolean(localStorage.getItem('token'));

    const handleShowAlarm = (e: MouseEvent) => {
        e.stopPropagation();
        setShowAlarm(!showAlarm);
    };

    return (
        <>
            <HeaderSection onClick={() => setShowAlarm(false)}>
                <Logo src={logo} alt="LOGO" />
                <MenuList>
                    {menuItems.map((item, idx) => {
                        return (
                            <MenuItem key={item.name + idx} active={isActive === item.name} onClick={() => handleClickMenu(item.name)}>
                                <StyledLink to={`${item.to}`}>{item.name}</StyledLink>
                            </MenuItem>
                        );
                    })}
                </MenuList>
                <UserAction>
                    {isLogin ? (
                        <>
                            <StyledLink to="/">
                                <FiLogOut />
                            </StyledLink>
                            <StyledLink to="/mypage">
                                <FiUser />
                            </StyledLink>
                            <FiBell onClick={handleShowAlarm} />
                        </>
                    ) : (
                        <>
                            <HeaderButton>
                                <Link to="/login">로그인</Link>
                            </HeaderButton>
                            <HeaderButton>
                                <Link to="signup">회원가입</Link>
                            </HeaderButton>
                            <FiBell onClick={handleShowAlarm} />
                            {showAlarm && <Alarm />}
                        </>
                    )}
                </UserAction>
            </HeaderSection>
            <Outlet />
        </>
    );
}

const HeaderSection = styled.section`
    height: 70px;
    padding: 16px;
    font-size: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
const Logo = styled.img`
    margin-top: 5px;
    width: 150px;
`;
const MenuList = styled.ul`
    padding: 0;
    margin: 0;
    list-style: none;
    justify-content: flex-end;
    display: flex;
    flex-grow: 1;
`;
const MenuItem = styled.li<{ active: boolean }>`
    margin: 10px;
    cursor: pointer;
    &:hover {
        border-bottom: 3px solid #efb63f;
    }
    border-bottom: ${(props) => (props.active ? '3px solid #efb63f' : 'none')};
`;
const StyledLink = styled(Link)`
    text-decoration: none;
    margin: 10px;
    color: inherit;
`;
const UserAction = styled.div`
    flex-grow: 1;
    display: flex;
    justify-content: flex-end;
    cursor: pointer;
`;
const HeaderButton = styled.div`
    margin-left: 16px;
    font-size: 16px;
    outline: none;
    background-color: transparent;
    a {
        color: #000;
        text-decoration: none;
    }
`;
