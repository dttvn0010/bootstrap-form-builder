import { Modal } from 'react-bootstrap';
import { useSliceSelector, useSliceStore } from '../utils/reduxHelper';

export default function RowModal() {
  const store = useSliceStore('app');
  let [showRowModal, editingRow] = useSliceSelector('app', ['showRowModal', 'editingRow']);
  editingRow = editingRow ?? {};
  let columns = editingRow.columns ?? [];

  function addColumn(index) {
    let { editingRow } = store.getState();
    let columns = (editingRow.columns ?? []);

    columns = [
      ...columns.slice(0, index),
      {
        width: '',
        offset: ''
      },
      ...columns.slice(index),
    ];

    store.setState({
      editingRow: { ...editingRow, columns }
    })
  }

  function setRow(data) {
    let { editingRow } = store.getState();
    store.setState({
      editingRow: { ...editingRow, ...data }
    });
  }

  function setColumn(index, data) {
    let { editingRow } = store.getState();
    let column = editingRow.columns[index];
    let columns = [
      ...editingRow.columns.slice(0, index),
      { ...column, ...data },
      ...editingRow.columns.slice(index + 1),
    ];
    store.setState({
      editingRow: { ...editingRow, columns }
    });
  }

  function deleteColumn(index) {
    let { editingRow } = store.getState();
    let columns = [
      ...editingRow.columns.slice(0, index),
      ...editingRow.columns.slice(index + 1),
    ];
    store.setState({
      removeColumns: true,
      editingRow: { ...editingRow, columns }
    });
  }

  function saveRow() {
    let { rows, editingRow, removeColumns } = store.getState();
    rows = rows ?? [];

    if (removeColumns) {
      if (!window.confirm('Some columns will be removed, do you want to continue?')) {
        return;
      }
    }

    if (editingRow.index != null) {
      const index = editingRow.index;
      rows = [...rows.slice(0, index), editingRow, ...rows.slice(index + 1)];
    } else {
      rows = [...rows, editingRow];
    }
    store.setState({
      rows,
      showRowModal: false,
      modified: true
    });
  }

  return (
    <Modal size="lg" show={showRowModal} onHide={() => store.setState({ showRowModal: false })}>
      <Modal.Header closeButton>
        <Modal.Title>
          Row Settings
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-6">
            <label className="mb-1 bold">Margin:</label>
            <input className="form-control"
              value={editingRow.margin ?? ''}
              onChange={e => setRow({ margin: e.target.value })}
            />
          </div>
          <div className="col-6">
            <label className="mb-1 bold">Padding:</label>
            <input className="form-control"
              value={editingRow.padding ?? ''}
              onChange={e => setRow({ padding: e.target.value })}
            />
          </div>
        </div>

        <div className="row mt-3">
          <div className="col">
            <h5><u>Column List:</u></h5>
          </div>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th className="text-center" style={{ width: "5%" }}>#</th>
              <th className="text-center" style={{ width: "10%" }}>Id</th>
              <th className="text-center" style={{ width: "35%" }}>Width (1-12)</th>
              <th className="text-center" style={{ width: "35%" }}>Offset (1-12)</th>
              <th className="text-center" style={{ width: "15%" }}>
              </th>
            </tr>
          </thead>
          <tbody>
            {columns.length === 0 &&
              <tr>
                <td colSpan="5">No columns yet</td>
              </tr>
            }
            {columns.map((col, colIndex) =>
              <tr key={colIndex}>
                <td className="text-center">{colIndex + 1}</td>
                <td className="text-center">{col.field?.id}</td>
                <td className="text-center">
                  <input type="number"
                    min="1" max="12"
                    className="form-control"
                    value={col.width ?? ''}
                    onChange={e => setColumn(colIndex, { width: e.target.value })}
                  />
                </td>
                <td className="text-center">
                  <input type="number"
                    min="0" max="12"
                    className="form-control"
                    value={col.offset ?? ''}
                    onChange={e => setColumn(colIndex, { offset: e.target.value })}
                  />
                </td>
                <td className="text-center">
                  <button className="btn btn-sm btn-primary" onClick={() => addColumn(colIndex)}>
                    <i className="fas fa-plus"></i>
                  </button>
                  {" "}
                  <button className="btn btn-sm btn-danger" onClick={() => deleteColumn(colIndex)}>
                    <i className="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <button className="btn btn-sm btn-primary" onClick={() => addColumn(columns.length)}>
          <i className="fas fa-plus"></i>
        </button>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-primary" onClick={saveRow}>
          Save
        </button>
      </Modal.Footer>
    </Modal>
  )
}