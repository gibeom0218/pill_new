import React, { useState } from 'react';
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
import axios from 'axios';

export default function App() {
  const [formData, setFormData] = useState({
    id: '',
    password: ''
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 사용자의 입력 데이터를 formData 객체에서 가져와서 서버로 전송
      const response = await axios.post('http://110.12.181.206:8081/login', formData);
      console.log('서버 응답: ', response.data);

      // 성공적으로 로그인 후 필요한 작업을 수행하세요
    } catch (error) {
      // 오류 처리
      console.error('로그인 오류: ', error);
    }
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
        <form onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            label="ID"
            required
            name="id"
            value={formData.id}
            onChange={handleFormChange}
            sx={{ width: '70%' }} // TextField의 폭을 100%로 지정하여 정렬
          />
          <TextField
            margin="normal"
            label="Password"
            type="password"
            required
            name="password"
            value={formData.password}
            onChange={handleFormChange}
            sx={{ width: '70%' }} // TextField의 폭을 100%로 지정하여 정렬
          />
          <FormControlLabel control={ <Checkbox value="remember" color="primary" />} label="Remember me"/>
          <Button type="submit" fullWidth variant="contained" sx={{mt:3, mb:2}}>Sign in</Button>
      </form>
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