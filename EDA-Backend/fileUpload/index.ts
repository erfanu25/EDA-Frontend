import { AzureFunction, Context, HttpRequest } from "@azure/functions"
const azure = require('azure-storage');
const streamifier = require('streamifier');
const multipart = require('parse-multipart');
const { BlobServiceClient } = require("@azure/storage-blob");
const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    var bodyBuffer = Buffer.from(req.body);
    var boundary = multipart.getBoundary(req.headers['content-type']);
    var parts = multipart.Parse(bodyBuffer, boundary);
    var filedata = parts[0].data;         // Image buffer data
    var filename = parts[0].filename;     // testImage.png
    console.log("parts[0].data");
    console.log(parts[0].data);
    console.log("parts[0].filename");
    console.log(parts[0].filename);
    const accountname ="eymax";
    const key = "lHstQLqp+88xbnfGh36Pfhoq21ekRHgfNZHkZ4AsGkuhF3DO9TcYsj0dV9T8S6VCocXuFpZZiL6++AStDpkI8g==";
    const containerName="max";
    console.log("Azure Blob storage v12 - JavaScript quickstart sample");

  // <snippet_CreateContainer>
  // Create the BlobServiceClient object which will be used to create a container client
  const blobServiceClient = BlobServiceClient.fromConnectionString(
            "DefaultEndpointsProtocol=https;AccountName=eymax;AccountKey=lHstQLqp+88xbnfGh36Pfhoq21ekRHgfNZHkZ4AsGkuhF3DO9TcYsj0dV9T8S6VCocXuFpZZiL6++AStDpkI8g==;EndpointSuffix=core.windows.net"
    );

  // Create a unique name for the container
 // const containerName = "quickstart" + uuidv1();

  console.log("\nCreating container...");
  console.log("\t", containerName);

  // Get a reference to a container
  const containerClient = blobServiceClient.getContainerClient(containerName);
  // Create the container
//   const createContainerResponse = await containerClient.create();
//   console.log(
//     "Container was created successfully. requestId: ",
//     createContainerResponse.requestId
//   );
  // </snippet_CreateContainer>

  // <snippet_UploadBlobs>
  // Create a unique name for the blob
  const blobName = filename + ".jpg";

  // Get a block blob client
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  console.log("\nUploading to Azure storage as blob:\n\t", blobName);

  // Upload data to the blob
  const data = "Hello, World!";
  const uploadBlobResponse = await blockBlobClient.upload(filedata, filedata.length);
  console.log(
    "Blob was uploaded successfully. requestId: ",
    uploadBlobResponse.requestId
  );
  // </snippet_UploadBlobs>

  // <snippet_ListBlobs>
  console.log("\nListing blobs...");

  // List the blob(s) in the container.
  for await (const blob of containerClient.listBlobsFlat()) {
    console.log("\t", blob.name);
  }
//     const blobClient  = azure.createBlobService(accountname,key);
//    var options = {
//       contentSettings:{contentType: parts[0].type}
//     };
//    await blobClient.createBlockBlobFromStream(containerName,filename,streamifier.createReadStream(new Buffer(filedata)), filedata.length,options,async function(err,result){
//       if (!err) {
//           console.log("Image upload successful", result);
//       } else{
//         throw err;
//       }
//     });
    // setTimeout(function() {
        
    //         var process = speedSummary.getCompletePercent();
    //         console.log("log progress status : " + process)
        
    // }, 200);
    // speedSummary.on('progress', function () {
    //     var process = speedSummary.getCompletePercent();
    //     console.log("test progresss: " + process);
    // });
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: "done"
    };

};

export default httpTrigger;