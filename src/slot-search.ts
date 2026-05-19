import http from 'k6/http';
import { config } from './config';

export function searchSlots(): void {
    const res = http.get(`${config.baseUrl}/api/v1/slots/search?clinic_id=1&service_id=820`);
    console.log(res.json());
}