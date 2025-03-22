import toast from 'react-hot-toast';

class CustomNotify {
  success(msg, options = {}) {
    const { clearPrev = false, ...toastOptions } = options;
    if (clearPrev) this.clear();
    toast.success(msg, toastOptions);
  }

  warning(msg, options = {}) {
    const { clearPrev = false, ...toastOptions } = options;
    if (clearPrev) this.clear();
    toast(msg, { ...toastOptions, icon: '⚠️' }); // Custom warning icon
  }

  error(msg, options = {}) {
    const { clearPrev = false, ...toastOptions } = options;
    if (clearPrev) this.clear();
    toast.error(msg, toastOptions);
  }

  loading(msg, options = {}) {
    const { clearPrev = false, ...toastOptions } = options;
    if (clearPrev) this.clear();
    toast.loading(msg, toastOptions);
  }

  clear() {
    toast.remove();
  }
}

export const Notify = new CustomNotify();
