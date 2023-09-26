//import logo from './logo.svg';
import './App.css';
import Button from '@mui/material/Button';

function home() {
    function login(e){
        window.location.href="/login"
    }
    function pillSearch(e){
      window.location.href="/pillSearch"
  }
    function pillEnrollList(e){
    window.location.href="/pillEnrollList"
  }
  return (
    <div>
        <Button onClick={login} variant="contained">로그인/회원가입 화면 버튼</Button>
        <Button onClick={pillSearch} variant="contained">약 등록 화면 버튼</Button>
        <Button onClick={pillEnrollList}variant="contained">등록 리스트 화면 버튼</Button>
        <Button variant="contained">약 체크리스트 화면</Button>
    </div>
    
  );
}

export default home;