import React from 'react';

// Components
import { Button, ButtonProps, Layout } from '@/Components';

// Icons
import { Ri } from '@/Icons';

// Context
import { useSliderContext } from '@/Widgets/Slider/Context';

// Constants
import { CLASS_NAME as DEFAULT_CLASS_NAME } from '@/Widgets/Slider/constants';

// Spec
import * as Spec from './Spec';

// Styles
import './Styles.scss';

const CLASS_NAME = `${DEFAULT_CLASS_NAME}--thumbnail`;

const Thumbnail: React.FunctionComponent<Spec.Props> = ({ counts }) => {
  const { currentSlide, instance } = useSliderContext();

  const clickHandler = (index: number) => {
    const onClick: ButtonProps['onClick'] = () => {
      instance?.current?.moveToIdx(index);
    };

    return onClick;
  };

  return (
    <Layout autoFlow='column'>
      <menu className={CLASS_NAME}>
        {Array(counts)
          .fill('')
          .map((_, index) => {
            const key = index;

            const isCurrent = currentSlide === index;

            const Icon = isCurrent
              ? Ri.RiCheckboxBlankCircleFill
              : Ri.RiCheckboxBlankCircleLine;

            let title = 'current slide';

            if (!isCurrent) {
              title = `go to slide ${index}`;
            }

            return (
              <Layout alignContent='center' justifyItems='center'>
                <Button
                  aria-disabled={isCurrent}
                  aria-pressed={isCurrent}
                  key={key}
                  onClick={clickHandler(index)}
                  title={title}
                  unstyled
                >
                  <Icon />
                </Button>
              </Layout>
            );
          })}
      </menu>
    </Layout>
  );
};

export default Thumbnail;
