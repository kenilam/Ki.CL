import React from 'react';

// Components
import {
  Card,
  CardDescription,
  CardTitle,
  Markdown,
  Text,
} from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Constants
import { STEPS } from '@/views/experiments/swatch/card/article/constants';

type Props = { step: (typeof STEPS)[number] };

const Step: React.FunctionComponent<Props> = ({ step }) => {
  const { t } = useTranslation('swatch');

  return (
    <Card is='li' size='fit' variant='secondary'>
      <Text is='span' lookLike='pre'>
        {STEPS.indexOf(step) + 1}
      </Text>
      <CardTitle is='h4'>{t(`article.steps.${step}.title`)}</CardTitle>
      <CardDescription>
        <Markdown>{t(`article.steps.${step}.text`)}</Markdown>
      </CardDescription>
    </Card>
  );
};

export { Step };
