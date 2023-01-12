import {Role} from "./Role";

export interface Jwt {
  sub: string
  roles: Role[]
  iss: string
  exp: number
}
