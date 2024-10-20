import { useNavigate } from 'react-router-dom';
import { userFormHandler } from '../../handler/userFormHandler';
import SocialKakao from './SocialKakao';
import { Container, Box, Typography, TextField, Button, Divider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { showModal } from '../../redux/reducer/modalSlice';
import { RootState } from '../../redux/store/store';
// import Modal from '../../components/Modal/Modal';
// import { useModal } from '../../hooks/useModal';

export default function Login(): JSX.Element {
    const navigate = useNavigate();
    const { email, setEmail, password, setPassword, clickedButEmpty, handleEmptyInput, clearInputMessage, inputMessage, handleLogin } =
        userFormHandler();
    // const { openModal, closeModal, handleConfirm, isModalVisible } = useModal();
    const dispatch = useDispatch();
    const modalContent = useSelector((state: RootState) => state.modal.content);

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
                        sx={{ mt: 3, backgroundColor: '#b2dfdb', color: 'black', fontWeight: 'bold', ':hover': { backgroundColor: '#80cbc4' } }}
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
                    <Button variant="text" color="primary" onClick={() => navigate('/signup')}>
                        회원가입
                    </Button>
                </Box>
                <SocialKakao />
            </Box>
        </Container>
    );
}
