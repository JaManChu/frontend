import styled from 'styled-components';
import withAuth from '../../../hooks/withAuth';

const RecipeUpdate: React.FC = () => {
    return <RecipeUpdateContainer></RecipeUpdateContainer>;
};

export default withAuth(RecipeUpdate);

const RecipeUpdateContainer = styled.div`
    width: 100%;
`;
