export class Usuario {
  constructor(
    public id: number,
    public login: string,
    public email: string,
    public password: string,
    public profile: string
  ) {}
}
