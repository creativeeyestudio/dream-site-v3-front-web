import PageProps from "./page"

export interface MenuItem {
    id: number
    title: string
    type: 'INTERNAL' | 'EXTERNAL'
    path: string
    externalPath: string
    order: number
    related: PageProps
    parent: MenuItem
    items?: MenuItem[]
}