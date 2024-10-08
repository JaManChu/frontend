import useHeaderLogic from '../../hooks/useHeader';
import HeaderContainer from './HeaderContainer';

export default function HeaderView(): JSX.Element {
    const { handleClickMenu, isActive, menuItems } = useHeaderLogic();
    return <HeaderContainer isActive={isActive} menuItems={menuItems} handleClickMenu={handleClickMenu} />;
}
