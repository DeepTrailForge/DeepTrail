import { ensureImageContainer } from "@/services/storage"

export async function storeImage(file: File): Promise<string> {
  const container = await ensureImageContainer()
  const blob = container.getBlockBlobClient(file.name)

  if (await blob.exists()) {
    await blob.delete()
  }

  await blob.uploadData(await file.arrayBuffer())
  return blob.url.split("?")[0]
}

export async function removeImage(fileName: string): Promise<void> {
  const container = await ensureImageContainer()
  const blob = container.getBlockBlobClient(fileName)

  if (await blob.exists()) {
    await blob.delete()
  }
}