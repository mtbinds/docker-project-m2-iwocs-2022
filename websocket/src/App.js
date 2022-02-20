import {useState, useEffect} from 'react';
import './App.css';

import {generateHash} from './util/md5';
import isDef from './util/is-def';
import nameGenerator from './util/name-generator';
import {BehaviourFactory} from './Behaviour';
import {getSocketName} from "./util/cookie";

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
  const [behaviour, setBehaviour] = useState('normal');
  let behaviourFactory = new BehaviourFactory();

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
   * send message depending on behaviour
   * @param value
   * @param behaviour
   */
  const sendMessage = ({ value, behaviour = 'normal' }) => {
    behaviourFactory.createBehaviour(behaviour).compute(()=> {
      const stringValue = JSON.stringify(value);
      connection.send(stringValue);
    });
  }

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
    sendMessage({ value: {
        _hash: _hash,
        user: getSocketName(document)
      },
      behaviour
    });
  }

  const _handleBehaviourChange = ({ target: { value }}) => {
    setBehaviour(value);
  }

  return (
    <div className="App">
      <div id="content">
        <h1 id="title">Cluster de bruteforce de hash MD5</h1>
        <div>
          <select value={behaviour} onChange={_handleBehaviourChange}>
            <option value="gentle">Gentil</option>
            <option value="normal">Normal</option>
            <option value="aggressive">Agressif</option>
          </select>
        </div>
        <div id="middle_block">
          <table>
            <tbody>
              <tr>
                <td>Enter your text</td>
                <td><input type="text" onChange={_handleTextChange}/></td>
                <td><input type="button" value="Generate hash" onClick={_handleButtonClick} disabled={text === ''}/></td>
              </tr>
              <tr>
                <td>Hash value</td>
                <td><input type="text" value={hashValue} readOnly={true}/></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
