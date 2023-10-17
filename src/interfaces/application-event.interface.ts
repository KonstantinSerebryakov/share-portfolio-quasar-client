import { EVENT_APPLICATION } from 'src/boot/event-bus';

export interface IEventPayloadLoginSuccess {
  email: string;
  token: string;
}

export interface IEventPayloadRegisterSuccess {
  email: string;
}
