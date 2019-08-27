declare module ISpinner {
  interface ClassNames extends IClassNames {
    default: string;
  }
  
  type Show = boolean;
  
  interface Props {
    show: Show
  }
}

export default ISpinner;
