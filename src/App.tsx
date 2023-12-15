import React, {useEffect, useState} from 'react';
import './App.css';

function App() {

  const [jiraHost, setJiraHost] = useState(null);
  const [jiraUser, setJiraUser] = useState(null);

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

  function handleJump(e:React.SyntheticEvent) {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      jumpTo: {value:string};
    }
    window.open(jiraHost +'browse/' +  target.jumpTo.value, '_blank');

  }
  function handleCreated() {
    window.open(jiraHost + 'issues/?jql=' + encodeURI('creator=currentUser() order by created DESC'), '_blank');
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
        <input type="text" name="jumpTo" autoFocus/>
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
