import { Tabs, Tab } from 'react-bootstrap';
import Code from './Code';
import Editor from './Editor';
import FormSettings from './FormSettings';
import './App.css';

export default function App() {

  return (
    <div className='container mt-3'>
      <Tabs defaultActiveKey='editor'>
        <Tab eventKey='editor' title='Editor'>
          <Editor />
        </Tab>
        <Tab eventKey='formSettings' title='Form Settings'>
          <FormSettings />
        </Tab>
        <Tab eventKey='code' title='Code'>
          <Code />
        </Tab>
      </Tabs>
    </div>
  )
}