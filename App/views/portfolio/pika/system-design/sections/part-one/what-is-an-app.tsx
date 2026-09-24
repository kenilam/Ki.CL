import React from 'react';

// Libraries
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
    <Heading className='kicl-font-size-large' is='h3'>
      What is an App?
    </Heading>
    <Text>
      An App is a declarative manifest, stored and versioned like a document:
    </Text>
    <Card>
      <CardContent>
        <Text className='kicl-font-family-mono' is='pre' unstyled>
          <code
            dangerouslySetInnerHTML={{
              __html: Prism.highlight(MANIFEST, Prism.languages.yaml, 'yaml'),
            }}
          />
        </Text>
      </CardContent>
    </Card>
    <Text>
      The typed input schema lets the client render any App&apos;s form straight
      from the manifest, with no per-App frontend code. The DAG lets the
      orchestrator checkpoint, retry, and parallelize steps without knowing what
      the App is for. Versions are immutable, so rollback is a pointer move.
      Publishing writes a new row, and running jobs stay pinned to the version
      they started on.
    </Text>
    <Text>
      Primitives are thin, typed wrappers around the backend creative APIs (
      <Text is='code'>video.generate</Text>, <Text is='code'>image.edit</Text>,
      <Text is='code'>vision.analyze</Text>, <Text is='code'>media.ffmpeg</Text>
      , <Text is='code'>llm.complete</Text>, and so on). Each one declares its
      argument schema, cost model, latency class, timeout profile, and which
      providers can serve it. When a new vendor model appears, we register a
      provider, and every App with a <Text is='code'>model-select</Text> input
      picks it up without a manifest change. New providers get default traffic
      through the same staged rollout as Apps, watched against the
      primitive&apos;s error budget.
    </Text>
  </>
);

export { WhatIsAnApp };
