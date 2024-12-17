// utils/recaptcha.utils.ts
import { HttpException, HttpStatus } from '@nestjs/common';

export async function verifyRecaptcha(token: string): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET;
  const url = `https://www.google.com/recaptcha/api/siteverify`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      secret: secretKey,
      response: token,
    }),
  });

  if (!response.ok) {
    throw new HttpException(
      'Error verifying reCAPTCHA',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  const data = await response.json();

  if (!data.success) {
    throw new HttpException('Invalid reCAPTCHA', HttpStatus.BAD_REQUEST);
  }

  return true;
}
