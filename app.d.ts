export declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_API_URL: string;
      NEXT_PUBLIC_VAPID_PUBLIC_KEY: string;
      VAPID_PRIVATE_KEY: string;
    }
  }
}

export type Category = {
  id: number
  name: string
  thumbnail: boolean
  parent: number
  children: number
  ancestors: Array<number>
  attributes: Array<{
    type: string
    name: string
    description: string
    required: boolean
    label: string
    items: Array<{
      value: string
    }>
  }>
}
