interface IVariables {
  [key: string]: string | number;
}

export default interface IMailTemplateProviderDTO {
  file: string;
  variables: IVariables;
}
