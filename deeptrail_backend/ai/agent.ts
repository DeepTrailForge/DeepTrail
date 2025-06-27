import { Toolset } from "ai"

export type AssistantProfile = {
  label: string
  id: string
  promptBase: string
  features: string
  extensions: Record<string, Toolset>
}