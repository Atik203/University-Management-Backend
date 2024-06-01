import { NextFunction, Request, Response } from 'express';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const validateRequest = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const options = {
      abortEarly: false, // include all errors
      allowUnknown: true, // ignore unknown keys
      stripUnknown: true, // remove unknown keys
    };
    const { error, value } = schema.validate(req.body, options);
    if (error) {
      next(
        `Validation error: ${error.details.map((x) => x.message).join(', ')}`,
      );
    } else {
      req.body = value;
      next();
    }
  };
};
