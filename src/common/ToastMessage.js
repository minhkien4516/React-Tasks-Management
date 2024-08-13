import { toast } from 'react-toastify';

export const notifyMovingChange = (message) => {
  toast.success(`${message}`, {
    position: 'top-right',
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: true,
  });
};

export const notifyErrorToast = (message) => {
  toast.error(`${message}`, {
    position: 'top-right',
    autoClose: 1200,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: false,
  });
};

export const showToastMessage = (message) => {
  toast.success(`${message}`, {
    position: 'top-right',
    autoClose: 1200,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    theme: 'light',
  });
};
