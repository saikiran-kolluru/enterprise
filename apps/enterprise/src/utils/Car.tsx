import React, { useState, createContext, useEffect } from 'react';
import Car from '../model/Car';

interface Props {
  children: React.ReactNode;
}
interface CarContextType {
  cars: Car[];
  addCar: (car: Car) => void;
  getCar: (id: string) => Promise<Car>;
  updateCar: (car: Car) => void;
  isNameUnique: (name: string) => Promise<boolean>;
}
export const CarContext = createContext<CarContextType | null>(null);

export const CarProvider = ({ children }: Props) => {
  const [cars, setCars] = useState<Car[]>([]);
  const [car, setCar] = useState<Car>({
    name: '',
    model: '',
    yearOfRelease: new Date(),
    brand: '',
    color: '',
  });
  const getUID = () => {
    return crypto.randomUUID();
  };

  const randomObject: Car = {
    name: 'maruthi',
    model: '5121',
    yearOfRelease: new Date(),
    brand: 'Maruthi',
    color: 'black',
  };

  useEffect(() => {
    generateCars(10);
  }, []);

  const generateCars = (count: number) => {
    let randomCars: Car[] = [];
    for (let i: number = 0; i < count; i++) {
      randomCars.push({ ...randomObject, id: getUID() });
    }
    console.log(randomCars, 'at in custome hook');
    setCars(randomCars);
  };

  const addCar = (car: Car) => {
    const updatedCars = [...cars, { ...car, id: getUID() }];
    setCars(updatedCars);
    console.log(car, ' at cars ', updatedCars);
  };
  // const getCar: Promise<Car> = new Promise((resolve, reject,) => {
  //   const filteredCar = cars.filter((car) => {
  //     return car.id === id;
  //   });
  //   setCar(filteredCar[0]);
  //   console.log(car, " in provider");
  //   resolve(
  //     car
  //   )
  // })
  const getCar = (id: any): Promise<Car> => {
    return new Promise((resolve, reject) => {
      const filteredCar = cars.filter((car) => {
        return car.id === id;
      });
      setCar(filteredCar[0]);
      console.log(car, ' in provider');
      resolve(car);
    });
  };

  const updateCar = (car: Car) => {
    const filteredCar = cars.filter((item) => {
      return item.id !== car.id;
    });
    const updatedCars = [...filteredCar, car];
    setCars(updatedCars);
    console.log(car, ' at cars ', updatedCars);
  };

  const isNameUnique = async (name: string): Promise<boolean> => {
    const isUnique = !cars.some((car) => car.name === name);
    return isUnique;
  };

  return (
    <CarContext.Provider
      value={{ cars, addCar, getCar, updateCar, isNameUnique }}
    >
      {children}
    </CarContext.Provider>
  );
};
