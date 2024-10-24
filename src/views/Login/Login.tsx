import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userFormHandler } from '../../handler/userFormHandler';
import SocialKakao from './SocialKakao';
import { Container, Box, Typography, TextField, Button, Divider } from '@mui/material';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { showModal } from '../../redux/reducer/modalSlice';
import { RootState } from '../../redux/store/store';
import colors from '../../styles/colors';
import axios from 'axios';
import Modal from '../../components/Modal/Modal';
import { useModal } from '../../hooks/useModal';
// import Modal from '../../components/Modal/Modal';
// import { useModal } from '../../hooks/useModal';

export default function Login(): JSX.Element {
    const navigate = useNavigate();

    const [userId, setUserId] = useState();
    const { openModal, closeModal, isModalVisible, isPasswordModal, handlePasswordModalClose, handlePasswordModalOpen } = useModal();

    const {
        email,
        setEmail,
        password,
        setPassword,
        passwordCheck,
        setPasswordCheck,
        nickname,
        setNickname,
        clickedButEmpty,
        handleEmptyInput,
        clearInputMessage,
        inputMessage,
        handleLogin,
    } = userFormHandler();
    // const { openModal, closeModal, handleConfirm, isModalVisible } = useModal();
    const dispatch = useDispatch();
    const modalContent = useSelector((state: RootState) => state.modal.content);

    const handleFindPassword = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/auth/find-password?email=${email}&nickname=${nickname}`);
            console.log('비밀번호 response : ', response);
            console.log('비밀번호 response.data : ', response.data);
            if (response.data.status === 200) {
                handlePasswordModalOpen();
                setUserId(response.data.userId);
            }
        } catch (err: any) {
            console.log('비밀번호찾기에러:', err);
        }
    };

    const handleUpdatePassword = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/update-password`, { userId, password });
            console.log('비밀번호수정 response:', response);
            console.log('비밀번호 수정response.data:', response);
            if (response.data.code === 200) {
                dispatch(showModal({ isOpen: true, content: response.data.message, onConfirm: null }));
                navigate('/login');
            }
        } catch (err: any) {
            console.log('회원가입 에러:', err);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    boxShadow: 3,
                    padding: 4,
                    borderRadius: 2,
                    mt: 8,
                }}
            >
                <Typography variant="h4" component="h1" gutterBottom>
                    로그인
                </Typography>
                <form method="POST" onSubmit={handleLogin} style={{ width: '100%' }}>
                    <TextField
                        fullWidth
                        label="이메일"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={() => handleEmptyInput('email')}
                        onFocus={() => clearInputMessage('email')}
                        error={!!inputMessage.email && clickedButEmpty.email}
                        helperText={inputMessage.email && clickedButEmpty.email && inputMessage.email}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="비밀번호"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onBlur={() => handleEmptyInput('password')}
                        onFocus={() => clearInputMessage('password')}
                        error={!!inputMessage.password && clickedButEmpty.password}
                        helperText={inputMessage.password && clickedButEmpty.password && inputMessage.password}
                        margin="normal"
                    />

                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        sx={{
                            mt: 3,
                            backgroundColor: `${colors[300]}`,
                            color: 'black',
                            fontWeight: 'bold',
                            ':hover': { backgroundColor: '#80cbc4' },
                        }}
                        onClick={() => dispatch(showModal({ isOpen: true, content: modalContent, onConfirm: null }))}
                    >
                        로그인
                    </Button>
                </form>
                {/* <Link
                    component="button"
                    variant="body2"
                    onClick={() => {
                        openModal();
                    }}
                    sx={{ mt: 2, cursor: 'pointer' }}
                >
                    비밀번호 찾기
                </Link>
                {isModalVisible && (
                    <Modal
                        visible={isModalVisible}
                        onClose={closeModal}
                        buttons={[
                            { label: '찾기', onClick: handleConfirm },
                            { label: '취소', onClick: closeModal },
                        ]}
                    >
                        <Typography variant="h5">비밀번호 찾기</Typography>
                        <TextField
                            fullWidth
                            label="이메일"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onBlur={() => handleEmptyInput('email')}
                            onFocus={() => clearInputMessage('email')}
                            error={!!inputMessage.email && clickedButEmpty.email}
                            helperText={inputMessage.email && clickedButEmpty.email && inputMessage.email}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="닉네임"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                            onBlur={() => handleEmptyInput('nickname')}
                            onFocus={() => clearInputMessage('nickname')}
                            error={!!inputMessage.nickname && clickedButEmpty.nickname}
                            helperText={inputMessage.nickname && clickedButEmpty.nickname && inputMessage.nickname}
                            margin="normal"
                        />
                    </Modal>
                )} */}
                <Divider sx={{ width: '100%', mt: 4 }} />
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <Typography variant="body1">아직 회원이 아니세요?</Typography>
                    <ButtonWrapper>
                        <Button variant="text" sx={{ color: 'grey.500' }} onClick={() => openModal()}>
                            비밀번호찾기
                        </Button>
                        <Button variant="text" color="primary" onClick={() => navigate('/signup')}>
                            회원가입
                        </Button>
                    </ButtonWrapper>
                </Box>
                {isModalVisible && (
                    <Modal visible={isModalVisible} onClose={closeModal}>
                        <TextField
                            fullWidth
                            label="이메일"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onBlur={() => handleEmptyInput('email')}
                            onFocus={() => clearInputMessage('email')}
                            error={!!inputMessage.email && clickedButEmpty.email}
                            helperText={inputMessage.email && clickedButEmpty.email && inputMessage.email}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="닉네임"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                            onBlur={() => handleEmptyInput('nickname')}
                            onFocus={() => clearInputMessage('nickname')}
                            error={!!inputMessage.nickname && clickedButEmpty.nickname}
                            helperText={inputMessage.nickname && clickedButEmpty.nickname && inputMessage.nickname}
                            margin="normal"
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'cetner', width: '100%' }}>
                            <Button variant="text" color="primary" sx={{ textAlign: 'center', width: '100%' }} onClick={() => handleFindPassword()}>
                                확인
                            </Button>
                        </Box>
                        {isPasswordModal && (
                            <Modal visible={isPasswordModal} onClose={handlePasswordModalClose}>
                                <TextField
                                    fullWidth
                                    label="새로운 비밀번호"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onBlur={() => handleEmptyInput('password')}
                                    onFocus={() => clearInputMessage('password')}
                                    error={!!inputMessage.password && clickedButEmpty.password}
                                    helperText={inputMessage.password && clickedButEmpty.password && inputMessage.password}
                                    margin="normal"
                                />
                                <TextField
                                    fullWidth
                                    label="새로운 비밀번호 한번 더 입력"
                                    value={passwordCheck}
                                    onChange={(e) => setPasswordCheck(e.target.value)}
                                    onBlur={() => handleEmptyInput('passwordCheck')}
                                    onFocus={() => clearInputMessage('passwordCheck')}
                                    error={!!inputMessage.passwordCheck && clickedButEmpty.passwordCheck}
                                    helperText={inputMessage.passwordCheck && clickedButEmpty.passwordCheck && inputMessage.passwordCheck}
                                    margin="normal"
                                />
                                <Box sx={{ display: 'flex', justifyContent: 'cetner', width: '100%' }}>
                                    <Button
                                        variant="text"
                                        color="primary"
                                        sx={{ textAlign: 'center', width: '100%' }}
                                        onClick={() => handleUpdatePassword()}
                                    >
                                        확인
                                    </Button>
                                </Box>
                            </Modal>
                        )}
                    </Modal>
                )}
                <SocialKakao />
            </Box>
        </Container>
    );
}

const ButtonWrapper = styled.div`
    display: flex;
`;
