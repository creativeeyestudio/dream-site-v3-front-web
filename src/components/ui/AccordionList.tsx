import { Accordion, AccordionItem, SelectionMode } from "@heroui/react";

export interface AccordionListProps {
  items: unknown[];
}

export default function AccordionList(
    { items }: AccordionListProps, 
    multiple: SelectionMode = 'none'
) {
  return (
    <Accordion selectionMode={ multiple }>
      {items.map((item: unknown, index: number) => (
        <AccordionItem 
            key={index} 
            aria-label="" 
            title=""
            subtitle=""></AccordionItem>
      ))}
    </Accordion>
  );
}