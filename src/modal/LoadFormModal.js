import { Modal } from 'react-bootstrap';
import { useSliceSelector, useSliceStore } from '../utils/reduxHelper';

export default function LoadFormModal() {
  const store = useSliceStore('app');
  const [showLoadFormModal] = useSliceSelector('app', ['showLoadFormModal']);

  function loadForm(e) {
    const { modified } = store.getState();

    if (modified && !window.confirm("Current form has not been saved? Do you want to continue?")) {
      store.setState({
        showLoadFormModal: false
      });
      return;
    }

    let files = e.target.files;
    let reader = new FileReader();

    reader.onload = function (e) {
      store.setState({
        ...JSON.parse(e.target.result),
        showLoadFormModal: false,
        modified: false
      });
    }

    reader.readAsText(files[0]);
  }

  function hide() {
    store.setState({
      showLoadFormModal: false
    });
  }

  return (
    <Modal show={showLoadFormModal} onHide={hide}>
      <Modal.Header closeButton>
        <Modal.Title>
          Load form from file
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <label className="mb-1">Select a file to load:</label>
          <input id="file" className="form-control" type="file"
            onChange={loadForm}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-secondary" onClick={hide}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  )
}