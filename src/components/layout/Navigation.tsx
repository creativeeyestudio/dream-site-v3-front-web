import getMenu from '@/api/menus';
import { MenuItem } from '@/interfaces/menu';
import { headers } from 'next/headers';
import Link from 'next/link';
import React from 'react';

interface NavigationProps {
    menuId: string
    images: boolean
    classes: string | undefined
}

const Navigation = async ({ menuId }: NavigationProps) => {
    const headersList = await headers();
    const acceptLanguage = headersList.get('accept-language'); // ex: "fr-FR,fr;q=0.9,en;q=0.8"
    const browserLocale = acceptLanguage?.split(',')[0]?.split('-')[0] || 'en';
    
    const menu = await getMenu(menuId);

    const renderLink = (item: MenuItem) => {
        const isExternal = item.additionalFields.external;
        const isExternalType = item.type === 'EXTERNAL';
        const href = isExternalType ? item.path : `/${browserLocale}${item.path}`;
        const target = isExternal ? '_blank' : undefined;
        const rel = isExternal ? 'noopener noreferrer' : undefined;

        return isExternalType ? (
            <a href={href} target={target} rel={rel}>
                {item.title}
            </a>
        ) : (
            <Link href={{ pathname: href }} target={target} rel={rel}>
                {item.title}
            </Link>
        );
    };

    
return (
  <ul>
    {menu.map((item: MenuItem) => {
        const hasChildren = item.items && item.items.length > 0;

        return (
            <li key={item.id}>
                {renderLink(item)}

                {hasChildren && (
                    <ul>
                    {item.items!.map((subItem) => (
                        <li key={subItem.id}>{renderLink(subItem)}</li>
                    ))}
                    </ul>
                )}
            </li>
        );
    })}
  </ul>
);

};
  
export default Navigation;

// function buildMenuTree(menuItems: MenuItem[]): MenuItem[] {
//     const itemMap = new Map<number, MenuItem>()
//     const roots: MenuItem[] = []

//     menuItems.forEach(item => {
//         item.items = [];
//         itemMap.set(item.id, item);
//     })

//     menuItems.forEach(item => {
//         if (item.parent?.id) {
//             const parent = itemMap.get(item.parent.id);
//             if (parent) parent.items?.push(item);
//         } else {
//             roots.push(item);
//         }
//     });

//     return roots;
// }

// const Navigation: React.FC<NavigationProps> = ({ menuId, images, classes = undefined }) => {
//     const [menuItems, setMenusItems] = useState<MenuItem[]>([]);

//     useEffect(() => {
//         const fetchMenu = async () => {
//             try {
//                 const data = await getMenu(menuId);
//                 const tree = buildMenuTree(data as MenuItem[]);
//                 setMenusItems(tree);
//             } catch (error) {
//                 console.error("Erreur lors du chargement du menu", error);                
//             }
//         }

//         fetchMenu()
//     }, [menuId])


//     const renderMenu = (items: MenuItem[] | undefined) => (
//         <ul>
//             {items?.map((item) => (
//                 <li key={item.id}>
//                     {item.items && item.items.length > 0 ? (
//                     <>
//                         <span className="sub-menu-title">{item.title}</span>
//                         {renderMenu(item.items)}
//                     </>
//                     ) : (
//                     <>
//                         {item.type === "INTERNAL" ? (
//                            <a href={`/${item.related?.page.slug || ""}`}>{item.title}</a>
//                         ) : (
//                             <a href={item.externalPath || "#"} target="_blank" rel="noopener noreferrer">
//                                 {item.title}
//                             </a>
//                         )}
//                     </>
//                     )}
//                 </li>
//             ))}
//         </ul>
//     );
  
//     return images 
//         ? <nav className={classes}>{renderMenu(menuItems)}</nav> 
//         : <>
//             <nav className={classes}>{renderMenu(menuItems)}</nav>
//             <div className='nav-images'></div>
//         </>;
// };
  