import {useChromeStorageSync} from 'use-chrome-storage';
import './Config.css';

function Config() {
    const [{jiraHost, jiraUser}, setValue, , error] = useChromeStorageSync('config', {jiraHost:'', jiraUser:''});

    function updateHost(e: React.ChangeEvent<HTMLInputElement>) {
        setValue(config => ({...config, jiraHost:e.target.value}));
    }
    function updateUser(e: React.ChangeEvent<HTMLInputElement>) {
        setValue(config => ({...config, jiraUser:e.target.value}));
    }

    return (
        <form className="Config">
            <label>Jira hostname:
                <input placeholder="https://domain.atlassian.net/" value={jiraHost} onChange={updateHost}/>
            </label>
            <label>Jira username:
                <input value={jiraUser} onChange={updateUser}/>
            </label>
            { error && <div className={error}>Error: {error}</div> }
        </form>
    );
}

export default Config
