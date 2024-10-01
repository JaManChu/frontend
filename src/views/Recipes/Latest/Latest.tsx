import { useEffect, useState } from 'react';
import RecipeList from '../Recipe/RecipeList';
import RecipePageHeader from '../Recipe/RecipePageHeader';
import axios from 'axios';

interface RecipeLimitProps {
    limit?: number;
    isMain?: boolean;
}

export default function Latest({ limit, isMain }: RecipeLimitProps) {
    console.log('latest, ', isMain);
    const [recipes, setRecipes] = useState<string[]>([]);
    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await axios.get('/recipes');
            } catch (err) {}
        };
    }, [recipes]);
    const fakeData = [
        {
            title: 'first',
            id: '1',
            image: '',
            time: '60min',
            level: '상',
            rate: '4.5',
            desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur quasi veritatis voluptatem voluptatibus provident modi rerum temporibus labore mollitia omnis sint, dicta blanditiis culpa, pariatur voluptatum unde? Tempore, incidunt eius!',
        },
        {
            title: 'second',
            id: '2',
            image: '',
            time: '45min',
            level: '상',
            rate: '1.5',
            desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur quasi veritatis voluptatem voluptatibus provident modi rerum temporibus labore mollitia omnis sint, dicta blanditiis culpa, pariatur voluptatum unde? Tempore, incidunt eius!',
        },
        {
            title: 'third',
            id: '3',
            image: '',
            time: '20min',
            level: '상',
            rate: '1.5',
            desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur quasi veritatis voluptatem voluptatibus provident modi rerum temporibus labore mollitia omnis sint, dicta blanditiis culpa, pariatur voluptatum unde? Tempore, incidunt eius!',
        },
        {
            title: 'fourth',
            id: '4',
            image: '',
            time: '10min',
            level: '상',
            rate: '3.5',
            desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur quasi veritatis voluptatem voluptatibus provident modi rerum temporibus labore mollitia omnis sint, dicta blanditiis culpa, pariatur voluptatum unde? Tempore, incidunt eius!',
        },
        {
            title: 'fifth',
            id: '5',
            image: '',
            time: '6min',
            level: '상',
            rate: '5.0',
            desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur quasi veritatis voluptatem voluptatibus provident modi rerum temporibus labore mollitia omnis sint, dicta blanditiis culpa, pariatur voluptatum unde? Tempore, incidunt eius!',
        },
    ];

    return (
        <>
            {!isMain && <RecipePageHeader title="Latest" />}
            <RecipeList recipes={fakeData} limit={limit} isMain={isMain} />
        </>
    );
}
