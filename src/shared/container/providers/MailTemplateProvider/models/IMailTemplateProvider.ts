import IParsemailTemplateDTO from '../dtos/IParseMailTemplateDTO';

export default interface IMailTemplateProvider {
  parse(data: IParsemailTemplateDTO): Promise<string>;
}
