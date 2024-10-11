interface Props {
    recipeId: number;
    recipeName: string;
    recipeAuthor: string;
    recipeThumbnail: string;
    recipeCookingTime: string;
    recipeLevel: string;
    recipeRating: number;
    desc: string;
    ingredients: Record<string, string | number>[];
    overview: string;
    instructions: Record<number | string, string>[];
}
const fakeData: Props[] = [
    {
        recipeName: 'first',
        recipeId: 1,
        recipeThumbnail: '',
        recipeCookingTime: '60min',
        recipeAuthor: '',
        recipeLevel: '상',
        recipeRating: 4.5,
        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur quasi veritatis voluptatem voluptatibus provident modi rerum temporibus labore mollitia omnis sint, dicta blanditiis culpa, pariatur voluptatum unde? Tempore, incidunt eius!',
        ingredients: [
            { name: 'carrot', count: 1 },
            { name: 'onion', count: 2 },
            { name: 'Tofu', count: 1 },
            { name: 'sugar', count: 5 },
        ],
        overview: 'This Recipe is ...one...overview',
        instructions: [
            { content: '1. 팬에 버터를 녹입니다.', image: '' },
            { content: '2. 계란을 깨뜨려 팬에 넣고 스크램블합니다.', image: '' },
            { content: '3. 소금과 후추로 간을 합니다.', image: '' },
            { content: '4. 잘 익은 후 접시에 담아 식힌다.', image: '' },
            { content: '5. 토스트한 빵 위에 스크램블 에그를 올립니다.', image: '' },
            { content: '6. 아보카도를 슬라이스해 함께 올립니다.', image: '' },
            { content: '7. 파슬리로 장식하여 제공합니다.', image: '' },
            { content: '8. 즉시 서빙합니다!', image: '' },
        ],
    },
    {
        recipeName: 'second',
        recipeId: 2,
        recipeThumbnail: '',
        recipeCookingTime: '45min',
        recipeLevel: '상',
        recipeAuthor: '',
        recipeRating: 1.5,
        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur quasi veritatis voluptatem voluptatibus provident modi rerum temporibus labore mollitia omnis sint, dicta blanditiis culpa, pariatur voluptatum unde? Tempore, incidunt eius!',
        ingredients: [
            { name: 'carrot', count: 1 },
            { name: 'onion', count: 2 },
            { name: 'Tofu', count: 1 },
            { name: 'salt', count: 5 },
        ],
        overview: 'This Recipe is ...two...overview',
        instructions: [
            { content: '1.오븐을 180도로 예열합니다.', image: '' },
            { content: '2. 케이크 반죽을 준비합니다.', image: '' },
            { content: '3. 밀가루, 설탕, 계란, 우유를 섞습니다.', image: '' },
            { content: '4. 다 섞인 반죽을 오븐용 틀에 붓습니다.', image: '' },
            { content: '5. 예열된 오븐에 넣고 30분간 구워줍니다.', image: '' },
            { content: '6. 케이크가 구워지는 동안, 아이싱을 준비합니다.', image: '' },
            { content: '7. 케이크가 식으면 아이싱을 발라줍니다.', image: '' },
            { content: '8. 조각내어 서빙합니다.', image: '' },
        ],
    },
    {
        recipeName: 'third',
        recipeId: 3,

        recipeThumbnail: '',
        recipeCookingTime: '20min',
        recipeLevel: '상',
        recipeAuthor: '',
        recipeRating: 1.5,
        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur quasi veritatis voluptatem voluptatibus provident modi rerum temporibus labore mollitia omnis sint, dicta blanditiis culpa, pariatur voluptatum unde? Tempore, incidunt eius!',
        ingredients: [
            { name: 'carrot', count: 1 },
            { name: 'onion', count: 2 },
            { name: 'Tofu', count: 1 },
            { name: 'salt', count: 5 },
        ],
        overview: 'This Recipe is ...three...overview',
        instructions: [
            { content: '1. 닭고기를 손질하여 소금, 후추로 간을 합니다.', image: '' },
            { content: '2. 팬에 기름을 두르고 닭고기를 굽습니다.', image: '' },
            { content: '3. 닭고기가 익어가면 양파를 추가합니다.', image: '' },
            { content: '4. 양파가 투명해지면, 버섯을 넣고 볶습니다.', image: '' },
            { content: '5. 간장과 맛술을 추가해 간을 맞춥니다.', image: '' },
            { content: '6. 모든 재료가 잘 섞이면, 불을 끕니다.', image: '' },
            { content: '7. 접시에 담고 고수를 뿌립니다.', image: '' },
            { content: '8. 따뜻하게 서빙합니다.', image: '' },
        ],
    },
    {
        recipeName: 'fourth',
        recipeId: 4,

        recipeThumbnail: '',
        recipeCookingTime: '10min',
        recipeLevel: '상',
        recipeRating: 3.5,
        recipeAuthor: '',
        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur quasi veritatis voluptatem voluptatibus provident modi rerum temporibus labore mollitia omnis sint, dicta blanditiis culpa, pariatur voluptatum unde? Tempore, incidunt eius!',
        ingredients: [
            { name: 'carrot', count: 1 },
            { name: 'onion', count: 2 },
            { name: 'Tofu', count: 1 },
            { name: 'salt', count: 5 },
        ],
        overview: 'This Recipe is ...four...overview',
        instructions: [
            { content: '1. 물을 끓이고 쌀을 씻습니다.', image: '' },
            { content: '2. 씻은 쌀을 냄비에 넣고 물을 추가합니다.', image: '' },
            { content: '3. 중불에서 쌀이 익을 때까지 끓입니다.', image: '' },
            { content: '4. 익힌 쌀에 올리브 오일과 소금을 넣습니다.', image: '' },
            { content: '5. 쌀이 다 익으면 불을 끄고 10분간 뜸을 들입니다.', image: '' },
            { content: '6. 야채를 잘게 썰어 볶습니다.', image: '' },
            { content: '7. 볶은 야채를 쌀에 넣고 잘 섞습니다.', image: '' },
            { content: '8. 접시에 담아 서빙합니다.', image: '' },
        ],
    },
    {
        recipeName: 'fifth',
        recipeId: 5,

        recipeThumbnail: '',
        recipeCookingTime: '6min',
        recipeLevel: '상',
        recipeRating: 5.0,
        recipeAuthor: '',
        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur quasi veritatis voluptatem voluptatibus provident modi rerum temporibus labore mollitia omnis sint, dicta blanditiis culpa, pariatur voluptatum unde? Tempore, incidunt eius!',
        ingredients: [
            { name: 'carrot', count: 1 },
            { name: 'onion', count: 2 },
            { name: 'Tofu', count: 1 },
            { name: 'salt', count: 5 },
        ],
        overview: 'This Recipe is ...five...overview',
        instructions: [
            { content: '1. 신선한 재료를 준비합니다.', image: '' },
            { content: '2. 고기를 적절한 크기로 자릅니다.', image: '' },
            { content: '3. 올리브 오일을 팬에 두릅니다.', image: '' },
            { content: '4. 준비한 고기를 팬에 넣고 볶습니다.', image: '' },
            { content: '5. 고기가 반쯤 익으면 야채를 추가합니다.', image: '' },
            { content: '6. 소금, 후추로 간을 합니다.', image: '' },
            { content: '7. 재료가 골고루 섞이도록 잘 저어줍니다.', image: '' },
            { content: '8. 마지막으로 허브를 뿌리고 서빙합니다.', image: '' },
        ],
    },
];

export default fakeData;
