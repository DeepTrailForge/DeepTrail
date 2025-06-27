import { BlobServiceClient } from "@azure/storage-blob"

const azureBlobUrl = \`\${process.env.NEXT_PUBLIC_STORAGE_URL}?sv=\${process.env.NEXT_PUBLIC_STORAGE_SAS}\`

const azureBlobClient = new BlobServiceClient(azureBlobUrl)

export default azureBlobClient