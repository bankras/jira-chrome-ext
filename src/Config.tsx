import './Config.css';
import {useEffect, useState} from "react";

function Config() {
    const [config, setConfig] = useState({jiraHost:'', jiraUser:''});
    const [error, setError] = useState('');
    useEffect(() => {
        chrome.storage.sync.get('config').then(({ config }) => {
            if(config) {
                setConfig(config);
            }
        })
    }, [])

    function updateHost(e: React.ChangeEvent<HTMLInputElement>) {
        setConfig(config => ({...config, jiraHost: e.target.value}));
        setError(() => 'change not saved')
    }
    function updateUser(e: React.ChangeEvent<HTMLInputElement>) {
        setConfig(config => ({...config, jiraUser: e.target.value}));
        setError(() => 'change not saved')
    }

    function validURL(value: string) {
        let url;
        try {
            url = new URL(value);
        } catch (_) {
            return false;
        }
        return url.protocol === 'http:' || url.protocol === 'https:';
    }

    function updateConfig(e: React.FormEvent) {
        e.preventDefault();
        if(!config.jiraHost || !config.jiraUser) {
            setError(() => 'both values are required');
            return;
        }
        if(!validURL(config.jiraHost)) {
            setError(() => 'jiraHost is not a valid URL');
            return;
        }
        if(!config.jiraHost.endsWith('/')) {
            setError(() => 'jiraHost needs to end with a \'/\'');
            return;
        }
        chrome.storage.sync.set({'config':config}).then(() => setError(() => ''));
    }

    return (
        <form className="Config" onSubmit={updateConfig}>
            <label>Jira hostname:
                <input name='jiraHost' placeholder="https://domain.atlassian.net/" value={config.jiraHost} onChange={updateHost}/>
            </label>
            <label>Jira username:
                <input name='jiraUser' value={config.jiraUser} onChange={updateUser}/>
            </label>
            <input type="submit" value="Save"/>
            <div>{error}</div>
        </form>
    );
}

export default Config
