import {vi, describe, expect, test} from 'vitest'
import App from "./App.tsx";
import {fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom'
import {act} from "react";

describe('jira extension', () => {
    const spy = vi.spyOn(chrome.runtime, 'openOptionsPage');

    test('should open options if there is no config', async () => {
        vi.spyOn(chrome.storage.sync, 'get').mockImplementation(() => Promise.resolve({}));

        render(<App/>);
        await act(async () => {});

        await vi.waitFor(() => expect(spy).toBeCalled());
    });

    test('should render if there is a config', async () => {
        const config = {config: {jiraHost: '<<host>>', jiraUser: '<<user>>'}};
        vi.spyOn(chrome.storage.sync, 'get').mockImplementation(() => {
            return Promise.resolve(config);
        });

        render(<App/>);
        await act(async () => {});

        const linkCreatedElement = screen.getByText(/Created tickets/i);
        // Waiting for this check because the initial render also causes a component rerender
        // through an async state update in the useEffect.
        await vi.waitFor(() => expect(linkCreatedElement).toBeInTheDocument());

        const linkUpdatedElement = screen.getByText(/Updated tickets/i);
        expect(linkUpdatedElement).toBeInTheDocument();
    });

    test('should open a new tab with the jira query', async () => {
        const windowStub = vi.spyOn(window, 'open').mockResolvedValue(null);

        const wrapper = render(<App/>);
        await act(async () => {});

        fireEvent.click(wrapper.getByText('Created tickets'));

        expect(windowStub).toBeCalledWith('<<host>>issues/?jql=reporter=currentUser()%20order%20by%20created%20DESC', '_blank');
    });
    test('should open a new tab with the jira query', async () => {
        const windowStub = vi.spyOn(window, 'open').mockResolvedValue(null);

        const wrapper = render(<App/>);
        await act(async () => {});

        fireEvent.click(wrapper.getByText('Updated tickets'));

        expect(windowStub).toBeCalledWith('<<host>>issues/?jql=issuekey%20IN%20updatedBy(%22%3C%3Cuser%3E%3E%22,%20%22-1d%22)', '_blank');
    });
    test('should open a new tab with the jira query', async () => {
        const windowStub = vi.spyOn(window, 'open').mockResolvedValue(null);

        const wrapper = render(<App/>);
        await act(async () => {});

        fireEvent.click(wrapper.getByText('Assigned to me tickets'));

        expect(windowStub).toBeCalledWith('<<host>>issues/?jql=assignee=currentUser()%20and%20statuscategory!=done%20order%20by%20updated%20DESC', '_blank');
    });
});