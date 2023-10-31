import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import Card from '@mui/material/Card';
//import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
//import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
//import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './App.css'; // Import custom CSS

const cards = [
  {
    title: '검색 및 등록',
    description: '원하는 약을 검색하고 약 리스트에 저장합니다.',
    image: '/1.png',
    link: '/pillSearch'
  },
  {
    title: '약 목록',
    description: '사용자가 등록한 약을 확인합니다.',
    image: '/2.png',
    link: '/pillEnrollList'
  },
  {
    title: '약국 지도',
    description: '사용자 주변 약을 구매할수 있는 약국을 보여줍니다.',
    image: '/3.png',
    link: '/pillMap'
  },
  {
    title: '체크리스트',
    description: '사용자가 약을 복용했는지 체크.',
    image: '/4.png',
    link: '/pillChk'
  },
];

const defaultTheme = createTheme();

const handleCardClick = (link) => {
  window.location.href = link;
};

const CustomCard = ({ title, description, image, link }) => (
  <Card
    className="custom-card" // Apply custom CSS class
    onClick={() => handleCardClick(link)}
  >
    <CardMedia
      component="img"
      alt={title}
      height="200"
      src={image}
      style={{ objectFit: 'contain' }}
    />
    <CardContent sx={{ flexGrow: 1 }}>
      <Typography gutterBottom variant="h5" component="div">
        {title}
      </Typography>
      <Typography>
        {description}
      </Typography>
    </CardContent>
  </Card>
);

export default function Album() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <MedicalServicesIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            Welcome
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              PILL BOX(미정)
            </Typography>
          </Container>
        </Box>
        <Button
            variant="contained"
            sx={{
                width: '100px', // 원하는 너비
                height: '50px'   // 원하는 높이
            }}
            onClick={() => {
                // 원하는 링크로 이동
                window.location.href = '/login';
              }}
            >
            Sign in
        </Button>  
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
            {cards.map((card, index) => (
              <Grid item key={index} xs={14} sm={6} md={4}>
                <CustomCard
                  title={card.title}
                  description={card.description}
                  image={card.image}
                  link={card.link}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
      </Box>
    </ThemeProvider>
  );
}
