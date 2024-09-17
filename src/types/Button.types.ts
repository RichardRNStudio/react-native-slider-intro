export enum ButtonType {
  Skip = 'skip',
  Done = 'done',
  Next = 'next',
  Prev = 'prev',
}
export interface ButtonProps {
  type: ButtonType;
  label?: string;
}
