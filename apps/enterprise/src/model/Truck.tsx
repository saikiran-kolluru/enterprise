import Permit from "./Permit";

interface Truck {
    id?: string;
    name: string;
    model: string;
    yearOfRelease: Date;
    brand: string;
    permits: Permit[];
  }
  
  export default Truck;