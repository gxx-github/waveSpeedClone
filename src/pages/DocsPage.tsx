import type React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  flex: 1;
`;

const IframeWrapper = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
`;

const DocFrame = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
  background: ${({ theme }) => theme.colors.background};
`;

const DocsPage: React.FC = () => {
  return (
    <Container>
      <IframeWrapper>
        <DocFrame
          title="WaveSpeedAI Docs"
          src="https://wavespeed.ai/docs/docs"
          sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-top-navigation-by-user-activation"
        />
      </IframeWrapper>
    </Container>
  );
};

export default DocsPage;


