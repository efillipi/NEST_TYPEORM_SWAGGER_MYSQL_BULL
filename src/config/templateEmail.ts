import { resolve } from 'path';

const emailConfirmation = resolve(
  __dirname,
  '..',
  'shared',
  'views',
  'emailConfirmation.hbs',
);

const forgotPassword = resolve(
  __dirname,
  '..',
  'shared',
  'views',
  'forgotPassword.hbs',
);

const aprovedPartner = resolve(
  __dirname,
  '..',
  'shared',
  'views',
  'aprovedPartner.hbs',
);

const rejectionPartner = resolve(
  __dirname,
  '..',
  'shared',
  'views',
  'rejectionPartner.hbs',
);

const Bad_Request = resolve(
  __dirname,
  '..',
  'shared',
  'views',
  'Bad_Request_bro.png',
);
const ok = resolve(__dirname, '..', 'shared', 'views', 'ok.png');

export {
  emailConfirmation,
  forgotPassword,
  aprovedPartner,
  rejectionPartner,
  ok,
  Bad_Request,
};
