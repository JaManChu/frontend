// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import styled from 'styled-components';

// interface ImgProps {
//     download_url: string;
//     content: string;
// }

// interface CarouselProps {
//     images: ImgProps[];
// }

// export default function Carousel({ images }: CarouselProps) {
//     const settings = {
//         dots: false,
//         infinite: true,
//         speed: 500,
//         slidesToShow: 3,
//         slidesToScroll: 1,
//     };
//     return (
//         <S_CustomSlider {...settings}>
//             {images.map((image) => (
//                 <li>
//                     <figure>
//                         <img src={image.download_url} />
//                         <figcaption>{image.content}</figcaption>
//                     </figure>
//                 </li>
//             ))}
//         </S_CustomSlider>
//     );
// }

// const S_CustomSlider = styled(Slider)`
//     width: 100%;

//     background-color: #d8dced;
//     .slick-slide {
//         padding: 10px;
//         text-align: center;
//         width: 100%;
//     }

//     .slick-prev,
//     .slick-next {
//         z-index: 1;
//         width: 35px;
//         height: 35px;
//     }

//     .slick-prev:before,
//     .slick-next:before {
//         color: #3f51b5;
//     }

//     .slick-dots li button:before {
//         color: #3f51b5; /* 슬라이더 하단 점 색상 */
//     }

//     .slick-dots li.slick-active button:before {
//         color: #ff5722; /* 활성화된 슬라이더 점 색상 */
//     }

//     img {
//         width: 100%;
//         height: auto;
//         object-fit: cover;
//     }
// `;

import styled from 'styled-components';
import React from 'react';

export default function Carousel({ images }) {
    return (
        <ProductCarounsel>
            <PrevBtn>-</PrevBtn>
            <NextBtn>+</NextBtn>

            <ProductContainer>
                {images.map((image) => (
                    <MyCard>
                        <img src={image.download_url} />
                    </MyCard>
                ))}
            </ProductContainer>
        </ProductCarounsel>
    );
}

const ProductCarounsel = styled.div`
    position: relative;
    overflow: hidden;
    padding: 26px;
`;
const ProductContainer = styled.div`
    padding: 0 10px;
    display: flex;
    scroll-behavior: smooth;
    overflow: hidden;
`;
const NextBtn = styled.button`
    border: none;
    width: 60px;
    height: 100%;
    position: absolute;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    left: 0;
`;
const PrevBtn = styled.button`
    border: none;
    width: 60px;
    height: 100%;
    position: absolute;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    right: 0;
`;

const MyCard = styled.div`
    min-width: 300px;
    height: 400px;
    background-color: black;
    margin: 10px;
    color: white;
`;
