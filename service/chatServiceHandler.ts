import "server-only";

import { add, del, find, get, update } from "./base";
import { getChatsContainer } from "../containers";
import { Chat } from "../types/chat";
import { PatchOperationType } from "@azure/cosmos";
import { Message } from "ai";
import { ChainType } from "@/app/_contexts/chain-context";

/**
 * Chat Database Handler
 * Provides utility functions to manage chat entries in the Cosmos DB.
 */

// Create a new chat
export const createChat = async (chat: Chat): Promise<Chat | null> => {
    return add<Chat, Chat>(await getChatsContainer(), chat);
};

// Retrieve a chat by ID and user ID
export const fetchChat = async (id: Chat["id"], userId: Chat["userId"]): Promise<Chat | null> => {
    return get(await getChatsContainer(), id, userId);
};

// Get all chats belonging to a user
export const listUserChats = async (userId: Chat["userId"]): Promise<Chat[]> => {
    return find(
        await getChatsContainer(), 
        "SELECT * FROM c WHERE c.userId = @userId ORDER BY c._ts DESC", 
        [{ name: "@userId", value: userId }]
    );
};

// Modify chat tagline
export const updateChatTag = async (id: Chat["id"], userId: Chat["userId"], tagline: string): Promise<boolean> => {
    return update(
        await getChatsContainer(),
        id,
        userId,
        [{ op: PatchOperationType.set, path: "/tagline", value: tagline }]
    );
};

// Modify chat chain
export const changeChatChain = async (id: Chat["id"], userId: Chat["userId"], chain: Chat["chain"]): Promise<boolean> => {
    return update(
        await getChatsContainer(),
        id,
        userId,
        [{ op: PatchOperationType.set, path: "/chain", value: chain }]
    );
};

// Append a message to an existing chat
export const appendChatMessage = async (id: Chat["id"], userId: Chat["userId"], message: Message): Promise<boolean> => {
    return update(
        await getChatsContainer(),
        id,
        userId,
        [{ op: PatchOperationType.add, path: "/messages/-", value: message }]
    );
};

// Replace all chat messages and optionally chain
export const replaceChatMessages = async (
    id: Chat["id"], 
    userId: Chat["userId"], 
    updates: { messages: Message[], chain?: ChainType }
): Promise<boolean> => {
    const operations = [
        { op: PatchOperationType.set, path: "/messages", value: updates.messages }
    ];

    if (updates.chain) {
        operations.push({ op: PatchOperationType.set, path: "/chain", value: updates.chain });
    }

    return update(await getChatsContainer(), id, userId, operations);
};

// Remove chat from database
export const removeChat = async (id: Chat["id"], userId: Chat["userId"]): Promise<boolean> => {
    return del(await getChatsContainer(), id, userId);
};