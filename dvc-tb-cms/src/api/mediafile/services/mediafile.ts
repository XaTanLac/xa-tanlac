/**
 * mediafile service
 */

export default () => ({
  async uploadUserFilesService (fileArray, id, firstLevelFolder) {
    const uploadService = strapi.plugins.upload.services.upload;
    const folderService = strapi.plugins.upload.services.folder;
  
    let firstLevelFolderBase = await strapi.query('plugin::upload.folder').findOne({where: {name: firstLevelFolder}});
    if (!firstLevelFolderBase) {
      await folderService.create({name: firstLevelFolder})
      firstLevelFolderBase = await strapi.query('plugin::upload.folder').findOne({where: {name: firstLevelFolder}});
    }
  
    let userLevelFolder = await strapi.query('plugin::upload.folder').findOne({where: {name: id, parent: firstLevelFolderBase}});
    if (!userLevelFolder) {
      await folderService.create({name: id, parent: firstLevelFolderBase.id})
      userLevelFolder = await strapi.query('plugin::upload.folder').findOne({where: {name: id, parent: firstLevelFolderBase}});
    }

    const uploadedFiles = await uploadService.upload({
      data: {
        path: `${firstLevelFolder}/${id}`,
        fileInfo: { folder: userLevelFolder.id },
      },
      files: fileArray
    });
  
    return uploadedFiles
  }
});
