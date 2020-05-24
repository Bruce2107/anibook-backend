export type TypeImage = {
  folder: string;
  name: string;
  contentType: string;
  image: Buffer;
};

export type FileMulter = {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
  buffer: Buffer;
};
