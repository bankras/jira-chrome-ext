import {vi, describe, expect, test} from 'vitest'
import App from "./App.tsx";
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom'

describe('jira extension', () => {
    const spy = vi.spyOn(chrome.runtime, 'openOptionsPage');

    test('should open options if there is no config', async () => {
        vi.spyOn(chrome.storage.sync, 'get').mockImplementation(() => Promise.resolve({}));

        render(<App/>);

        await vi.waitFor(() => expect(spy).toBeCalled());
    });

    test('should render if there is a config', async () => {
        const config = {config: {jiraHost: '<<host>>', jiraUser: '<<user>>'}};
        vi.spyOn(chrome.storage.sync, 'get').mockImplementation(() => {
            return Promise.resolve(config);
        });

        render(<App/>);

        const linkCreatedElement = screen.getByText(/Created tickets/i);
        // Waiting for this check because the initial render also causes a component rerender
        // through an async state update in the useEffect.
        await vi.waitFor(() => expect(linkCreatedElement).toBeInTheDocument());

        const linkUpdatedElement = screen.getByText(/Updated tickets/i);
        expect(linkUpdatedElement).toBeInTheDocument();
    });
});