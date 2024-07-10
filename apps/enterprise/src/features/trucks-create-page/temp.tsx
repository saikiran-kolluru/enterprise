// // // src/app/trucks-detail.tsx
// // import React from 'react';
// // import { useForm, SubmitHandler, useFieldArray, Controller } from 'react-hook-form';
// // import { yupResolver } from '@hookform/resolvers/yup';
// // import * as yup from 'yup';
// // import { Button, TextField, Grid, Paper, Typography, DatePicker } from '@mui/material';

// // interface Permit {
// //   permit_no: string;
// //   state: string;
// // }

// // interface TruckForm {
// //   name: string;
// //   model: string;
// //   yearOfRelease: Date | null;
// //   brand: string;
// //   permits: Permit[];
// // }

// // const schema = yup.object().shape({
// //   name: yup.string().required('Name is required').max(100, 'Name must be at most 100 characters'),
// //   model: yup.string().required('Model is required').max(100, 'Model must be at most 100 characters'),
// //   yearOfRelease: yup.date().required('Year of Release is required').min(new Date('2000-01-01'), 'Year must be 2000 or later'),
// //   brand: yup.string().required('Brand is required').max(100, 'Brand must be at most 100 characters'),
// //   permits: yup.array().of(
// //     yup.object().shape({
// //       permit_no: yup.string().required('Permit No is required').length(15, 'Permit No must be 15 digits'),
// //       state: yup.string().required('State is required'),
// //     })
// //   ),
// // });

// // const TrucksDetailView: React.FC = () => {
// //   const { control, handleSubmit, formState, register, setValue, setError, clearErrors, watch, getValues } =
// //     useForm<TruckForm>({
// //       resolver: yupResolver(schema),
// //       defaultValues: {
// //         name: '',
// //         model: '',
// //         yearOfRelease: null,
// //         brand: '',
// //         permits: [{ permit_no: '', state: '' }],
// //       },
// //     });

// //   const { fields, append, remove } = useFieldArray({
// //     control,
// //     name: 'permits',
// //   });

// //   const onSubmit: SubmitHandler<TruckForm> = (data) => {
// //     // Handle form submission
// //     console.log(data);
// //   };

// //   const watchAllFields = watch(); // Watch all fields to get their values

// //   return (
// //     <Grid container spacing={2}>
// //       <Grid item xs={12}>
// //         <Paper elevation={3} style={{ padding: '20px' }}>
// //           <form onSubmit={handleSubmit(onSubmit)}>
// //             <TextField
// //               {...register('name')}
// //               label="Name"
// //               fullWidth
// //               margin="normal"
// //               error={!!formState.errors.name}
// //               helperText={formState.errors.name?.message}
// //             />
// //             <TextField
// //               {...register('model')}
// //               label="Model"
// //               fullWidth
// //               margin="normal"
// //               error={!!formState.errors.model}
// //               helperText={formState.errors.model?.message}
// //             />
// //             <DatePicker
// //               {...register('yearOfRelease')}
// //               label="Year of Release"
// //               fullWidth
// //               margin="normal"
// //               format="MM/dd/yyyy"
// //               value={getValues('yearOfRelease')}
// //               onChange={(date) => setValue('yearOfRelease', date)}
// //               error={!!formState.errors.yearOfRelease}
// //               helperText={formState.errors.yearOfRelease?.message}
// //             />
// //             <TextField
// //               {...register('brand')}
// //               label="Brand"
// //               fullWidth
// //               margin="normal"
// //               error={!!formState.errors.brand}
// //               helperText={formState.errors.brand?.message}
// //             />

// //             <Typography variant="h6" gutterBottom>
// //               Permits:
// //             </Typography>
// //             {fields.map((field, index) => (
// //               <Grid container spacing={2} key={field.id}>
// //                 <Grid item xs={6}>
// //                   <TextField
// //                     {...register(`permits.${index}.permit_no`)}
// //                     label="Permit No"
// //                     fullWidth
// //                     margin="normal"
// //                     error={!!formState.errors?.permits?.[index]?.permit_no}
// //                     helperText={formState.errors?.permits?.[index]?.permit_no?.message}
// //                   />
// //                 </Grid>
// //                 <Grid item xs={4}>
// //                   <TextField
// //                     {...register(`permits.${index}.state`)}
// //                     label="State"
// //                     fullWidth
// //                     margin="normal"
// //                     error={!!formState.errors?.permits?.[index]?.state}
// //                     helperText={formState.errors?.permits?.[index]?.state?.message}
// //                   />
// //                 </Grid>
// //                 <Grid item xs={2}>
// //                   <Button
// //                     type="button"
// //                     onClick={() => {
// //                       remove(index);
// //                       // Clear errors when removing a field
// //                       clearErrors(`permits.${index}`);
// //                     }}
// //                     variant="outlined"
// //                   >
// //                     Delete Permit
// //                   </Button>
// //                 </Grid>
// //               </Grid>
// //             ))}
// //             <Button
// //               type="button"
// //               onClick={() => {
// //                 append({ permit_no: '', state: '' });
// //                 // Clear errors when adding a new field
// //                 clearErrors(`permits.${fields.length}`);
// //               }}
// //               variant="outlined"
// //             >
// //               Add Permit
// //             </Button>

