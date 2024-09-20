import { IGenericErrorMessage } from './error';

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
  //errorMessages er type agei globalErroHandelar a bola cilo so eitai use korte hbe
};
