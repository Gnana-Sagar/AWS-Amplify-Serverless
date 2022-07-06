import { Storage } from "aws-amplify";

export const publishImage= async(name, file, type) => {
    return await Storage.put(name, file,type);
}

export const getImg = async(id) => {
    return await Storage.get(id);
}

export const uploadImage = async(file, fileSource, uuid) => {
    let fileName =  uuid + '/'+fileSource+'/' + file.name.replace(/[^a-zA-Z0-9.]/g, '_');
    let type = file.endsWith('svg') ? 'image/svg+xml' : 'application/octet-stream'
   return await Storage.put(fileSource + "/" + fileName, file, { contentType: type })
}

export const deleteImage = async(id) => {
    return await Storage.remove(id);
}