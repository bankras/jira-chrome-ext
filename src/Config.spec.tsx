import {vi, describe, expect, test} from 'vitest'
import {render, screen, waitFor} from "@testing-library/react";
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
});
