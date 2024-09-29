import React from 'react';
import styled from 'styled-components';
import { Layout } from '../../styles/layout';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 800px;
    height: 600px;
    border: 2px solid black;
    border-radius: 10px;
`;

const Title = styled.h1`
    font-size: 2rem;
`;

const Input = styled.input`
    width: 300px;
    height: 40px;
    margin-top: 30px;
    margin-left: 60px;
    border-radius: 10px;
    font-size: 1.5rem;
`;

const CombineWrapper = styled.section`
    display: flex;
`;

const LeftWrapper = styled.section`
    display: flex;
    flex-direction: column;
`;

const RightWrapper = styled.section`
    display: flex;
    flex-direction: column;
`;

const Button = styled.button`
    border: none;
    border-radius: 10px;
    color: white;
    background-color: #f59910;
    width: 120px;
    height: 40px;
    font-size: 1rem;
    margin-top: 30px;
    margin-left: 60px;
`;
const Signup: React.FC = () => {
    return (
        <Layout>
            <Wrapper>
                <Title>회원가입</Title>
                <CombineWrapper>
                    <LeftWrapper>
                        <Input placeholder="이메일을 입력하세요"></Input>
                        <Input placeholder="비밀번호"></Input>
                        <Input placeholder="비밀번호 확인"></Input>
                        <Input placeholder="닉네임"></Input>
                    </LeftWrapper>
                    <RightWrapper>
                        <Button>중복확인</Button>
                    </RightWrapper>
                </CombineWrapper>
                <Button>회원가입</Button>
            </Wrapper>
        </Layout>
    );
};

export default Signup;
