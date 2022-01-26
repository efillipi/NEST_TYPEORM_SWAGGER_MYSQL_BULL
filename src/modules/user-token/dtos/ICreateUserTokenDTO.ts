export default interface ICreateUserTokenDTO {
  id_user: number;
  type: string;
  tokenGenerate?: boolean;
  active?: boolean;
}
