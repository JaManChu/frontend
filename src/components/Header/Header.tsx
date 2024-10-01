import { useEffect, useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import styled from 'styled-components';
import { FiLogOut, FiUser } from 'react-icons/fi';

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
    flex-grow: 2;
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

export default function Header() {
    const [isActive, setIsActive] = useState<string>();
    useEffect(() => {
        const getMenu = localStorage.getItem('menu') || 'Home';
        setIsActive(getMenu);
    }, []);

    const menuItems = [
        { name: 'Home', to: '/main' },
        { name: 'Recommend', to: '/recipes/recommended' },
        { name: 'Popular', to: '/recipes/popular' },
        { name: 'Latest', to: '/recipes/latest' },
    ];
    const handleClickMenu = (menu: string): void => {
        setIsActive(menu);
        localStorage.setItem('menu', menu);
    };

    return (
        <>
            <HeaderSection>
                <Logo src="" alt="LOGO" />
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
                    <StyledLink to="/">
                        <FiLogOut />
                    </StyledLink>
                    <StyledLink to="/mypage">
                        <FiUser />
                    </StyledLink>
                </UserAction>
            </HeaderSection>
            <Outlet />
        </>
    );
}
