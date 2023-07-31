import { chrome } from 'jest-chrome';
import {render, screen, waitFor} from "@testing-library/react";
import Config from "./Config";


describe('Configuration', () => {

    it('should initialy render empty inputs', async () => {
        const config = {config: {}};
        chrome.storage.sync.get.mockImplementation(() =>
            Promise.resolve(config))

        render(<Config/>);
        await waitFor(() => expect(screen.getByLabelText('Jira hostname:')).toHaveValue(''));
        expect(screen.getByLabelText('Jira username:')).toHaveValue('');
    });

    it('should use values from storage', async () => {
        const config = {config: {jiraHost: '<<host>>', jiraUser: '<<user>>'}};
        chrome.storage.sync.get.mockImplementation(() =>
            Promise.resolve(config))

        render(<Config/>);
        await waitFor(() => expect(screen.getByLabelText('Jira hostname:')).toHaveValue('<<host>>'));
        expect(screen.getByLabelText('Jira username:')).toHaveValue('<<user>>');
    });
});
