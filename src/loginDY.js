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
      id: username,
      pw: password,
    };

    console.log(data);
    
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
        /> <br></br>
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