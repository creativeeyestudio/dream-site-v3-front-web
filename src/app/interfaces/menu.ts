export interface Menu {
    menuItems: MenuItem[]
}

export interface MenuItem {
    id: number
    title: string
    menuAttached: boolean
    order: number
    path: string
    type: string
    uiRouterKey: string
    slug: string
    external: boolean
    items: MenuItem[]
    nav_image: MenuItemImage | null
}

interface MenuItemImage {
    name: string
    url: string
    mime: string
    width: number
    height: number
    previewUrl: string | null
}