export interface PopUpProps {
  description: string;
  setConfirmationModal: (key: boolean) => void;
  confirmationFunction:()=>void | MouseEventHandler<HTMLButtonElement>;
}
