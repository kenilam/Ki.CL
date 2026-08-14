import React, { useEffect, useRef } from 'react';

// Libraries
import classNames from 'classnames';

// Routers
import { useLocation } from '@/Router';

// Components
import { Button, Dialog, Navigation, Text } from '@/Components';

// Icons
import { Ri } from '@/Icons';

// Widgets
import { Links } from '@/Widgets/GlobalHeader/Links';

// Styles
import './Styles.scss';

const CLASS_NAME = 'kicl--widgets--global-header--navigation--mobile';

const Mobile: React.FunctionComponent = () => {
  const { key } = useLocation();

  const node = useRef<HTMLDialogElement>(null);

  /*
   * A command opens and closes the dialog from markup, but a link inside it
   * only changes the route behind it. `key` rather than `pathname`, because it
   * changes on every navigation — including a link to the route already open,
   * and including the back button.
   */
  useEffect(() => {
    node.current?.close();
  }, [key]);

  return (
    <>
      <Button
        className={classNames('kicl-font-size-medium', `${CLASS_NAME}--toggle`)}
        command='show-modal'
        commandFor={CLASS_NAME}
        unstyled
      >
        <Ri.RiMenuLine />
        <Text className='kicl-hidden' is='span'>
          Open the navigation
        </Text>
      </Button>

      <Dialog
        className={CLASS_NAME}
        closable='keyboard'
        fullScreen
        id={CLASS_NAME}
        ref={node}
      >
        <Button
          className={classNames(
            'kicl-font-size-medium',
            'kicl-position-fixed',
            `${CLASS_NAME}--toggle`,
            `${CLASS_NAME}--toggle--is-overlaid`
          )}
          command='request-close'
          commandFor={CLASS_NAME}
          unstyled
        >
          <Ri.RiCloseLine />
          <Text className='kicl-hidden' is='span'>
            Close the navigation
          </Text>
        </Button>

        <Navigation autoFlow='row' gap='normal' justifyItems='start'>
          {Links}
        </Navigation>
      </Dialog>
    </>
  );
};

export default Mobile;
