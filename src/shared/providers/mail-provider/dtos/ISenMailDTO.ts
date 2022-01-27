import IParseMailTemplateDTO from '../../mail-template-provider/dtos/IParseMailTemplateDTO';
interface IMailContact {
  name: string;
  email: string;
}

export default interface ISenMailDTO {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  templateData: IParseMailTemplateDTO;
}
