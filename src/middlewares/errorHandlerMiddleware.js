import { HttpError } from 'http-errors';

export const errorHandlerMiddleware = (e, req, res, next) => {
    if (e instanceof HttpError) {
    res.status(e.status).json({ status: e.status, message: e.name, data: e,
    });
    return;
  }
    res.status(500).json({ message: 'Something went wrong', error: e.message
    })
}