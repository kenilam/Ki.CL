import { useInView, useResponsive } from 'design/hooks';

const useEntered = () => {
  const { prefersReducedMotion } = useResponsive();
  const { inView, ref } = useInView<HTMLHeadingElement>({
    once: true,
    rootMargin: '0px 0px -35% 0px',
  });

  return { entered: inView || prefersReducedMotion, ref };
};

export { useEntered };
