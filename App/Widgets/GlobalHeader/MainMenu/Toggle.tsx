import React from 'react';

// Components
import { HyperLink, HyperLinkProps } from '@/Components';

// Icons
import { Menu as Icon } from '@/Icons';

// Context
import { useGlobalHeaderContext } from '@/Widgets/GlobalHeader/Context';

const CLASS_NAME = 'kicl--widgets--global-header--main-menu';

const Toggle: React.FunctionComponent = () => {
  const { deleteURLSearchParams, location, open, search, setURLSearchParams } =
    useGlobalHeaderContext();

  if (open) {
    deleteURLSearchParams();
  } else {
    setURLSearchParams();
  }

  const to: HyperLinkProps['to'] = {
    pathname: location.pathname,
    search: search.toString(),
  };

  return (
    <HyperLink className={`${CLASS_NAME}--toggle`} to={to} unstyled>
      <Icon open={open} />
    </HyperLink>
  );
};

export default Toggle;
