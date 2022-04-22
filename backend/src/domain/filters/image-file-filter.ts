import { ExpressRequestContract } from '../../auth/interfaces/express-request-contract';

export const imageFileFilter = (
  req: ExpressRequestContract,
  file: {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    size: number;
    destination: string;
    filename: string;
    path: string;
    buffer: Buffer;
  },
  callback: (error: Error | null, acceptFile: boolean) => void,
) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|svg)$/)) {
    req.fileValidationError = 'Only image files are allowed!';
    return callback(null, false);
  }
  callback(null, true);
};
