import {vi, describe, expect, test} from 'vitest'
import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import Config from "./Config";


describe('Configuration', () => {

    test('should initially render empty inputs', async () => {
        const config = {config: {}};
        vi.spyOn(chrome.storage.sync, 'get').mockImplementation(() =>
            Promise.resolve(config))

        render(<Config/>);
        await waitFor(() => {
            expect((screen.getByTestId('jiraHost') as HTMLInputElement).value).toBe("");
            expect((screen.getByTestId('jiraUser') as HTMLInputElement).value).toBe("");
        });
    });

    test('should use values from storage', async () => {
        const config = {config: {jiraHost: '<<host>>', jiraUser: '<<user>>'}};
        vi.spyOn(chrome.storage.sync,'get').mockImplementation(() =>
            Promise.resolve(config))

        render(<Config/>);
        await waitFor(() => {
            expect((screen.getByTestId('jiraHost') as HTMLInputElement).value).toBe("<<host>>");
            expect((screen.getByTestId('jiraUser') as HTMLInputElement).value).toBe("<<user>>");
        });
    });

    test('should display error when form is submitted with empty inputs', async () => {
        render(<Config/>);
        fireEvent.submit(screen.getByRole('button', { name: /save/i }));
        await waitFor(() => {
            expect(screen.getByText(/both values are required/i)).toBeInTheDocument();
        });
    });

    test('should display error when jiraHost is not a valid URL', async () => {
        render(<Config/>);
        fireEvent.change(screen.getByTestId('jiraHost'), { target: { value: 'invalid-url' } });
        fireEvent.change(screen.getByTestId('jiraUser'), { target: { value: 'user' } });
        fireEvent.submit(screen.getByRole('button', { name: /save/i }));
        await waitFor(() => {
            expect(screen.getByText(/jiraHost is not a valid URL/i)).toBeInTheDocument();
        });
    });

    test('should display error when jiraHost does not end with a /', async () => {
        render(<Config/>);
        fireEvent.change(screen.getByTestId('jiraHost'), { target: { value: 'https://domain.atlassian.net' } });
        fireEvent.change(screen.getByTestId('jiraUser'), { target: { value: 'user' } });
        fireEvent.submit(screen.getByRole('button', { name: /save/i }));
        await waitFor(() => {
            expect(screen.getByText(/jiraHost needs to end with a '\/'/i)).toBeInTheDocument();
        });
    });

    test('should clear error when form is successfully submitted', async () => {
        const config = {config: {jiraHost: 'https://domain.atlassian.net/', jiraUser: 'user'}};
        vi.spyOn(chrome.storage.sync, 'set').mockImplementation(() => Promise.resolve());
        render(<Config/>);
        fireEvent.change(screen.getByTestId('jiraHost'), { target: { value: config.config.jiraHost } });
        fireEvent.change(screen.getByTestId('jiraUser'), { target: { value: config.config.jiraUser } });
        fireEvent.submit(screen.getByRole('button', { name: /save/i }));
        await waitFor(() => {
            expect(screen.queryByText(/change not saved/i)).not.toBeInTheDocument();
        });
    });
});
