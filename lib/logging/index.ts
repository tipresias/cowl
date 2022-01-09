import Rollbar from 'rollbar';

const rollbar = new Rollbar({
  accessToken: '835ffffd575e46afbfb0dfeb1c6141cb',
  captureUncaught: true,
  captureUnhandledRejections: true,
  enabled: process.env.NODE_ENV === 'production',
});


export const isError = (maybeError: any): maybeError is Error =>
  !!maybeError.name && !!maybeError.message;

// eslint-disable-next-line import/prefer-default-export
export const log = {
  error: (error: Error) => {
    if (process.env.NODE_ENV !== 'test') console.error(error);
    rollbar.error(error);
  },
  warning: (warning: string) => {
    if (process.env.NODE_ENV !== 'test') console.warn(warning);
    rollbar.warning(warning);
  },
  info: (message: string) => console.log(message),
};
