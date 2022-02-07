import {useState, useEffect} from 'react';
import './App.css';

import {generateHash} from './util/md5'

// connection instance
const connection = new WebSocket('ws://127.0.0.1:8080');

/**
 * Application component
 * @returns {JSX.Element}
 * @constructor
 */
function App() {
  const [text, setText] = useState('');
  const [hashValue, setHashValue] = useState('');

  useEffect(()=> {
    connection.onopen = function () {
      console.log('Connection established');
    };
    connection.onerror = function (error) {
      console.warn('Can\'t connect to websocket server');
    };
    // reception de message du serveur..
    connection.onmessage = function (event) {
      try {
        const message = JSON.parse(event.data);
        console.log(message);
      } catch (e) {
        console.warn('error onmessage: ', event.data);
        return;
      }
    };

    return () => {
      connection.close();
    }
  }, []);

  /**
   * input handler
   * @param value
   * @private
   */
  const _handleTextChange = ({ target: { value }}) => {
    setText(value);
  }

  /**
   * generate _hash value and send its to server
   * @private
   */
  const _handleButtonClick = () => {
    const _hash = generateHash(text);
    setHashValue(_hash);
    connection.send(_hash)
  }

  return (
    <div className="App">
      <div id="contenu">
        <h1 id="titre">Cluster de bruteforce de hash MD5</h1>

        <div id="blocMilieu">
          <table>
            <tbody>
              <tr>
                <td>Enter your text</td>
                <td><input type="text" onChange={_handleTextChange}/></td>
                <td><input type="button" value="Generate hash" onClick={_handleButtonClick}/></td>
              </tr>
              <tr>
                <td>Hash value</td>
                <td><input type="text" name="monHash" value={hashValue} readOnly={true}/></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
