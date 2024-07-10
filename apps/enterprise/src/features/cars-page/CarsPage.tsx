import { useContext, useEffect, useState } from 'react';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CarContext } from '../../utils/Car';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

const CarsPage = () => {
  const carContext = useContext(CarContext);
  console.log(carContext?.cars);
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
    { field: 'color', headerName: 'Color', width: 150 },
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

  // useEffect(() => {
  //   console.log(f)
  // }, []);
  const cars = carContext?.cars || [];
  const rows: GridRowsProp = cars;

  return (
    <Box sx={{ mx: 4 }}>
      <Box component="h1" sx={{ textAlign: 'center' }}>
        Car List View
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
        <Button
          variant="contained"
          onClick={() => {
            navigate('/cars/create');
          }}
        >
          Add Car
        </Button>
      </Box>
      <Box sx={{ pt: 4 }}>
        <DataGrid rows={rows} columns={columns} />
      </Box>
    </Box>
  );
};
export default CarsPage;
