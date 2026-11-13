import React from 'react';

// Components
import { List } from 'design/components';

// Partials
import { File } from './file';

// Constants
import { FILES } from './constants';

const Files: React.FunctionComponent = () => {
  return (
    <List gap='narrower' listStyleType='disc'>
      {FILES.map((file) => {
        return <File file={file} key={file} />;
      })}
    </List>
  );
};

export { Files };
