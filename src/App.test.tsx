import React from 'react';
import {render, screen} from '@testing-library/react';
import App from './App';
import { chrome } from 'jest-chrome';

describe('jira extension', () => {

  beforeEach(() => {
  });


  it('should render with config', () =>{
    const config = {config: {jiraHost: '<<host>>', jiraUser: '<<user>>'}};
    chrome.storage.sync.get.mockImplementation(() =>
        Promise.resolve(config))

    render(<App/>);

    const linkCreatedElement = screen.getByText(/Created tickets/i);
    expect(linkCreatedElement).toBeInTheDocument();

    const linkUpdatedElement = screen.getByText(/Updated tickets/i);
    expect(linkUpdatedElement).toBeInTheDocument();
  });
});
