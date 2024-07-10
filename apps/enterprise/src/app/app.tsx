// eslint-disable-next-line @typescript-eslint/no-unused-vars
import HomePage from '../features/home-page/HomePage';
import { Routes, Route, useLocation } from 'react-router-dom';
import CarsPage from '../features/cars-page/CarsPage';
import TrucksPage from '../features/trucks-page/TrucksPage';
import CarCreatePage from '../features/cars-create-page/CarsCreatePage';
import { CarProvider } from '../utils/Car';
import { TruckProvider } from '../utils/Truck';
import TrucksCreatePage from '../features/trucks-create-page/TrucksCreatepage';
import CarUpdatePage from '../features/car-update-page/CarUpdatePage';
import TruckUpdatePage from '../features/truck-update-page/TruckUpdatePage';

export function App() {
  return (
    <div>
      <CarProvider>
        <TruckProvider>
          <HomePage></HomePage>
          <Routes>
            <Route path="/cars" element={<CarsPage />}></Route>
            <Route path="/trucks" element={<TrucksPage />}></Route>
            <Route path="/cars/create" element={<CarCreatePage />}></Route>
            <Route path="/trucks/create" element={<TrucksCreatePage />}></Route>
            <Route path="/cars/:carId" element={<CarUpdatePage />} />
            <Route path="/trucks/:truckId" element={<TruckUpdatePage />} />
          </Routes>
        </TruckProvider>
      </CarProvider>
    </div>
  );
}

export default App;
