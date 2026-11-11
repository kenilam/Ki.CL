import React from 'react';

// Icons
import * as Tb from 'react-icons/tb';

// Components
import { HyperLink } from 'design/components';

// Context
import { useGenerateContext } from '@/views/experiments/kinetic-light/context';

// Constants
import { toPath } from '@/views/experiments/kinetic-light/constants';

const Generated: React.FunctionComponent = () => {
  const { clear, generated } = useGenerateContext();

  if (!generated) {
    return null;
  }

  return (
    <HyperLink
      after={<Tb.TbArrowRight aria-hidden />}
      before={<Tb.TbMusic aria-hidden />}
      className='kicl-inline-size-full'
      frames='max-content--auto--max-content'
      justifyContent='stretch'
      lookLikeButton
      onClick={clear}
      to={toPath(generated.id)}
      variant='secondary'
    >
      <span className='kicl-text-truncate' title={generated.title}>
        {generated.title}
      </span>
    </HyperLink>
  );
};

export { Generated };
