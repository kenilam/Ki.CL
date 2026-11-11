type LocalStorage = Omit<
  Storage,
  'getItem' | 'setItem' | 'clear' | 'length' | 'key'
>;

type Value = LocalStorage | null | undefined;

type Props = Pick<Storage, 'clear' | 'length' | 'key'> & {
  localStorage: Omit<
    Storage,
    'getItem' | 'setItem' | 'clear' | 'length' | 'key'
  >;
  getItem<Item extends Value>(key: string): Item;
  removeItem: Storage['removeItem'];
  setItem(key: string, value: Value): void;
};

const EVENT = 'storageChange';

const getItem: Props['getItem'] = (key) => {
  const value = window.localStorage.getItem(key);

  if (!value) {
    return value;
  }

  try {
    return JSON.parse(String(value));
  } catch (error) {
    console.error(error);

    return value;
  }
};

const removeItem: Props['removeItem'] = (key) => {
  window.localStorage.removeItem(key);

  window.setTimeout(() => {
    const event = new CustomEvent(EVENT);

    document.dispatchEvent(event);
  }, 300);
};

const setItem: Props['setItem'] = (key, _value) => {
  let value = '';

  try {
    if (typeof _value !== 'string') {
      value = JSON.stringify(_value);
    }
  } catch (error) {
    console.error(error);
  }

  window.localStorage.setItem(key, String(value));

  window.setTimeout(() => {
    const event = new CustomEvent(EVENT);

    document.dispatchEvent(event);
  }, 300);
};

export { EVENT, getItem, removeItem, setItem, type Props };
