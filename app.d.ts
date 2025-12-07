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
