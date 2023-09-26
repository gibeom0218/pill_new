import React from 'react';
import './style.css';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useState } from 'react'
import axios from 'axios';

export default function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const handleLogin = () => {
    // 서버로 보낼 데이터
    const data = {
      username: username,
      password: password,
    };

    // 서버 URL (실제 서버 URL로 변경해야 함)
    const apiUrl = 'http://110.12.181.206:8081/login';

    // Axios를 사용하여 POST 요청 보내기
    axios.post(apiUrl, data)
      .then(response => {
        // 서버 응답 처리
        console.log('로그인 성공:', response.data);
        // 로그인 성공 후 원하는 작업을 수행하세요.
      })
      .catch(error => {
        // 에러 처리
        console.error('로그인 실패:', error);
        // 로그인 실패 시 사용자에게 알림을 보여줄 수 있습니다.
      });
  };

  // const handleLogin = () => {
  //   // 여기에서 로그인 로직을 구현합니다.
  //   // 예를 들어, 사용자명과 비밀번호를 서버로 전송하여 인증을 확인하거나
  //   // 간단한 로컬 인증 로직을 구현할 수 있습니다.

  //   // 간단한 예제로 사용자명이 "user"이고 비밀번호가 "password"인 경우에만 로그인 성공으로 가정합니다.
  //   if (username === 'user123' && password === '1234') {
      
  //     alert('로그인 성공!');
  //   } else {
  //     alert('로그인 실패. 사용자명과 비밀번호를 확인하세요.');
  //   }
  // };

  return (
    <Container component="main" maxWidth="xs">
       <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
       <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
        </Avatar>
       <Typography component="h1" variant="h5">
            Sign in
          </Typography>
      <TextField
        margin = "normal" 
        label="ID"  
        required 
        name="id"
        onChange={(e) => setUsername(e.target.value)}
        /> 
      <TextField
        margin = "normal"  
        label="Password" 
        type="password" 
        required
        name="password"
        onChange={(e) => setPassword(e.target.value)}
        />
      <FormControlLabel control={ <Checkbox value="remember" color="primary" />} label="Remember me"/>
      <Button type="submit" fullWidth variant="contained" sx={{mt:3, mb:2}} onClick={handleLogin}>Sign in</Button>
      <Grid container>
       <Grid item xs>
        <Link>Forgot Password?</Link>
        </Grid>
       <Grid item>      
        <Link href = '/resister'>회원가입</Link>
       </Grid>
      </Grid>
      </Box>
    </Container>
  );
}
