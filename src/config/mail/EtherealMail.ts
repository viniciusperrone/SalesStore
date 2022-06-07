import nodemailer from 'nodemailer';
import { HandlebarsMailTemplate } from './HandlebarsMailTemplate';

interface IEmailContact {
  name: string;
  email: string;
}
interface ITemplateVariable {
  [key: string]: string | number;
}
interface IParseMailTemplate {
  template: string;
  variables: ITemplateVariable;
}
interface ISendMail {
  to: IEmailContact;
  from?: IEmailContact;
  subject: string;
  templateData: IParseMailTemplate;
}

class EtherealMail {
  static async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMail): Promise<void> {
    const account = await nodemailer.createTestAccount();

    const handlebarsMailTemplate = new HandlebarsMailTemplate();

    const transport = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });

    const message = await transport.sendMail({
      from: {
        name: from?.name || 'Sales Store Team',
        address: from?.email || 'salesstore@api.com',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject: subject,
      html: await handlebarsMailTemplate.parse(templateData),
    });

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}

export { EtherealMail };
