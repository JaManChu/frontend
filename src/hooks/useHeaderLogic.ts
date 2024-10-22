import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store/store';

// 리팩토링 - 클릭 메뉴 이름 props로 전달받아 menuItems와 비교
export default function useHeaderLogic() {
    const [isActive, setIsActive] = useState<string>('');
    const isLogin = useSelector((state: RootState) => state.user.value.isLoggedIn);
    const location = useLocation();

    useEffect(() => {
        const currentMenu = menuItems.find((menu) => location.pathname == menu.to);
        if (currentMenu) {
            setIsActive(currentMenu.name);
        } else {
            setIsActive('');
        }
    }, [location.pathname]);

    const handleClickMenu = (menu: string): void => {
        setIsActive(menu);
    };
    console.log(isActive);

    const menuItems = [
        { name: 'Home', to: '/' },
        { name: 'All', to: '/recipes/all' },
        { name: 'Popular', to: '/recipes/popular' },
        { name: 'Search', to: '/recipes/search' },
        ...(isLogin ? [{ name: 'Recommended', to: '/recipes/recommended' }] : []),
    ];

    return { handleClickMenu, isActive, menuItems };
}
