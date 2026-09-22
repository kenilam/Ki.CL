import React from 'react';

// Libraries
import classNames from 'classnames';
import Prism from 'prismjs';
import 'prismjs/components/prism-yaml';

// Components
import { Card, CardContent, Heading, Text } from '@/components';

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
const WhatIsAnApp: React.FunctionComponent = () => (
  <>
    <Heading className='kicl-font-size-large' is='h4'>
      What is an App?
    </Heading>
    <Text>
      An App is a declarative manifest, stored and versioned like a document:
    </Text>
    <Card is='aside'>
      <CardContent>
        <Text
          className={classNames('kicl-font-family-mono')}
          is='blockquote'
          unstyled
        >
          <pre>
            <code
              dangerouslySetInnerHTML={{
                __html: Prism.highlight(MANIFEST, Prism.languages.yaml, 'yaml'),
              }}
            />
          </pre>
        </Text>
      </CardContent>
    </Card>
    <Text>
      The typed input schema means the client renders any App&apos;s form
      straight from the manifest - there is no per-App frontend code to write or
      maintain. The DAG structure lets the orchestrator checkpoint, retry, and
      parallelize steps without understanding what any particular App is for.
      And immutable versions make rollback a pointer move: publishing writes a
      new row, and running jobs stay pinned to whatever version they started on.
    </Text>
    <Text>
      Primitives are thin, typed wrappers around the backend creative APIs (
      <code>video.generate</code>, <code>image.edit</code>,
      <code>vision.analyze</code>, <code>media.ffmpeg</code>,{' '}
      <code>llm.complete</code>, and so on). Each one declares its argument
      schema, cost model, latency class, timeout profile, and which providers
      can serve it. When a new vendor model appears, we register a provider, and
      every App with a <code>model-select</code> input picks it up without
      touching a single manifest - though new providers earn default traffic
      through the same staged rollout as Apps, watched against the
      primitive&apos;s error budget.
    </Text>
  </>
);

export { WhatIsAnApp };