// //             <Button type="submit" disabled={!formState.isValid} variant="contained" color="primary">
// //               Submit
// //             </Button>
// //           </form>
// //         </Paper>
// //       </Grid>
// //     </Grid>
// //   );
// // };

// // export default TrucksDetailView;



// import {
//     Box,
//     FormControl,
//     TextField,
//     FormControlLabel,
//     Button,
//     Typography,
//     Container,
//   } from '@mui/material';
//   import { useForm } from 'react-hook-form';
//   import * as yup from 'yup';
//   import { DatePicker } from '@mui/x-date-pickers/DatePicker';
//   import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
//   import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
//   import { yupResolver } from '@hookform/resolvers/yup';
//   import { Controller } from 'react-hook-form';
//   import dayjs from 'dayjs';
//   import { CarContext } from '../../utils/Car';
//   import { useContext, useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import Car from '../../model/Car';
  
//   const schema = yup.object().shape({
//     name: yup
//       .string()
//       .max(100, 'You have reached maximum length for name')
//       .required(),
//     model: yup
//       .string()
//       .max(100, 'You have reached maximum length for model')
//       .required(),
//       yearOfRelease: yup
//       .date()
//       .required('Year of Release is required'),
//     brand: yup
//       .string()
//       .max(100, 'You have reached maximum length for brand')
//       .required(),
//     color: yup
//       .string()
//       .max(100, 'You have reached maximum length for color')
//       .required(),
//   });
  
//   const CarUpdatePage = () => {
//     const {carId} = useParams();
//     const carContext = useContext(CarContext);
//     console.log(carId);
//     const [defaultValues, setDefaultValues] = useState<Car>();
//     const carDetails = carContext?.getCar(`${carId? carId: ''}`);
//     console.log(carDetails)
//     useEffect(()=>{
//       setDefaultValues(carDetails);
//       reset(carDetails);
//     },[])
//     const {
//       register,
//       handleSubmit,
//       formState: { errors, isValid },
//       reset,
//       watch,
//       control,
//       setValue,
//       getValues
//     } = useForm({ resolver: yupResolver(schema) });
//     const onSubmitHandler = (formValue: any) => {
//       console.log(formValue);
//       console.log(dayjs(formValue?.yearOfRelease).toDate);
//       const formatedYear = dayjs(formValue?.yearOfRelease).format('YYYY');
//       carContext?.addCar(formValue);
//       reset();
//     };
  
//     return (
//       <Box sx={{ mx: 12 }}>
//         <form onSubmit={handleSubmit(onSubmitHandler)}>
//           <FormControl>
//             <Typography sx={{ m: 1, fontWeight: '600', color: '#1A1C1F' }}>
//               Car Details
//             </Typography>
//             <TextField
//               {...register('name')}
//               id="name"
//               label="Name"
//               variant="outlined"
//               error={errors.name?.message ? true : false}
//               // helperText={errors.name?.message}
//               sx={{ my: 2 }}
//             />
//             {errors?.name && (
//               <Typography fontSize={12} color="error">
//                 {errors?.name.message}
//               </Typography>
//             )}
//             <TextField
//               {...register('model')}
//               id="model"
//               label="Model"
//               variant="outlined"
//               error={errors.model?.message ? true : false}
//               sx={{ my: 2 }}
//             />
//             {errors?.model && (
//               <Typography fontSize={12} color="error">
//                 {errors?.model.message}
//               </Typography>
//             )}
//             <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <DatePicker
//         onChange={()=>{}}
//       />
//     </LocalizationProvider>
//             <TextField
//               {...register('brand')}
//               id="brand"
//               label="Brand"
//               variant="outlined"
//               error={errors.brand?.message ? true : false}
//               helperText={errors.brand?.message}
//               sx={{ my: 2 }}
//             />
//             {errors?.brand && (
//               <Typography fontSize={12} color="error">
//                 {errors?.brand.message}
//               </Typography>
//             )}
//             <TextField
//               {...register('color')}
//               id="color"
//               label="Color"
//               variant="outlined"
//               error={errors.color?.message ? true : false}
//               helperText={errors.color?.message}
//             />
//             {errors?.color && (
//               <Typography fontSize={12} color="error">
//                 {errors?.color.message}
//               </Typography>
//             )}
//             <Button
//               sx={{ mt: 4 }}
//               onClick={() => {
//                 handleSubmit(onSubmitHandler);
//               }}
//               variant="contained"
//               type="submit"
//               disabled={!isValid}
//             >
//               Submit
//             </Button>
//           </FormControl>
//         </form>
//       </Box>
//     );
//   };
  
//   export default CarUpdatePage;
  