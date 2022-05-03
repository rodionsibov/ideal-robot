import { CoordinateInterface } from "./coordinate-interface";

export interface UserInterface {
  uuid: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  gender: string;
  address: string;
  dateOfBirth: string;
  phone: string;
  imageUrl: string;
  coordinate: CoordinateInterface;
}
