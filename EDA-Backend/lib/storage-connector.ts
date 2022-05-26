import storage from 'azure-storage';
import fs from 'fs';

export const listBlobs = async (containerName) => {
    const storageAccountConnectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
    const blobService = storage.createBlobService(storageAccountConnectionString);

    return new Promise((resolve, reject) => {
        blobService.listBlobsSegmented(containerName, null, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve({ message: `${data.entries.length} blobs in '${containerName}'`, blobs: data.entries });
            }
        });
    });
};

export const getBlobFlie = async (filePath) => {
    
    if (process.env.destination === 'local') {
        return readFromLocalStorage(filePath);
    } else {
        return readFromAzureStorage(filePath);
    }

};

export const readFromAzureStorage = async (filePath) => {
    const storageAccountConnectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
    const blobService = storage.createBlobService(storageAccountConnectionString);
    var blobName = filePath;
    var writable = fs.createWriteStream(process.env.localFileName);
    return new Promise((resolve, reject) => {
         blobService.getBlobToStream(process.env.containerName, blobName, writable, function (error, result) {
            if (error) {
                reject(error);
            } else {
                resolve(readFileFromTemp());
            }
        });
    });
}

export const readFromLocalStorage = async (filePath) => {
    const origin = fs.createReadStream(process.env.local_destination_dir + '/' + filePath, {flags: 'r'});
    const destination = fs.createWriteStream(process.env.localFileName, {flags: 'w+'});    
    var stream =  origin.pipe(destination);

    return new Promise((resolve, reject) => {
        stream.on('finish', function () {
            resolve(readFileFromTemp());
        });
    });
}

export const readFileFromTemp = async() => {
    return new Promise((resolve, reject) => {
        fs.readFile(process.env.localFileName, function(err, data) {
            if(err) {
                reject(err);
            } else {
                resolve(data.buffer);
                fs.unlink(process.env.localFileName, function (err) {
                    if (err) throw err;
                    console.log('File deleted!');
                });
            }
        });
    });
}
