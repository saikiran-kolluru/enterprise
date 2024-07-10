import { createContext, useEffect, useState } from 'react';
import Truck from '../model/Truck';

interface Props {
  children: React.ReactNode;
}

interface TruckContextType {
  trucks: Truck[];
  addTruck: (truck: Truck) => void;
  getTruck: (id: string) => Promise<Truck>;
  updateTruck: (truck: Truck) => void;
  isNameUnique: (name: string) => Promise<boolean>;
}
export const TruckContext = createContext<TruckContextType | null>(null);

export const TruckProvider = ({ children }: Props) => {
  const [trucks, setTrucks] = useState<Truck[]>([]);
  const [truck, setTruck] = useState<Truck>({
    name: '',
    model: '',
    yearOfRelease: new Date(),
    brand: '',
    permits: [],
  });
  const getUID = () => {
    return crypto.randomUUID();
  };
  const randomObject: Truck = {
    name: 'B125S',
    model: '5121',
    yearOfRelease: new Date(),
    brand: 'Ashok Layland',
    permits: [
      {
        permit_no: '321',
        state: 'Telanagana',
      },
      {
        permit_no: '564',
        state: 'Maharashtra',
      },
      {
        permit_no: '785',
        state: 'Madhya Pradesh',
      },
    ],
  };
  useEffect(() => {
    generateTrucks(10);
  }, []);

  const generateTrucks = (count: number) => {
    let randomTrucks: Truck[] = [];
    for (let i: number = 1; i < count; i++) {
      randomTrucks.push({ ...randomObject, id: getUID() });
    }
    console.log(randomTrucks, 'at in custome hook');
    setTrucks(randomTrucks);
  };
  const addTruck = (truck: Truck) => {
    const updatedCars = [...trucks, { ...truck, id: getUID() }];
    setTrucks(updatedCars);
    console.log(truck, ' at cars ', updatedCars);
  };
  const getTruck = (id: any): Promise<Truck> => {
    return new Promise((resolve, reject) => {
      const filteredCar = trucks.filter((truck) => {
        return truck.id === id;
      });
      setTruck(filteredCar[0]);
      resolve(truck);
    });
  };

  const updateTruck = (truck: Truck) => {
    const filteredTruckss = trucks.filter((item) => {
      return item.id !== truck.id;
    });
    const updatedTrucks = [...filteredTruckss, truck];
    setTrucks(updatedTrucks);
    console.log(truck, ' at cars ', updatedTrucks);
  };

  const isNameUnique = async (name: string): Promise<boolean> => {
    const isUnique = !trucks.some((truck) => truck.name === name);
    return isUnique;
  };

  return (
    <TruckContext.Provider
      value={{ trucks, addTruck, getTruck, updateTruck, isNameUnique }}
    >
      {children}
    </TruckContext.Provider>
  );
};
