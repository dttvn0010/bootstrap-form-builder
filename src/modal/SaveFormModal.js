import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useSliceSelector, useSliceStore } from '../utils/reduxHelper';

export default function SaveFormModal() {
  const store = useSliceStore('app');
  const [showSaveFormModal] = useSliceSelector('app', ['showSaveFormModal']);
  const [fileName, setFileName] = useState("");

  function saveForm() {
    if (fileName.trim() === '') {
      alert("Please enter a valid file name.");
      return;
    }
    let savedFileName = fileName;

    if (!savedFileName.endsWith(".json")) {
      savedFileName += ".json";
    }

    const { rows, formSettings } = store.getState();
    const data = JSON.stringify({ rows, formSettings });
    var link = document.createElement('a');
    link.setAttribute('download', savedFileName);
    link.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(data));
    link.click();

    store.setState({
      modified: false,
      showSaveFormModal: false
    });
  }

  function hide() {
    store.setState({
      showSaveFormModal: false
    });
  }

  return (
    <Modal show={showSaveFormModal} onHide={hide}>
      <Modal.Header closeButton>
        <Modal.Title>
          Save Form As
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <label className="mb-1">File name:</label>
          <input className="form-control" type="text" value={fileName}
            onChange={e => setFileName(e.target.value)}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-primary" onClick={saveForm}>
          Save
        </button>
      </Modal.Footer>
    </Modal>
  )
}