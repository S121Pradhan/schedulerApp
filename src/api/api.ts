type API_STATUS_SUCCESS = 200 | 201 | 204;
export type API_STATUS_ERROR = 400 | 403 | 404 | 405 | 500;

export function buildAPISuccessResult(
  status: API_STATUS_SUCCESS,
  resultObject: any | null
): APIResult {
  // eslint-disable-line @typescript-eslint/no-explicit-any
  return {
    status,
    result: resultObject,
  };
}

export function buildAPIErrorResult(
  status: API_STATUS_ERROR,
  error: string
): APIResult {
  // eslint-disable-line @typescript-eslint/no-explicit-any
  return {
    status,
    result: null,
    error,
  };
}

export interface APIResult {
  status: number;
  result: any | undefined | null; // eslint-disable-line @typescript-eslint/no-explicit-any
  error?: string;
  nextCursor?: string;
  count?: number;
}

export interface APIRawContent {
  content: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  contentType: string;
  nextCursor?: string;
}
