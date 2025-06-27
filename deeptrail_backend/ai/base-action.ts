import { z } from "zod"

export type GenericSchema = z.ZodObject<z.ZodRawShape>

export type ActionResponse<TData> = {
  notice: string
  data?: TData
}

export type ActionCore<
  TSchema extends GenericSchema,
  TResult,
  TCtx = unknown
> = {
  id: string
  summary: string
  input: TSchema
  execute:
    | ((payload: z.infer<TSchema>, ctx?: TCtx) => Promise<ActionResponse<TResult>>)
    | ((ctx: TCtx, payload: z.infer<TSchema>) => Promise<ActionResponse<TResult>>)
}

export type AnyAction = ActionCore<GenericSchema, unknown, unknown>