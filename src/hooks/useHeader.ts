import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function useHeaderLogic() {
    const [isActive, setIsActive] = useState<string>('');
    const isLogin = Boolean(localStorage.getItem('token'));
    const location = useLocation();

    useEffect(() => {
        if (location.pathname == '/login' || location.pathname == '/signup') {
            setIsActive('');
        } else {
            const getMenu = localStorage.getItem('menu') || 'Home';
            setIsActive(getMenu);
        }
    }, [location.pathname]);

    const handleClickMenu = (menu: string): void => {
        setIsActive(menu);
        localStorage.setItem('menu', menu);
    };

    const menuItems = isLogin
        ? [
              { name: 'Home', to: '/main' },
              { name: 'Recommend', to: '/recipes/recommended' },
              { name: 'Popular', to: '/recipes/popular' },
              { name: 'Latest', to: '/recipes/latest' },
          ]
        : [
              { name: 'Onboard', to: '/' },
              { name: 'Home', to: '/guestHome' },
              { name: 'Popular', to: '/recipes/popular' },
              { name: 'Latest', to: '/recipes/latest' },
          ];

    return { handleClickMenu, isActive, menuItems };
}
