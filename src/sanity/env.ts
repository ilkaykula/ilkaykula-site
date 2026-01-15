/* src/sanity/env.ts */

function readEnv(key: string): string | undefined {
  // Vite / Sanity Studio (npx sanity dev)
  if (typeof import.meta !== 'undefined' && (import.meta as any).env) {
    const v = (import.meta as any).env[key]
    if (v) return String(v)
  }

  // Next.js / Node (npm run dev)
  if (typeof process !== 'undefined' && process.env) {
    const v = process.env[key]
    if (v) return String(v)
  }

  return undefined
}

function assertValue(value: string | undefined, key: string): string {
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`)
  }
  return value
}

// 👇 BURASI DÜZELTİLDİ
export const projectId = assertValue(
  readEnv('VITE_SANITY_PROJECT_ID') ??
    readEnv('NEXT_PUBLIC_SANITY_PROJECT_ID'),
  'VITE_SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_PROJECT_ID'
)

export const dataset = assertValue(
  readEnv('VITE_SANITY_DATASET') ??
    readEnv('NEXT_PUBLIC_SANITY_DATASET'),
  'VITE_SANITY_DATASET or NEXT_PUBLIC_SANITY_DATASET'
)

export const apiVersion =
  readEnv('VITE_SANITY_API_VERSION') ??
  readEnv('NEXT_PUBLIC_SANITY_API_VERSION') ??
  '2024-01-01'
