import getMenu from "@/api/menus";
import { MenuItem } from "@/interfaces/menu";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface NavigationProps {
  menuId?: string | null;
  locale: string;
  classes?: string;
}

const Navigation = async ({
  menuId,
  locale,
  classes,
}: NavigationProps) => {
  if (!menuId) return null;

  const { items } = await getMenu(menuId, locale);

  function LinkOrAnchor({ item }: { item: MenuItem }) {
    const href = item.page ? `/${locale}/${item.page.slug}` : item.url ?? "#";
    const label = item.page?.title ?? item.label ?? "";
    return item.type === "external" ? (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {label}
      </a>
    ) : (
      <Link href={href}>{label}</Link>
    );
  }

  const renderItems = (nodes: MenuItem[]) => (
    <ul>
      {nodes.map((node) => (
        <li key={node.id}>
          <LinkOrAnchor item={node} />
          {node.children?.length ? renderItems(node.children) : null}
        </li>
      ))}
    </ul>
  );

  const renderImages = (nodes: MenuItem[]) => {
    const images = nodes
      .filter((item) => item.image?.url)
      .map((item) => (
        <div
          key={item.id}
          className="relative w-64 h-40 mb-4 overflow-hidden rounded-md shadow"
        >
          <Image
            src={item.image!.url}
            alt={item.image!.alt ?? ""}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
        </div>
      ));

    return images.length ? <div className="mt-4">{images}</div> : null;
  };

  return (
    <>
      <nav className={classes}>{renderItems(items)}</nav>
      <div>{renderImages(items)}</div>
    </>
  );
};

export default Navigation;
