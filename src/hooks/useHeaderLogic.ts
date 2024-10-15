import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store/store';

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

    const menuItems = isLogin
        ? [
              { name: 'Home', to: '/home' },
              { name: 'All', to: '/recipes/all' },
              { name: 'Popular', to: '/recipes/popular' },
              { name: 'Recommended', to: '/recipes/recommended' },
              { name: 'Search', to: '/recipes/search' },
          ]
        : [
              { name: 'Onboard', to: '/' },
              { name: 'GuestHome', to: '/guestHome' },
              { name: 'All', to: '/recipes/all' },
              { name: 'Popular', to: '/recipes/popular' },
              { name: 'Search', to: '/recipes/search' },
          ];

    return { handleClickMenu, isActive, menuItems };
}
