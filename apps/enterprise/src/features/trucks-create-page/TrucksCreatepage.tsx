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
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .max(100, 'Name must be at most 100 characters'),
  model: yup
    .string()
    .required('Model is required')
    .max(100, 'Model must be at most 100 characters'),
  yearOfRelease: yup
    .date()
    .nullable()
    .required('Year of Release is required')
    .min(new Date(2000, 0, 1), 'Select year after 2000'),
  brand: yup
    .string()
    .required('Brand is required')
    .max(100, 'Brand must be at most 100 characters'),
  permits: yup.array().of(
    yup.object().shape({
      permit_no: yup
        .string()
        .required('Permit No is required')
        .length(15, 'Permit No must be 15 digits'),
      state: yup.string().required('State is required'),
    })
  ),
});

const TrucksCreatePage = () => {
  const navigate = useNavigate();
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

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'permits',
  });
  const truckContext = useContext(TruckContext);
  const isNameUnique = async (name: string) => {
    const isUnique = await truckContext?.isNameUnique(name);
    return isUnique || 'Car name must be unique';
  };
  const onSubmitHandler = async (formValue: any) => {
    const isUnique = await isNameUnique(formValue?.name);
    if (isUnique !== true) {
      alert(isUnique);
      return;
    }
    truckContext?.addTruck(formValue);
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
            error={errors.name?.message ? true : false}
            onChange={(e)=>{setValue('name', e.target.value, { shouldValidate: true , shouldDirty: true })}}
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
            onChange={(e)=>{setValue('model', e.target.value, { shouldValidate: true , shouldDirty: true })}}
            error={errors.model?.message ? true : false}
            sx={{ my: 2 }}
          />
          {errors?.model && (
            <Typography fontSize={12} color="error">
              {errors?.model.message}
            </Typography>
          )}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
              name="yearOfRelease"
              control={control}
              render={({ field }) => (
                <DatePicker {...field} label="Year Of Release" sx={{ my: 2 }}/>
              )}
            ></Controller>
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
            onChange={(e)=>{setValue('brand', e.target.value, { shouldValidate: true , shouldDirty: true })}}
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
                onChange={(e)=>{setValue(`permits.${index}.permit_no`, e.target.value, { shouldValidate: true , shouldDirty: true })}}
                error={!!errors?.permits?.[index]?.permit_no}
                helperText={errors?.permits?.[index]?.permit_no?.message}
              />

              <TextField
                {...register(`permits.${index}.state`)}
                label="State"
                fullWidth
                margin="normal"
                onChange={(e)=>{setValue(`permits.${index}.state`, e.target.value, { shouldValidate: true , shouldDirty: true })}}
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
            Submit
          </Button>
        </FormControl>
      </form>
    </Box>
  );
};

export default TrucksCreatePage;
