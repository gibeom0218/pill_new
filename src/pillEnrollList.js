import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from '@mui/icons-material';
import Typography from '@mui/material/Typography'; // Typography 컴포넌트를 추가

function DataTable() {
  const [rows, setRows] = React.useState([
    {
      id: 1,
      name: '약 이름 1',
      image: '링크_1.jpg', // 이미지에 대한 링크 주소를 여기에 입력
      info: '약에 대한 정보 1',
    },
    {
      id: 2,
      name: '약 이름 2',
      image: '링크_2.jpg', // 이미지에 대한 링크 주소를 여기에 입력
      info: '약에 대한 정보 2',
    },
    // 나머지 행 데이터도 비슷하게 추가
  ]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: '약 이름', width: 200 },
    {
      field: 'image',
      headerName: '약 이미지',
      width: 200,
      renderCell: (params) => {
        // 이미지를 링크로 표시하는 예시
        return <img src={params.value} alt="약 이미지" style={{ width: '100%', height: 'auto' }} />;
      },
    },
    { field: 'info', headerName: '약 관련 정보', width: 300 },
    {
      field: 'action',
      headerName: '제거',
      width: 150,
      renderCell: (params) => {
        const handleDeleteClick = () => {
          // 휴지통 버튼을 클릭했을 때 해당 행을 삭제하는 함수
          // rows 상태를 업데이트하는 예시
          setRows((prevRows) => prevRows.filter((row) => row.id !== params.row.id));
        };

        return (
          <>
            <button className='userListDelete' onClick={handleDeleteClick}>
              <DeleteOutline />
            </button>
          </>
        );
      },
    },
  ];

  return (
    <div>
      <Typography variant="h4" style={{ textAlign: 'center', margin: '20px' }}>
        나만의 알약 등록리스트
      </Typography>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </div>
    </div>
  );
}

export default DataTable;
