import { v4 } from "uuid";

export function generateUsername(): string {
  const id = v4().slice(0, 10);
  return `User_${id}`;
}
