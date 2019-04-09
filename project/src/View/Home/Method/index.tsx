import {IProps} from "@View/Home/spec";
import lifecycle from 'react-pure-lifecycle';

const methods = {
  componentDidMount(props: IProps): void {
    const {updateWindowSizes} = props;
    
    window.addEventListener('resize', updateWindowSizes);
  },
  componentWillUnmount(props: IProps): void {
    const {updateWindowSizes} = props;
    
    window.removeEventListener('resize', updateWindowSizes);
  }
};

export default lifecycle(methods);
