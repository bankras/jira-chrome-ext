import {useEffect, useState} from 'react';
import './App.css';

function App() {

  const [jiraHost, setJiraHost] = useState(null);
  const [jiraUser, setJiraUser] = useState(null);
  const [jumpValue, setJumpValue] = useState("");

  useEffect(() => {
    chrome.storage.sync.get('config').then(({ config }) => {
      if (!config || !config.jiraHost || !config.jiraUser) {
        chrome.runtime.openOptionsPage()

        return;
      }

      setJiraHost(config.jiraHost);
      setJiraUser(config.jiraUser);
    })
  }, [])

  function handleJump(e: React.FormEvent) {
    e.preventDefault();
    window.open(jiraHost +'browse/' +  jumpValue, '_blank');

  }
  function handleCreated() {
    window.open(jiraHost + 'issues/?jql=' + encodeURI('reporter=currentUser() order by created DESC'), '_blank');
  }
  function handleUpdated() {
    window.open(jiraHost + 'issues/?jql=' +encodeURI('issuekey IN updatedBy("'+jiraUser+'", "-1d")'), '_blank');
  }

  function handleAssigned() {
    window.open(jiraHost + 'issues/?jql=' +encodeURI('assignee=currentUser() and statuscategory!=done order by updated DESC'), '_blank');
  }

  return (
    <div className="App">
      <form onSubmit={handleJump}>
        <input type="text" name="jumpTo" autoFocus onChange={e => setJumpValue(e.target.value)}/>
        <button type="submit">Go</button>
      </form>
      <ul className="links">
        <li onClick={handleCreated}>Created tickets</li>
        <li onClick={handleUpdated}>Updated tickets</li>
        <li onClick={handleAssigned}>Assigned to me tickets</li>
      </ul>
      <div className="footer">
        <span>Version: {__APP_VERSION__}</span>
      </div>
    </div>
  );
}

export default App;
