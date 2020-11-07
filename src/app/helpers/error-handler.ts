interface Error {
  message?: string;
  type?: string;
  path?: string;
}

export interface ErrorResponse {
  message: string;
  status: number;
  errors: Error[];
}

export default (
  message: string = 'Internal Server Error',
  status: number = 500,
  tracer: Error[] = []
): ErrorResponse => {
  const errors = tracer.map((error: Error) => {
    return { path: error.path, message: error.message, type: error.type };
  });

  return { message, status, errors };
};
