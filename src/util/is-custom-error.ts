export type CustomError = {
  code: string;
  message: string[];
  status: string;
  statusCode: number;
  timestamp: string;
  trackingId: string;
};

export function isCustomError(err: unknown): err is CustomError {
  if (err !== null && typeof err === 'object') {
    return 'trackingId' in err;
  }
  return false;
}
