let subscribers = [];
let counter = 0;
let showTimeout = null;
const SHOW_DELAY = 120;

export const subscribeLoading = (cb) => {
  subscribers.push(cb);
  cb(counter > 0);
  return () => {
    subscribers = subscribers.filter((s) => s !== cb);
  };
};

const emit = (val) => {
  subscribers.forEach((cb) => {
    try {
      cb(val);
    } catch (e) {}
  });
};

export const startLoading = () => {
  counter += 1;
  if (counter === 1) {
    if (SHOW_DELAY > 0) {
      showTimeout = setTimeout(() => {
        emit(true);
        showTimeout = null;
      }, SHOW_DELAY);
    } else {
      emit(true);
    }
  }
};

export const stopLoading = () => {
  counter = Math.max(0, counter - 1);
  if (counter === 0) {
    if (showTimeout) {
      clearTimeout(showTimeout);
      showTimeout = null;
      return;
    }
    emit(false);
  }
};

export const resetLoading = () => {
  counter = 0;
  if (showTimeout) {
    clearTimeout(showTimeout);
    showTimeout = null;
  }
  emit(false);
};
