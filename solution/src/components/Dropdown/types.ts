export interface DropdownProps {
  list: Option[];
  visible: boolean;
  style?: React.CSSProperties;
  onSelected: (item: Option) => void;
  onClosed: () => void;
}

export type Option = {
  value: any;
  label: string;
}; // Assuming Icon is now a React component
