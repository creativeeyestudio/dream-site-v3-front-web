import { MenuItem } from '@/interfaces/menu';
import getMenu from '@/api/menus';
import React, { useEffect, useState } from 'react';

interface NavigationProps {
    menuId: string
    images: boolean
}

function buildMenuTree(menuItems: MenuItem[]): MenuItem[] {
    const itemMap = new Map<number, MenuItem>()
    const roots: MenuItem[] = []

    menuItems.forEach(item => {
        item.items = [];
        itemMap.set(item.id, item);
    })

    menuItems.forEach(item => {
        if (item.parent?.id) {
            const parent = itemMap.get(item.parent.id);
            if (parent) {
                parent.items?.push(item);
            }
        } else {
            roots.push(item);
        }
    });

    return roots;
}

const Navigation: React.FC<NavigationProps> = ({ menuId, images }) => {
    const [menuItems, setMenusItems] = useState<MenuItem[]>([]);

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const data = await getMenu(menuId);
                const tree = buildMenuTree(data as MenuItem[]);
                setMenusItems(tree);
            } catch (error) {
                console.error("Erreur lors du chargement du menu", error);                
            }
        }

        fetchMenu()
    }, [menuId])


    const renderMenu = (items: MenuItem[] | undefined) => (
        <ul>
            {items?.map((item) => (
                <li key={item.id}>
                    {item.items && item.items.length > 0 ? (
                    <>
                        <span className="sub-menu-title">{item.title}</span>
                        {renderMenu(item.items)}
                    </>
                    ) : (
                    <>
                        {item.type === "INTERNAL" ? (
                           <a href={`/${item.related?.page.slug || ""}`}>{item.title}</a>
                        ) : (
                            <a href={item.externalPath || "#"} target="_blank" rel="noopener noreferrer">
                                {item.title}
                            </a>
                        )}
                    </>
                    )}
                </li>
            ))}
        </ul>
    );
  
    return images 
        ? <nav>{renderMenu(menuItems)}</nav> 
        : <>
            <nav>{renderMenu(menuItems)}</nav>
            <div className='nav-images'></div>
        </>;
};
  

export default Navigation;
  