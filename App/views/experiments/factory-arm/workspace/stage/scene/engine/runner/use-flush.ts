// Context
import { useNoticesContext } from '@/views/experiments/factory-arm/workspace/notices-context';
import { useKnowledgeContext } from '@/views/experiments/factory-arm/workspace/knowledge-context';
import { useLogContext } from '@/views/experiments/factory-arm/log-context';
import { useEngineContext } from '@/views/experiments/factory-arm/workspace/stage/scene/engine/context';

const useFlush = () => {
  const { alarm, calm, skip } = useNoticesContext();
  const { write } = useKnowledgeContext();
  const { note } = useLogContext();
  const { conductor } = useEngineContext();

  return () => {
    conductor.flush().forEach((event) => {
      if (event.type === 'note') {
        note(event.note, event.level);

        return;
      }

      if (event.type === 'refuse') {
        // It waits red, with what's in its way lit, till the cell changes.
        write.park(event.target, event.across);
        write.obstruct(event.across);
        skip(event.target);

        return;
      }

      if (event.type === 'unpark') {
        write.unpark(event.target);

        return;
      }

      if (event.type === 'alarm') {
        alarm();

        return;
      }

      calm();
    });
  };
};

export { useFlush };
