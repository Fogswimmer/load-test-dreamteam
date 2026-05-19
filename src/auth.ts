import http from 'k6/http';
import { config } from './config';


function generatePhone(): string {
    const random = Math.floor(Math.random() * 1000000);

    return `+7999${String(random).padStart(6, '0')}`;
}

function sendOtp(phone: string): string {
    const response = http.post(
        `${config.baseUrl}/api/v1/auth/send-otp`,
        JSON.stringify({
            "phone": "+79999999999",
            "test": true
        }),
    );

    console.log(response.json());

    return response.json('data.debug_code') as string;
}

function verifyOTP(otp: string, phone: string): string {
    const response = http.post(
        `${config.baseUrl}/api/v1/auth/verify-code`,
        JSON.stringify({
            "phone": "+79999999999",
            "code": otp,
        }),
    );

    return response.json('token.access_token') as string;
}


function setup() {
    const phone = generatePhone();

    const otp = sendOtp(phone);

    const token = verifyOTP(phone, otp);

    return { token };
}

export default function () {
    const data = setup();

    http.get(
        `${config.baseUrl}/api/v1/profile`,
        {
            headers: {
                Authorization: `Bearer ${data.token}`,
            },
        }
    );
}