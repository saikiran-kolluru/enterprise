import {
  Box,
  FormControl,
  TextField,
  FormControlLabel,
  Button,
  Typography,
  Container,
  Grid,
} from '@mui/material';
import { useForm, useFieldArray } from 'react-hook-form';
import * as yup from 'yup';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller } from 'react-hook-form';
import dayjs from 'dayjs';
import { TruckContext } from '../../utils/Truck';
import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Truck from '../../model/Truck';

const schema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .max(100, 'Name must be at most 100 characters'),
  model: yup
    .string()
    .required('Model is required')
    .max(100, 'Model must be at most 100 characters'),
  yearOfRelease: yup.date().nullable().required('Year of Release is required'),
  brand: yup
    .string()
    .required('Brand is required')
    .max(100, 'Brand must be at most 100 characters'),
  permits: yup.array().of(
    yup.object().shape({
      permit_no: yup
        .string()
        .length(15, 'Permit No must be 15 digits')
        .required('Permit No is required'),
      state: yup.string().required('State is required'),
    })
  ),
});

const TruckUpdatePage = () => {
  const { truckId } = useParams();
  const navigate = useNavigate();
  const truckContext = useContext(TruckContext);
  const [defaultValues, setDefaultValues] = useState<Truck>();
  const [defaultYearOfRelease, setDefaultYearOfRelease] = useState<Date | null>(
    null
  );
  const truckDetails = truckContext?.getTruck(`${truckId ? truckId : ''}`);
  console.log(truckDetails);
  // useEffect(() => {
  //   setDefaultValues(truckDetails);
  //   reset(truckDetails);
  // }, []);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    register,
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    const getDetails = async () => {
      const truckDetails = await truckContext?.getTruck(
        `${truckId ? truckId : ''}`
      );
      setDefaultYearOfRelease(truckDetails?.yearOfRelease || null);
      reset(truckDetails);
    };

    getDetails();
  }, [truckContext, truckId, reset]);
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'permits',
  });
  const onSubmitHandler = (formValue: any) => {
    truckContext?.updateTruck(formValue);
    reset();
    navigate(-1);
  };

  return (
    <Box sx={{ mx: 12, width: '100%' }}>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <FormControl>
          <Typography sx={{ m: 1, fontWeight: '600', color: '#1A1C1F' }}>
            Truck Details
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
          {fields.map((field, index) => (
            <Box sx={{ display: 'flex', gap: 2, my: 2 }} key={index}>
              <TextField
                {...register(`permits.${index}.permit_no`)}
                label="Permit No"
                fullWidth
                margin="normal"
                onChange={(e) => {
                  setValue(`permits.${index}.permit_no`, e.target.value, {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                }}
                error={!!errors?.permits?.[index]?.permit_no}
                helperText={errors?.permits?.[index]?.permit_no?.message}
              />

              <TextField
                {...register(`permits.${index}.state`)}
                label="State"
                fullWidth
                margin="normal"
                onChange={(e) => {
                  setValue(`permits.${index}.state`, e.target.value, {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                }}
                error={!!errors?.permits?.[index]?.state}
                helperText={errors?.permits?.[index]?.state?.message}
              />

              <Button
                type="button"
                onClick={() => remove(index)}
                variant="contained"
              >
                Delete Permit
              </Button>
            </Box>
          ))}
          <Button
            type="button"
            onClick={() => append({ permit_no: '', state: '' })}
            variant="contained"
          >
            Add Permit
          </Button>
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

export default TruckUpdatePage;
