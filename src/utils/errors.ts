export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
  }
}

export function handleError(error: unknown): { status: number; message: string } {
  if (error instanceof ValidationError) {
    return { status: 400, message: error.message };
  }
  
  if (error instanceof NotFoundError) {
    return { status: 404, message: error.message };
  }

  if (error instanceof Error) {
    return { status: 500, message: error.message };
  }

  return { status: 500, message: 'An unknown error occurred' };
}
