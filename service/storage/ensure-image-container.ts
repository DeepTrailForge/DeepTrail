import azureBlobClient from "./blob-client"

export async function ensureImageContainer() {
  const container = azureBlobClient.getContainerClient("images")
  await container.createIfNotExists({ access: "blob" })
  return container
}