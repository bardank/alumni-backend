import { ReadStream } from 'fs';
// import { Stream } from 'stream';

export interface FileUpload {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: () => ReadStream;
}
