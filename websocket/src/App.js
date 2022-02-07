import {useState} from 'react';
import './App.css';

import {md5} from './util/md5'

function App() {
  const [text, setText] = useState('');
  const [hashValue, setHashValue] = useState('');

  let connection = new WebSocket('ws://127.0.0.1:8080');

  connection.onopen = function () {
    console.log('Connection established');
  };

  connection.onerror = function (error) {
    console.warn('Can\'t connect to websocket server');
  };

  // reception de message du serveur..
  connection.onmessage = function (message) {
    try {
      // const json = JSON.parse(message.data);
    } catch (e) {
      console.warn('error onmessage: ', message.data);
      return;
    }
  };

  function generateHash() {
    if(text === '') return;

    const _hash = md5(text);
    setHashValue(_hash);
    // sending hash to server
    connection.send(_hash);
  }

  const _handleTextChange = (e) => {
    setText(e.value);
  }

  return (
    <div className="App">
      <div id="contenu">
        <h1 id="titre">Cluster de bruteforce de hash MD5</h1>

        <div id="blocMilieu">
          <table>
            <tbody>
              <tr>
                <td>Mon texte</td>
                <td><input type="text" value={text} onChange={_handleTextChange}/></td>
                <td><input type="button" value="Générer hash" onClick={generateHash}/></td>
              </tr>
              <tr>
                <td>Mon hash</td>
                <td><input type="text" name="monHash" value={hashValue} readOnly={true}/></td>
              </tr>
              <tr>
                <td colSpan="2">(Hash décrypté, en cours ...).</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
