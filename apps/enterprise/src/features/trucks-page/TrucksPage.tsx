import { useContext, useEffect } from 'react';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { TruckContext } from '../../utils/Truck';
import Permit from '../../model/Permit';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

const TrucksPage = () => {
  const trucksContext = useContext(TruckContext);
  const navigate = useNavigate();

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'model', headerName: 'model', width: 150 },
    {
      field: 'yearOfRelease',
      valueGetter: (params: any) => {
        const formatedYear = dayjs(params?.row?.yearOfRelease).format('YYYY');

        return formatedYear;
      },
      headerName: 'Year Of Release',
      width: 150,
    },
    { field: 'brand', headerName: 'Brand', width: 150 },
    {
      field: 'permit',
      valueGetter: (params: any) => {
        let combinedStates = '';

        params?.row?.permits.map((item: Permit, id: number) => {
          combinedStates = combinedStates + ` ${item.state},`;
        });
        return combinedStates;
      },
      headerName: 'Permit',
      width: 200,
    },
    {
      field: 'update',
      headerName: 'Update',
      width: 200,
      renderCell: (params) => {
        return (
          <Button
            variant="contained"
            onClick={() => {
              navigate(`${params.id}`);
            }}
          >
            Update
          </Button>
        );
      },
    },
  ];
  const trucks = trucksContext?.trucks || [];
  const rows: GridRowsProp = trucks;

  return (
    <Box sx={{ mx: 4 }}>
      <Box component="h1" sx={{ textAlign: 'center' }}>
        Truck List View
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
        <Button
          variant="contained"
          onClick={() => {
            navigate('/trucks/create');
          }}
        >
          Add Truck
        </Button>
      </Box>
      <Box sx={{ pt: 4 }}>
        <DataGrid rows={rows} columns={columns} />
      </Box>
    </Box>
  );
};
export default TrucksPage;
