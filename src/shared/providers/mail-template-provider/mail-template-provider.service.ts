import { Injectable } from '@nestjs/common';
import { promises } from 'fs';
import { compile } from 'handlebars';
import IParseMailTemplateDTO from './dtos/IParseMailTemplateDTO';

@Injectable()
export class MailTemplateProviderService {
  public async parse({
    file,
    variables,
  }: IParseMailTemplateDTO): Promise<string> {
    const templateFileContent = await promises.readFile(file, {
      encoding: 'utf-8',
    });

    const parseTemplate = compile(templateFileContent);
    return parseTemplate(variables);
  }
}
