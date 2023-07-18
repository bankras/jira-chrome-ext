import React from 'react';
import './App.css';



function App() {
  function handleJump(e:React.SyntheticEvent) {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      jumpTo: {value:string};
    }
    window.open("https://bynder.atlassian.net/browse/" +  target.jumpTo.value, '_blank');

  }

  return (
    <div className="App">
      <form onSubmit={handleJump}>
        <input type="text" name="jumpTo"/>
        <button type="submit">Go</button>
      </form>
    </div>
  );
}

export default App;
