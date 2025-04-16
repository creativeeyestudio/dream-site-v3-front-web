import { MenuItem } from '@/app/interfaces/menu';
import getMenu from '@/app/api/menus';
import React from 'react';
import { GetStaticProps } from 'next';

function buildMenuTree(menuItems: MenuItem[]): MenuItem[] {
    const itemMap = new Map<number, MenuItem>()
    const roots: MenuItem[] = []

    menuItems.forEach(item => {
        item.items = [];
        itemMap.set(item.id, item);
    })

    menuItems.forEach(item => {
        if (item.parent && item.parent.id) {
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

const Navigation: React.FC<{ menuItems: MenuItem[] }> = ({ menuItems }) => {
    const renderMenu = (items: MenuItem[]) => (
        <ul>
            {items.map((item) => (
                <li key={item.id}>
                    {item.type === 'INTERNAL' ? (
                        <a href={`/${item.related?.slug || ''}`}>{item.title}</a>
                    ) : (
                        <a href={item.externalPath || '#'} target="_blank" rel="noopener noreferrer">
                            {item.title}
                        </a>
                    )}
                    {item.items && item.items.length > 0 && renderMenu(item.items)}
                </li>
            ))}
        </ul>
    );
  
    return <nav>{renderMenu(menuItems)}</nav>;
};
  

export default Navigation;

export const getStaticProps: GetStaticProps = async () => {
    try {
        const data = await getMenu('main-navigation');
        const tree = buildMenuTree(data as MenuItem[]);
        return { props: { menuItems: tree } };
    } catch (e) {
        console.error(e);
        return { props: { menuItems: [] } };
    }
};
  