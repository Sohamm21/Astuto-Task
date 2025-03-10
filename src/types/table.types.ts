export type Person = {
  img_url: string;
  name: string;
  username: string;
  age: number;
  status: "Working" | "Not working";
  role: string;
  email: string;
  teams: string[];
};