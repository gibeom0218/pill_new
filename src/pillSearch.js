import React, { useState } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  Grid,
  AppBar,
  Toolbar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';


var lastAddedEdiCode;

const PillSearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [registerStatus, setRegisterStatus] = useState('');
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [confirmedRegistration, setConfirmedRegistration] = useState(false);

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get(`http://110.12.181.206:8081/pillSearch?pillName=${searchTerm}`);
      const { success, pillList, errorMessage } = response.data;
      setSearchResults(pillList);

      if (!success) {
        console.error('Search failed:', errorMessage);
        setRegisterStatus('검색에 성공했습니다.');
      }
    } catch (error) {
      console.error('Search failed:', error.message);
      setRegisterStatus('검색에 실패했습니다.');
    }
  };

  const handleViewPillSpec = (itemSeq) => {
    const url = `/pillSpec/${itemSeq}`;
    window.open(url, '_blank');
  };

  const handleRegister = async (ediCode) => {
    const data = {
      id: 'example_id',
      ediCode,
    };

    try {
      const response = await axios.post('http://110.12.181.206:8081/pillEnroll', data);

      if (response.data === 'OK') {
        alert('등록이 완료되었습니다.');
        setRegisterStatus('Success: 등록이 완료되었습니다.');
      } else if (response.data === 'COMBINED') {
        lastAddedEdiCode = ediCode;
        //console.log("알림창");
        setOpenConfirmationDialog(true);
      } else {
        // Handle other responses or errors as needed
      }
    } catch (error) {
      console.error('Registration failed:', error.message);
      alert('등록에 실패했습니다.');
      setRegisterStatus('Failure: An error occurred during registration.');
    }
  };

  const handleDelete = async (ediCode) => {
    try {
      //console.log("asdfasfdsa2222222");
      await axios.post('http://110.12.181.206:8081/deletePillEnroll', { id: 'example_id', ediCode });
      // 성공적으로 삭제되면 현재 검색 결과를 갱신
      //console.log("asdfasfdsa333333");
      const updatedSearchResults = searchResults.filter((pill) => pill.EDI_CODE !== ediCode);
      setSearchResults(updatedSearchResults);
    } catch (error) {
      console.error('Error deleting pill:', error);
    }
  };

  const handleConfirmationDialogClose = () => {
    setOpenConfirmationDialog(false);

    // 사용자가 확인 버튼을 클릭한 경우에만 등록 진행
    //console.log("66666666666666");
    if (confirmedRegistration) {
      // 확인 버튼을 클릭한 경우에 대한 등록 처리
      // ...

      // 확인 상태 초기화
      setConfirmedRegistration(false);

      // handleDelete 함수 호출
      //console.log("asdfasfdsa1");
     //handleDelete(lastAddedEdiCode);
    }
    else{
      handleDelete(lastAddedEdiCode);
      //console.log("else");
    }
  };

  const handleConfirmationDialogConfirm = () => {
    // Handle the confirmation action, e.g., proceed with registration
    // ...

    // Set the confirmation state to true
    setConfirmedRegistration(true);

    // Close the confirmation dialog
    setOpenConfirmationDialog(false);
  };

  return (
    <div>
      <AppBar position="relative" sx={{ background: '#663399' }}>
        <Toolbar>
          <MedicalServicesIcon sx={{ mr: 4 }} />
          <Typography variant="h4" color="inherit" noWrap fontWeight={'bold'}>
            PillBOX
          </Typography>
          <Button sx={{marginLeft: '150px',fontSize: '18px',fontWeight: 'bold'}}color="inherit" onClick={() => { window.location.href = '/' }}>홈페이지</Button>
          <Button sx={{marginLeft: '150px',fontSize: '18px',fontWeight: 'bold',}}color="inherit" onClick={() => { window.location.href = '/pillSearch' }}>검색 및 등록</Button>
          <Button sx={{marginLeft: '150px',fontSize: '18px',fontWeight: 'bold',}}color="inherit" onClick={() => { window.location.href = '/pillEnrollList' }}>약 목록</Button>
          <Button sx={{marginLeft: '150px',fontSize: '18px',fontWeight: 'bold',}}color="inherit" onClick={() => { window.location.href = '/pillMap' }}>약국 지도</Button>
          <Button sx={{marginLeft: '150px',fontSize: '18px',fontWeight: 'bold',}}color="inherit" onClick={() => { window.location.href = '/pillChk' }}>체크리스트</Button>
          <Button
            variant="contained"
            sx={{
              marginLeft: '280px',
              width: '70px',
              height: '30px',
              fontWeight: 'bold',
              background: '#FFFFFF',
              color :'#000000'
            }}
            onClick={() => {
              window.location.href = '/login';
            }}
          >
            LOGIN
          </Button>
        </Toolbar>
      </AppBar>
      <p></p>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px', border: '3px solid #ccc' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          약 검색 및 등록 페이지
        </Typography>

        <div>
          <form onSubmit={handleSearch}>
            <TextField
              label="약 이름 검색"
              variant="outlined"
              value={searchTerm}
              onChange={handleSearchTermChange}
            />
            <Button variant="contained" color="primary" type="submit" sx={{ width: '80px', height: '55px' }}>
              검색
            </Button>
          </form>
        </div>

        <div style={{ marginTop: '20px' }}>
          <Typography variant="h5">검색된 약 리스트 ↓</Typography>
          <List>
            {searchResults.map((pill, index) => (
              <ListItem key={index}>
                <Grid container justifyContent="space-between">
                  <Grid item>
                    <ListItemText
                      primary={pill.ITEM_NAME}
                      secondary={`약 코드: ${pill.EDI_CODE}`}
                    />
                  </Grid>
                  <Grid item>
                    <Button
                      variant="outlined"
                      onClick={() => handleViewPillSpec(pill.EDI_CODE)}
                    >
                      약 정보
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => handleRegister(pill.EDI_CODE)}
                    >
                      등록
                    </Button>
                  </Grid>
                </Grid>
              </ListItem>
            ))}
          </List>
        </div>

        <div style={{ marginTop: '20px' }}>
          <Typography variant="h5">등록 상태</Typography>
          <Typography>{registerStatus}</Typography>
        </div>

        {/* 수정된 확인 대화상자 */}
        <Dialog
          open={openConfirmationDialog}
          onClose={handleConfirmationDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">주의</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              병용 금기 약물입니다. 계속 등록하시겠습니까?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleConfirmationDialogClose} color="primary">
              취소
            </Button>
            <Button onClick={handleConfirmationDialogConfirm} color="primary" autoFocus>
              확인
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default PillSearchPage;