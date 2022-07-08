import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { genHtml } from '../codeGen';
import { useSliceSelector, useSliceStore } from '../utils/reduxHelper';

export default function ExportHtmlModal() {
  const store = useSliceStore('app');
  const [showExportHtmlModal] = useSliceSelector('app', ['showExportHtmlModal']);
  const [fileName, setFileName] = useState("");

  function exportToHtml() {
    if (fileName.trim() === '') {
      alert("Please enter a valid file name.");
      return;
    }
    let savedFileName = fileName;

    if (!savedFileName.endsWith(".html")) {
      savedFileName += ".html";
    }

    const { rows, formSettings } = store.getState();
    const html = genHtml(rows, formSettings);
    var link = document.createElement('a');
    link.setAttribute('download', savedFileName);
    link.setAttribute('href', 'data:text/html;charset=utf-8,' + encodeURIComponent(html));
    link.click();
    hide();
  }

  function hide() {
    store.setState({
      showExportHtmlModal: false
    });
  }

  return (
    <Modal show={showExportHtmlModal} onHide={hide}>
      <Modal.Header closeButton>
        <Modal.Title>
          Export to Html file
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
        <button className="btn btn-primary" onClick={exportToHtml}>
          Export
        </button>
      </Modal.Footer>
    </Modal>
  )
}