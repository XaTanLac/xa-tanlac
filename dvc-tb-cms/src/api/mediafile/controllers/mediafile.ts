/**
 * A set of functions called "actions" for `mediafile`
 */

import mime from 'mime-types';
import MediaService from '../services/mediafile';

export default {
  upload: async (ctx, next) => {
    try {
      const { id, first_level } = ctx.query
      const { file } = ctx.request.files

      const uploadFiles = file?.length ? file : [file]

      uploadFiles.forEach(file => {
        file.mimetype = mime.lookup(file.originalFilename) || 'application/octet-stream'
        file.type = mime.lookup(file.originalFilename) || 'application/octet-stream'
      });

      if (uploadFiles) {
        const service = MediaService()
        const uploadedFile = await service.uploadUserFilesService(uploadFiles, id, first_level)
        return ctx.send({ error: 0, data: uploadedFile }, 200);
        
      } else {
        return ctx.send({ error: -1, errorMsg: 'There is no file uploaded' }, 400);
      }
    } catch (error) {
      console.error(error);
      return ctx.send({ error: -1, errorMsg: 'Error uploading files' }, 500);
    }
  }
};
