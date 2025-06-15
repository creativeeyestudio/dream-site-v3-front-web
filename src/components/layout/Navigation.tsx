import getMenu from "@/api/menus";
import { MenuItem } from "@/interfaces/menu";
import Link from "next/link";
import React from "react";

interface NavigationProps {
  menuId: string;
  locale: string;
  classes?: string;
}

const Navigation = async ({ menuId, locale, classes }: NavigationProps) => {
  const menu = await getMenu(menuId, locale);

  if (!menu) return null;

  const renderLink = (item: MenuItem) => {
    let href: string;
    let label: string;

    switch(true) {
      case !!item.page:
        href = `/${locale}/${item.page?.slug}`;
        label = item.page?.title ?? ''
        break;
      default:
        href = item.url ?? '';
        label = item.label ?? ''
        break;
    }

    return item.type === 'external' ? (
      <a href={href} target="_blank" rel="noopener noreferrer" title={label}>
        {label}
      </a>
    ) : (
      <Link href={href}>
        {label}
      </Link>
    );
  };

  return (
    <ul className={classes}>
      {menu.map((item: MenuItem) => {
        return (
          <li key={item.id}>
            {renderLink(item)}

            {item.children?.length > 0 && (
              <ul>
                {item.children!.map((subItem) => (
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
