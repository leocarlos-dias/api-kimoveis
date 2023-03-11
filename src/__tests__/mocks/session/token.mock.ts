import { sign } from 'jsonwebtoken';

const secretKey = '1234';
process.env.SECRET_KEY = secretKey;

export default {
  genToken: (admin: boolean, id: number) => {
    return sign({ admin }, secretKey, { subject: id.toString() });
  },
  invalidSignature: sign({ admin: true }, 'invalid_signature'),
  jwtMalformed: '12345',
};
