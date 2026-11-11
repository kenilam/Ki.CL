import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from 'react';

type Value = {
  /** The whole picture is open in its dialog. */
  open: boolean;
  setOpen: (open: boolean) => void;
};

const PictureContext = createContext<Value | null>(null);

/** Whether the whole picture is open, for the preview and the dialog. */
const Provider: React.FunctionComponent<PropsWithChildren> = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <PictureContext.Provider value={{ open, setOpen }}>
      {children}
    </PictureContext.Provider>
  );
};

const usePictureContext = (): Value => {
  const value = useContext(PictureContext);

  if (!value) {
    throw new Error('usePictureContext needs a PictureContext above it.');
  }

  return value;
};

export { Provider, usePictureContext };
