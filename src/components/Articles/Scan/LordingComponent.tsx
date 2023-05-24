import { CircularProgress, CircularProgressLabel, Box } from '@chakra-ui/react';

import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  .rounded-progress-bar svg {
    stroke-linecap: round;
  }
`;
const LordingComponent = () => {
  return (
    <div>
      <GlobalStyle />
      <CircularProgress
        className="rounded-progress-bar"
        // value={progress}
        color="#49BAC0"
        trackColor="rgba(73, 186, 192, 0.3)"
        w={'80%'}
        h={'80%'}
        size={'100%'}
        m={'auto'}
      >
        <CircularProgressLabel fontSize={'2.5vw'} m={'auto'}>
          <Box as={'span'} fontWeight={'bold'} fontSize={'3vw'}>
            {/* {progress} */}
          </Box>
          <Box as={'span'} fontWeight={'bold'} fontSize={'1.5vw'}>
            %
          </Box>
        </CircularProgressLabel>
      </CircularProgress>
    </div>
  );
};

export default LordingComponent;
