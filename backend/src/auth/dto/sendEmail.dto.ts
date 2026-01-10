import { Address } from "@nestjs-modules/mailer/dist/interfaces/send-mail-options.interface";

export class SendEmailDto {
  from?: string | Address;
  to: string[] | Address[];
  subject: string;
  name: string;
  link: string;
}
