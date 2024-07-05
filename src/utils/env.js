import dotenv from 'dotenv';

dotenv.config();

export const env = (envName, defaultValue) => {
  if (process.env[envName]) return process.env[envName];
  if (defaultValue) return defaultValue;

  throw new Error('Env var is not found');
};

export const generateAuthUrl = (): string =>
  googleOAuthClient.generateAuthUrl({
    scope: [
      '<https://www.googleapis.com/auth/userinfo.email>',
      '<https://www.googleapis.com/auth/userinfo.profile>',
    ],
  });

export const validateCode = async (code: string): Promise<LoginTicket> => {
  const response = await googleOAuthClient.getToken(code);
  if (!response.tokens.id_token) throw createHttpError(401, 'Unauthorized');
  const ticket = await googleOAuthClient.verifyIdToken({
    idToken: response.tokens.id_token,
  });
  return ticket;
};
