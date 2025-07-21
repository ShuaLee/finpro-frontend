let logoutFn: (() => void) | null = null;

export const registerLogout = (fn: () => void) => {
  logoutFn = fn;
};

export const logoutHandler = () => {
  if (logoutFn) {
    logoutFn(); // Calls the real logout from AuthContext
  }
};
