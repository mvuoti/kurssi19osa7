const localStorageMockFactory = () => {
  let storage = {};
  return {
    setItem: (name, value) => storage[name] = value,
    getItem: (name) => storage[name],
    removeItem: (name) => delete storage[name],
    clear: () => storage = {},
  };
};

window.localStorage = localStorageMockFactory();

