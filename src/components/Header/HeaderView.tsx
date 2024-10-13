import { Outlet } from 'react-router-dom';
import useHeaderLogic from '../../hooks/useHeaderLogic';
import HeaderContainer from './HeaderContainer';
import PageHero from '../Hero/PageHero';

export default function HeaderView(): JSX.Element {
    const { handleClickMenu, isActive, menuItems } = useHeaderLogic();
    return (
        <>
            <HeaderContainer isActive={isActive} menuItems={menuItems} handleClickMenu={handleClickMenu} />
            <PageHero title={isActive} />
            <Outlet />
        </>
    );
}
