export interface Filter {
  id: number
  name: string
  path: string
  isOpen?: boolean
  filters?: Filter[]
}
