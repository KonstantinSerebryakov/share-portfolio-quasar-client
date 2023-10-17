import { eventBus, EVENT_APPLICATION } from 'src/boot/event-bus';
import { IEventPayloadLoginSuccess } from 'src/interfaces/application-event.interface';
const JWT_NAME = 'JWT';

export interface payloadJWT {
  access_token: string;
  exp: number;
}

function parseJwt(token: string) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(atob(base64));
}

export function setJWT(token: string): void {
  const parsedJWT = parseJwt(token);
  const payload: payloadJWT = {
    access_token: token,
    exp: parsedJWT.exp,
  };
  localStorage.setItem(JWT_NAME, JSON.stringify(payload));
}

export function getJWT(): payloadJWT | null {
  const jwt = localStorage.getItem(JWT_NAME);
  return jwt ? JSON.parse(jwt) : null;
}

export function removeJWT(): void {
  localStorage.removeItem(JWT_NAME);
}

export function validateJWT() {
  const jwt = getJWT();
  return jwt !== null;
}

eventBus.on(EVENT_APPLICATION.LOGIN_SUCCESS, (data) => {
  const payload = data as IEventPayloadLoginSuccess;
  const token = payload.token;
  setJWT(token);
});
eventBus.on(EVENT_APPLICATION.LOGOUT_SUCCESS, () => {
  removeJWT();
});
