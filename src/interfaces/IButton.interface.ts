declare type ButtonType = 'skip' | 'done' | 'next' | 'prev';
export interface IButton {
  type: ButtonType;
  label?: string;
}
