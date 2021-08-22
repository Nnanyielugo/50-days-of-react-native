export interface Profile {
  id: string;
  name: string;
  age: number;
  gender: Gender;
  hobbies: string[];
  image: string;
}

export enum Gender {
  Male = 'Male',
  Female = 'Female',
  Other = 'Other',
}
