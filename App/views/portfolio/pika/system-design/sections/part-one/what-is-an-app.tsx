import React from 'react';

// Libraries
import classNames from 'classnames';
import Prism from 'prismjs';
import 'prismjs/components/prism-yaml';
import { useTranslation } from 'react-i18next';

// Components
import { Card, CardContent, Heading, Markdown, Text } from 'design/components';

const MANIFEST = `# app: character-creator @ v4
id: character-creator
version: 4
metadata:
  title: Character Creator
  credits: { estimate: dynamic }
inputs:
  - key: name         { type: text, required: true }
  - key: photo        { type: image, required: true }
  - key: voice        { type: enum, source: voice-library }
  - key: image_model  { type: model-select, default: nano-banana-edit }
workflow: # DAG of primitive calls
  - id: validate_face
    primitive: vision.face_check
    args: { image: $inputs.photo }
  - id: build_prompt
    primitive: llm.template
    needs: [validate_face]
  - id: gen_character
    primitive: image.generate
    needs: [build_prompt]
    retry: { max: 3, backoff: exponential }
outputs:
  - source: $gen_character.assets
    layout: gallery
    actions: [regenerate, handoff: [i2v, short-film, ads]]`;

/** The manifest format and the primitives it calls. */
const WhatIsAnApp: React.FunctionComponent = () => {
  const { t } = useTranslation('pika');

  return (
    <>
      <Heading is='h3' lookLike='h1'>
        {t('title', { context: 'what_is_an_app' })}
      </Heading>
      <Text>{t('part_one.what_is_an_app.intro')}</Text>
      <Card>
        <CardContent>
          <Text
            className={classNames(
              'kicl-font-family-mono',
              'kicl-overflow-x-auto'
            )}
            is='pre'
            unstyled
          >
            <code
              dangerouslySetInnerHTML={{
                __html: Prism.highlight(MANIFEST, Prism.languages.yaml, 'yaml'),
              }}
            />
          </Text>
        </CardContent>
      </Card>
      <Text>{t('part_one.what_is_an_app.schema')}</Text>
      <Text>
        <Markdown>{t('part_one.what_is_an_app.primitives')}</Markdown>
      </Text>
    </>
  );
};

export { WhatIsAnApp };
