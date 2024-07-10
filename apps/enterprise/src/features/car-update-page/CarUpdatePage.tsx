import {
  Box,
  FormControl,
  TextField,
  FormControlLabel,
  Button,
  Typography,
  Container,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller } from 'react-hook-form';
import dayjs from 'dayjs';
import { CarContext } from '../../utils/Car';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Car from '../../model/Car';
import { useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
  name: yup
    .string()
    .max(100, 'You have reached maximum length for name')
    .required(),
  model: yup
    .string()
    .max(100, 'You have reached maximum length for model')
    .required(),
  yearOfRelease: yup
    .date()
    .required('Year of Release is required')
    .min(new Date('2000-01-01'), 'Year must be 2000 or later'),
  brand: yup
    .string()
    .max(100, 'You have reached maximum length for brand')
    .required(),
  color: yup
    .string()
    .max(100, 'You have reached maximum length for color')
    .required(),
});

const CarUpdatePage = () => {
  const navigate = useNavigate();
  const { carId } = useParams();
  const carContext = useContext(CarContext);
  console.log(carId);
  const [defaultValues, setDefaultValues] = useState<Car>();
  // const getDetails = async () => {
  //   const carDetails = await carContext?.getCar(`${carId ? carId : ''}`);
  //   console.log(carDetails);
  //   setDefaultValues(carDetails);
  //   reset(defaultValues);
  // };
  // useEffect(() => {
  //   getDetails();
  // }, [defaultValues]);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
    control,
    setValue,
    getValues,
  } = useForm({ resolver: yupResolver(schema) });
  useEffect(() => {
    const getDetails = async () => {
      const carDetails = await carContext?.getCar(`${carId ? carId : ''}`);
      reset(carDetails);
    };
    getDetails();
  }, [carContext, carId, reset]);

  const onSubmitHandler = async (formValue: any) => {
    const formatedYear = dayjs(formValue?.yearOfRelease).format('YYYY');
    carContext?.updateCar(formValue);
    // reset();
    navigate(-1);
  };

  return (
    <Box sx={{ mx: 12 }}>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <FormControl>
          <Typography sx={{ m: 1, fontWeight: '600', color: '#1A1C1F' }}>
            Car Details
          </Typography>
          <TextField
            {...register('name')}
            id="name"
            label="Name"
            variant="outlined"
            onChange={(e) => {
              setValue('name', e.target.value, {
                shouldValidate: true,
                shouldDirty: true,
              });
            }}
            error={errors.name?.message ? true : false}
            // helperText={errors.name?.message}
            sx={{ my: 2 }}
          />
          {errors?.name && (
            <Typography fontSize={12} color="error">
              {errors?.name.message}
            </Typography>
          )}
          <TextField
            {...register('model')}
            id="model"
            label="Model"
            variant="outlined"
            onChange={(e) => {
              setValue('model', e.target.value, {
                shouldValidate: true,
                shouldDirty: true,
              });
            }}
            error={errors.model?.message ? true : false}
            sx={{ my: 2 }}
          />
          {errors?.model && (
            <Typography fontSize={12} color="error">
              {errors?.model.message}
            </Typography>
          )}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              {...register('yearOfRelease')}
              onChange={(date: Date | null) => {
                date &&
                  setValue('yearOfRelease', date, {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
              }}
            />
            {errors?.yearOfRelease && (
              <Typography fontSize={12} color="error">
                {errors?.yearOfRelease.message}
              </Typography>
            )}
          </LocalizationProvider>
          <TextField
            {...register('brand')}
            id="brand"
            label="Brand"
            variant="outlined"
            onChange={(e) => {
              setValue('brand', e.target.value, {
                shouldValidate: true,
                shouldDirty: true,
              });
            }}
            error={errors.brand?.message ? true : false}
            sx={{ my: 2 }}
          />
          {errors?.brand && (
            <Typography fontSize={12} color="error">
              {errors?.brand.message}
            </Typography>
          )}
          <TextField
            {...register('color')}
            id="color"
            label="Color"
            variant="outlined"
            onChange={(e) => {
              setValue('color', e.target.value, {
                shouldValidate: true,
                shouldDirty: true,
              });
            }}
            error={errors.color?.message ? true : false}
          />
          {errors?.color && (
            <Typography fontSize={12} color="error">
              {errors?.color.message}
            </Typography>
          )}
          <Button
            sx={{ mt: 4 }}
            onClick={() => {
              handleSubmit(onSubmitHandler);
            }}
            variant="contained"
            type="submit"
            disabled={!isValid}
          >
            Update
          </Button>
        </FormControl>
      </form>
    </Box>
  );
};

export default CarUpdatePage;
