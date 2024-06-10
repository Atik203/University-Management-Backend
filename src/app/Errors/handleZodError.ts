import { ZodError, ZodIssue } from 'zod';
import { TErrorSource } from '../interface/error';

const handleZodError = (error: ZodError) => {
  const statusCode = 400;
  const message = 'Validation Error';
  const errorSources: TErrorSource = error.issues.map((issue: ZodIssue) => {
    return {
      path: issue.path[issue.path.length - 1],
      message: issue.message,
    };
  });

  return {
    statusCode,
    message,
    errorSources,
  };
};

export default handleZodError;
