import { Outlet, useLocation } from 'react-router-dom';
import useHeaderLogic from '../../hooks/useHeaderLogic';
import HeaderContainer from './HeaderContainer';
import PageHero from '../Hero/PageHero';

export default function HeaderView(): JSX.Element {
    const { pathname } = useLocation();
    const { handleClickMenu, isActive, menuItems } = useHeaderLogic();
    return (
        <>
            <HeaderContainer isActive={isActive} menuItems={menuItems} handleClickMenu={handleClickMenu} />
            {pathname != '/' ? <PageHero title={isActive} /> : ''}
            <Outlet />
        </>
    );
}
