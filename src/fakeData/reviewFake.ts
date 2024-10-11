interface Props {
    content: string;
    rating: number;
    commentId: number;
    nickname: string;
    createdAt: string;
    updatedAt: string;
}
const reviewFake: Props[] = [
    { content: 'fist comment...................', rating: 5, commentId: 1, nickname: 'dd', createdAt: '2024-09-26', updatedAt: '2024-09-27' },
    { content: 'second comment...................', rating: 3, commentId: 2, nickname: 'ss', createdAt: '2024-09-26', updatedAt: '2024-09-27' },
    { content: 'third comment...................', rating: 1, commentId: 3, nickname: 'ww', createdAt: '2024-09-26', updatedAt: '2024-09-27' },
    { content: 'fourth comment...................', rating: 4, commentId: 4, nickname: 'jj', createdAt: '2024-09-26', updatedAt: '2024-09-27' },
];

export default reviewFake;
