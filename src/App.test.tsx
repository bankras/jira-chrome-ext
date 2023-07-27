import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import App from './App';
import { chrome } from 'jest-chrome';

describe('jira extension', () => {

  afterEach(() => {
    jest.restoreAllMocks();
  })

  it('should open options if there is no config', async () => {
    const spy = jest.spyOn(chrome.runtime, 'openOptionsPage');

    const config = {config: {}};
    chrome.storage.sync.get.mockImplementation(() =>
        Promise.resolve(config))

    render(<App/>);

    await waitFor(() => expect(spy).toBeCalled());
  });

  it('should render if there is a config', async () =>{
    const config = {config: {jiraHost: '<<host>>', jiraUser: '<<user>>'}};
    chrome.storage.sync.get.mockImplementation(() =>
        Promise.resolve(config))

    render(<App/>);

    const linkCreatedElement = screen.getByText(/Created tickets/i);
    // Waiting for this check because the initial render also causes a component rerender
    // through an async state update in the useEffect.
    await waitFor(() => expect(linkCreatedElement).toBeInTheDocument());

    const linkUpdatedElement = screen.getByText(/Updated tickets/i);
    expect(linkUpdatedElement).toBeInTheDocument();
  });
});
