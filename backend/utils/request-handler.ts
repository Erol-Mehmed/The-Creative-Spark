import { Request, Response } from 'express';

const requestHandler = async (promise: Promise<[]>) => {
  return async (req: Request, res: Response) => {
    try {
      const data = await promise;
      res.send(data);
    } catch (err) {
      res.status(500).send(err);
    }
  };
};

export default requestHandler;
