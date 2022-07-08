import { Modal } from 'react-bootstrap';
import { useSliceSelector, useSliceStore } from '../utils/reduxHelper';

export default function FieldModal() {
  const store = useSliceStore('app');
  let [showFieldModal, editingField] = useSliceSelector('app', ['showFieldModal', 'editingField']);
  editingField = editingField ?? {};
  let fieldOptions = editingField.options ?? [];

  function setEditingField(data) {
    let { editingField } = store.getState();

    store.setState({
      editingField: { ...editingField, ...data }
    })
  }

  function saveField() {
    let { selectedCol, selectedField, rows, editingField } = store.getState();
    let [rowIndex, colIndex] = (selectedCol || selectedField).split('.');
    rowIndex = parseInt(rowIndex);
    colIndex = parseInt(colIndex);

    const row = rows[rowIndex];
    const column = row.columns[colIndex];

    rows = [
      ...rows.slice(0, rowIndex),
      {
        columns: [
          ...row.columns.slice(0, colIndex),
          { ...column, field: { ...editingField } },
          ...row.columns.slice(colIndex + 1)
        ]
      },
      ...rows.slice(rowIndex + 1)
    ];

    store.setState({
      rows,
      showFieldModal: false,
      modified: true
    })
  }

  function addOption(index) {
    let { editingField } = store.getState();
    let options = editingField.options ?? [];

    options = [
      ...options.slice(0, index),
      {
        value: '',
        label: ''
      },
      ...options.slice(index),
    ];

    store.setState({
      editingField: { ...editingField, options }
    })
  }

  function setOption(index, data) {
    let { editingField } = store.getState();
    let option = editingField.options[index];
    let options = [
      ...editingField.options.slice(0, index),
      { ...option, ...data },
      ...editingField.options.slice(index + 1),
    ];
    store.setState({
      editingField: { ...editingField, options }
    });
  }

  function deleteOption(index) {
    let { editingField } = store.getState();
    let options = [
      ...editingField.options.slice(0, index),
      ...editingField.options.slice(index + 1),
    ];
    store.setState({
      editingField: { ...editingField, options }
    });
  }

  function hide() {
    store.setState({ showFieldModal: false });
  }

  return (
    <Modal size="lg" show={showFieldModal} onHide={hide}>
      <Modal.Header closeButton>
        <Modal.Title>
          Field Settings
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className='col-3'>
            <label className='mb-2 bold'>Field Type:</label>
            <select
              className='form-control'
              value={editingField.fieldType ?? ''}
              onChange={e => setEditingField({ fieldType: e.target.value })}
            >
              <option value="1">Label</option>
              <option value="2">Button</option>
              <option value="3">Input</option>
              <option value="4">Text Area</option>
              <option value="5">File upload</option>
              <option value="6">Select</option>
              <option value="7">Radio Buttons</option>
              <option value="8">CheckBoxes</option>
            </select>
          </div>

          <div className='col-3'>
            <label className='mb-2 bold'>Id:</label>
            <input
              className="form-control"
              value={editingField.id ?? ''}
              onChange={e => setEditingField({ id: e.target.value })}
            />
          </div>

          <div className='col-6'>
            {editingField.fieldType > "2" &&
              <div>
                <label className='mb-2 bold'>Field Label:</label>
                <label className="float-end bold">
                  <input type="checkbox" className="form-check-input"
                    checked={editingField.fieldLabelBold ?? false}
                    onChange={e => setEditingField({ fieldLabelBold: e.target.checked })}
                  />
                  {" "}Bold
                </label>
              </div>
            }
            {editingField.fieldType <= "2" && <label className='mb-2 bold'>Text:</label>}
            <input
              className="form-control"
              value={editingField.fieldLabel ?? ''}
              onChange={e => setEditingField({ fieldLabel: e.target.value })}
            />
          </div>
        </div>

        <div className="row mt-3">
          <div className='col-3'>
            <label className='mb-2 bold'>Alignment:</label>
            <select
              className="form-control"
              value={editingField.alignment ?? ''}
              onChange={e => setEditingField({ alignment: e.target.value })}
            >
              <option value=""></option>
              <option value="start">Left</option>
              <option value="center">Center</option>
              <option value="end">Right</option>
            </select>
          </div>

          <div className='col-3'>
            <label className='mb-2 bold'>Width:</label>
            <input
              className="form-control"
              value={editingField.width ?? ''}
              onChange={e => setEditingField({ width: e.target.value })}
            />
          </div>

          <div className='col-3'>
            <label className='mb-2 bold'>Max width:</label>
            <input
              className="form-control"
              value={editingField.maxWidth ?? ''}
              onChange={e => setEditingField({ maxWidth: e.target.value })}
            />
          </div>

          <div className='col-3'>
            <label className='mb-2 bold'>Padding:</label>
            <input
              className="form-control"
              value={editingField.padding ?? ''}
              onChange={e => setEditingField({ padding: e.target.value })}
            />
          </div>
        </div>

        <div className="row mt-3">
          {editingField.fieldType === '1' &&
            <>
              <div className='col-3'>
                <label className='mb-2 bold'>Font size:</label>
                <input
                  type="number"
                  min="1"
                  className="form-control"
                  value={editingField.fontSize ?? ''}
                  onChange={e => setEditingField({ fontSize: e.target.value })}
                />
              </div>
              <div className='col-3'>
                <label className='mb-2 bold'>Font weight:</label>
                <input
                  className="form-control"
                  value={editingField.fontWeight ?? ''}
                  onChange={e => setEditingField({ fontWeight: e.target.value })}
                />
              </div>
            </>
          }
          {editingField.fieldType === '2' &&
            <>
              <div className='col-3'>
                <label className='mb-2 bold'>Size:</label>
                <select
                  className="form-control"
                  value={editingField.size ?? ''}
                  onChange={e => setEditingField({ size: e.target.value })}
                >
                  <option value="normal">Normal</option>
                  <option value="small">Small</option>
                </select>
              </div>
              <div className='col-3'>
                <label className='mb-2 bold'>Variant:</label>
                <select
                  className="form-control"
                  value={editingField.variant ?? ''}
                  onChange={e => setEditingField({ variant: e.target.value })}
                >
                  <option value></option>
                  <option value="primary">Primary</option>
                  <option value="secondary">Secondary</option>
                  <option value="success">Success</option>
                  <option value="warning">Warning</option>
                  <option value="danger">Danger</option>
                </select>
              </div>
            </>
          }

          {editingField.fieldType === '3' &&
            <div className='col-3'>
              <label className='mb-2 bold'>Input type:</label>
              <select
                className="form-control"
                value={editingField.inputType ?? ''}
                onChange={e => setEditingField({ inputType: e.target.value })}
              >
                <option value="text">Text</option>
                <option value="number">Number</option>
                <option value="password">Password</option>
              </select>
            </div>
          }

          {editingField.fieldType === '4' &&
            <div className='col-3'>
              <label className='mb-2 bold'>Number of rows:</label>
              <input
                className="form-control"
                value={editingField.rows ?? ''}
                onChange={e => setEditingField({ rows: e.target.value })}
              />
            </div>
          }

          {editingField.fieldType === '3' && editingField.inputType === 'number' &&
            <>
              <div className='col-3'>
                <label className='mb-2 bold'>Min value:</label>
                <input
                  type="number"
                  className="form-control"
                  value={editingField.minValue ?? ''}
                  onChange={e => setEditingField({ minValue: e.target.value })}
                />
              </div>
              <div className='col-3'>
                <label className='mb-2 bold'>Max value:</label>
                <input
                  type="number"
                  className="form-control"
                  value={editingField.maxValue ?? ''}
                  onChange={e => setEditingField({ maxValue: e.target.value })}
                />
              </div>
            </>
          }
        </div>

        {editingField.fieldType >= 6 &&
          <>
            <hr className="mt-2" />
            <div className="row">
              <div className="col"><h5><u>Option List:</u></h5></div>
            </div>
            <div className="row mt-2">
              <div className="col">
                <table className='table table-bordered'>
                  <thead>
                    <tr>
                      <th style={{ width: "38%" }}>Value</th>
                      <th style={{ width: "50%" }}>Label</th>
                      <th style={{ width: "12%" }} className="text-center">
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {fieldOptions.length === 0 &&
                      <tr>
                        <td colSpan="3">No options yet.</td>
                      </tr>
                    }
                    {fieldOptions.map((option, i) =>
                      <tr key={i}>
                        <td>
                          <input
                            className="form-control" value={option.value}
                            onChange={e => setOption(i, { value: e.target.value })}
                          />
                        </td>
                        <td>
                          <input
                            className="form-control" value={option.label}
                            onChange={e => setOption(i, { label: e.target.value })}
                          />
                        </td>
                        <td className="text-center">
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={() => addOption(i)}
                          >
                            <i className="fas fa-plus"></i>
                          </button>

                          {" "}

                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => deleteOption(i)}
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
                <div>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => addOption(fieldOptions.length)}
                  >
                    <i className="fas fa-plus"></i>
                  </button>
                </div>
              </div>
            </div>
          </>
        }
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-primary" onClick={saveField}>
          Save
        </button>
      </Modal.Footer>
    </Modal>
  )
}