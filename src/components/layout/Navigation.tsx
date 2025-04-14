import { MenuItem } from '@/app/interfaces/menu';
import getMenu from '@/app/api/menus';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

interface NavigationProps {
    menuId: string;
}

const Navigation: React.FC<NavigationProps> = ({menuId}) => {

    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        async function fetchMenuItems() {
            try {
                setIsLoading(true); // Active le chargement
                const menuData = await getMenu(menuId); // Appel à l'API
                const items: MenuItem[] = menuData;
                setMenuItems(items); // Définit les éléments du menu
            } catch (error) {
                console.error("Error fetching menu:", error);
                setMenuItems([]); // Réinitialise les items en cas d'erreur
            } finally {
                setIsLoading(false); // Désactive le chargement
            }
        }
    
        if (menuId) {
            fetchMenuItems();
        } else {
            console.error("Menu with " + menuId + " not found !");
        }
    }, [menuId]);

    if (isLoading) {
        return <p></p>;
    }

    return(
        <>
            <nav>
                <ul>
                    {menuItems?.length > 0 ? menuItems.map((item) => (
                        <li key={item.id}>
                            {item.path ? (
                                <Link href={item.path}>
                                    {item.title}
                                </Link>
                            ) : (
                                <span>{item.title}</span>
                            )}

                            {item.items.length > 0 && (
                                <ul>
                                    {item.items.map((subItem) => (
                                        <li key={subItem.id}>
                                            {subItem.path ? (
                                                <Link href={subItem.path}>
                                                    {subItem.title}
                                                </Link>
                                            ) : (
                                                <span>{subItem.title}</span>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    )) : <></>}
                </ul>
            </nav>
        </>
    );
}

export default Navigation;