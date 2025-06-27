import "server-only"

import { add, del, find, get, update } from "./base"
import { getKnowledgeContainer } from "../containers"
import { Knowledge, KnowledgeInput } from "../types"
import { PatchOperationType } from "@azure/cosmos"

/**
 * Adds new knowledge data into the database.
 */
export const createKnowledgeEntry = async (data: KnowledgeInput): Promise<Knowledge | null> => {
    return add<KnowledgeInput, Knowledge>(await getKnowledgeContainer(), data)
}

/**
 * Retrieves a specific knowledge item by ID and base URL.
 */
export const fetchKnowledgeById = async (id: string, baseUrl: string): Promise<Knowledge | null> => {
    return get(await getKnowledgeContainer(), id, baseUrl)
}

/**
 * Lists all knowledge items associated with a given base URL.
 */
export const listKnowledgeByBase = async (baseUrl: string): Promise<Knowledge[]> => {
    return find(
        await getKnowledgeContainer(),
        "SELECT * FROM c WHERE c.baseUrl = @baseUrl",
        [{ name: "@baseUrl", value: baseUrl }]
    )
}

/**
 * Runs vector search to find top relevant entries to a query embedding.
 */
export const searchRelevantKnowledge = async (query: number[]): Promise<(Knowledge & { distance: number })[]> => {
    return find(
        await getKnowledgeContainer(),
        `SELECT TOP 10 c.id, c.summary, c.markdown, c.name, c.baseUrl, c.title, c.description, c.favicon, c.url,
         VectorDistance(c.summaryEmbedding, @query) AS distance
         FROM c 
         WHERE VectorDistance(c.summaryEmbedding, @query) > 0.65
         ORDER BY VectorDistance(c.summaryEmbedding, @query)`,
        [{ name: "@query", value: query }]
    )
}

/**
 * Lists all knowledge records tied to a specific URL.
 */
export const listKnowledgeByUrl = async (url: string): Promise<Knowledge[]> => {
    return find(
        await getKnowledgeContainer(),
        "SELECT * FROM c WHERE c.url = @url",
        [{ name: "@url", value: url }]
    )
}

/**
 * Updates the markdown content and embedding of a knowledge item.
 */
export const updateKnowledgeContent = async (
    id: string,
    baseUrl: string,
    markdown: string,
    embedding: number[]
): Promise<boolean> => {
    return update(
        await getKnowledgeContainer(),
        id,
        baseUrl,
        [
            { op: PatchOperationType.set, path: "/markdown", value: markdown },
            { op: PatchOperationType.set, path: "/markdownEmbedding", value: embedding }
        ]
    )
}

/**
 * Deletes a knowledge document by ID and base URL.
 */
export const removeKnowledgeEntry = async (id: string, baseUrl: string): Promise<boolean> => {
    return del(await getKnowledgeContainer(), id, baseUrl)
}