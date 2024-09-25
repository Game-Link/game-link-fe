import * as React from 'react';
import {List, ListAccordionProps} from 'react-native-paper';

type ListProps = {
  children: React.ReactNode;
} & ListAccordionProps;

export function AccordionSecction({
  children,
  title,
}: React.PropsWithChildren<{title?: string}>) {
  return <List.Section title={title}>{children}</List.Section>;
}
export function Accoridion({title, left, children, style}: ListProps) {
  return (
    <List.Accordion title={title} left={left} style={style}>
      {children}
    </List.Accordion>
  );
}
