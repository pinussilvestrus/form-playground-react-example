import { useEffect, useRef } from 'react';

import { CamundaFormPlayground } from '@camunda/form-playground';

import './App.css';

import '@camunda/form-playground/dist/assets/form-js.css';
import '@camunda/form-playground/dist/assets/dragula.css';
import '@camunda/form-playground/dist/assets/form-js-editor.css';
import '@camunda/form-playground/dist/assets/properties-panel.css';
import '@camunda/form-playground/dist/assets/camunda-form-playground.css';

const data = {
  creditor: 'John Doe Company'
}

const schema = {
  components: [
    {
      "key": "creditor",
      "label": "Creditor",
      "type": "textfield",
      "validate": {
        "required": true
      }
    }
  ],
  type: "default"
}

function App() {

  const playgroundRef = useRef(null);
  const formPlayground = useRef(null);
  
  useEffect(() => {
    formPlayground.current = new CamundaFormPlayground({
      schema,
      data
    });
  }, [])

  useEffect(() => {
    const initialize = () => {
      formPlayground.current.attachTo(playgroundRef.current)
    }

    const once = (type, fn) => {
      formPlayground.current.on(type, fn);
      formPlayground.current.on(type, formPlayground.current.off.bind(formPlayground.current, type, fn));
    };

    once('formPlayground.init', initialize);

    return () => {
      formPlayground.current.off('formPlayground.init', initialize);
    }
  }, [ formPlayground ]);

  return (
    <div className="app">
      <div 
        ref={playgroundRef}
        className='playground-container'>
      </div>
    </div>
  );
}

export default App;
