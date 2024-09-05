// debounce.ts

import { toast } from 'react-toastify';

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// export default function debounce<T extends (...args: any[]) => void>(
//   func: T,
//   wait: number
// ): T {
//   let timeout: ReturnType<typeof setTimeout>;
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   return function (this: any, ...args: Parameters<T>) {
//     clearTimeout(timeout);
//     timeout = setTimeout(() => func.apply(this, args), wait);
//   } as T;
// }

export const toastWarning = (message: string, theme: string) =>
  toast.warn(message, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme,
  });

export const toastSuccess = (message: string, theme: string) => {
  toast.success(message, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme,
  });
};
export const toastError = (message: string, theme: string) => {
  toast.error(message, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme,
  });
};
