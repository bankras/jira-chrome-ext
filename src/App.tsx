import React from 'react';
import './App.css';
import {useChromeStorageSync} from "use-chrome-storage";



function App() {
  const [{jiraHost, jiraUser},] = useChromeStorageSync('config', {jiraHost:'', jiraUser:''});

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

  return (
    <div className="App">
      <form onSubmit={handleJump}>
        <input type="text" name="jumpTo" autoFocus/>
        <button type="submit">Go</button>
      </form>
      <ul className="links">
        <li onClick={handleCreated}>Created tickets</li>
        <li onClick={handleUpdated}>Updated tickets</li>
      </ul>
    </div>
  );
}

export default App;
