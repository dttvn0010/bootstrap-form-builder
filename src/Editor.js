
import { useSliceSelector, useSliceStore } from './utils/reduxHelper';
import RowModal from "./modal/RowModal";
import FieldModal from "./modal/FieldModal";
import LoadFormModal from "./modal/LoadFormModal";
import SaveFormModal from "./modal/SaveFormModal";
import Menu from "./menu/Menu";
import { useEffect } from 'react';

export default function Editor() {
  const store = useSliceStore('app');
  let [
    rows,
    selectedRow,
    selectedCol,
    selectedField,
    formSettings
  ] = useSliceSelector('app', ['rows', 'selectedRow', 'selectedCol', 'selectedField', 'formSettings']);
  rows = rows ?? [];
  formSettings = formSettings ?? {};

  function openRowModal() {
    store.setState({
      showRowModal: true,
      removeColumns: false,
      editingRow: {}
    });
  }

  function selectRow(index) {
    store.setState({
      selectedRow: index === selectedRow ? null : index,
      selectedCol: null,
      selectedField: null,
      showMenu: false
    });
  }

  function selectColumn(rowIndex, colIndex) {
    const newSelectedCol = `${rowIndex}.${colIndex}`;
    store.setState({
      selectedCol: newSelectedCol === selectedCol ? null : newSelectedCol,
      selectedRow: null,
      selectedField: null,
      showMenu: false
    });
  }

  function selectField(rowIndex, colIndex) {
    const newSelectedField = `${rowIndex}.${colIndex}`;
    store.setState({
      selectedField: newSelectedField === selectedField ? null : newSelectedField,
      selectedRow: null,
      selectedCol: null,
      showMenu: false
    });
  }

  function newForm() {
    const { modified } = store.getState();
    if (modified && !window.confirm("Current form has not been saved. Do you want to continue?")) {
      return;
    }

    store.setState({
      rows: [],
      formSettings: {}
    });
  }

  function openSaveFormModal() {
    store.setState({
      showSaveFormModal: true,
    });
  }

  function openLoadFormModal() {
    store.setState({
      showLoadFormModal: true,
    });
  }

  function beforePageRefresh(e) {
    e.preventDefault();
    e.returnValue = "";
  }

  useEffect(() => {
    window.addEventListener("beforeunload", beforePageRefresh);
    return () => {
      window.removeEventListener("beforeunload", beforePageRefresh);
    };
  }, []);

  return (
    <div className="pt-3">
      <button className="btn btn-sm btn-success my-3" onClick={newForm}>
        <i className="fas fa-file"></i>
      </button>

      {" "}

      <button className="btn btn-sm btn-success my-3" onClick={openLoadFormModal}>
        <i className="fas fa-folder-open"></i>
      </button>

      {" "}

      <button className="btn btn-sm btn-success my-3" onClick={openSaveFormModal}>
        <i className="fas fa-save"></i>
      </button>
      <hr className="mt-0" />


      <div
        style={{
          width: formSettings.width,
          maxWidth: formSettings.maxWidth,
          margin: formSettings.margin,
          padding: formSettings.padding,
          border: formSettings.border,
          borderRadius: formSettings.borderRadius,
          background: formSettings.backgroundColor
        }}
      >
        {rows.map((row, index) =>
          <div key={index}
            className="row gx-3 m-1"
            onClick={(e) => { e.stopPropagation(); selectRow(index) }}
            style={{
              margin: row.margin,
              padding: row.padding || "0.25rem 0.35rem",
              minHeight: 60,
              border: "1px solid #AAA",
              backgroundColor: index === selectedRow ? '#f1f9ff' : null
            }}
          >
            {row.columns && row.columns.map((col, colIndex) =>
              <div key={colIndex}
                className={
                  `col-${col.width}` +
                  (col.offset ? ` offset-${col.offset}` : '') +
                  (col.field?.alignment ? ` text-${col.field.alignment}` : '')
                }
                onClick={(e) => { e.stopPropagation(); selectColumn(index, colIndex); }}
                style={{
                  padding: "0.25rem 0.35rem",
                  border: "1px solid #AAA",
                  backgroundColor: `${index}.${colIndex}` === selectedCol ? '#f1f9ff' : null
                }}
              >
                {col.field &&
                  <div
                    onClick={(e) => { e.stopPropagation(); selectField(index, colIndex); }}
                    style={{
                      padding: "0.35rem 0.35rem",
                      backgroundColor: `${index}.${colIndex}` === selectedField ? '#f1f9ff' : null
                    }}
                  >
                    {col.field.fieldType === '1' &&
                      <label style={{
                        width: col.field.width,
                        maxWidth: col.field.maxWidth,
                        margin: col.field.padding,
                        fontSize: col.field.fontSize ? col.field.fontSize + "px" : null,
                        fontWeight: col.field.fontWeight
                      }}
                      >
                        {col.field.fieldLabel}
                      </label>
                    }

                    {col.field.fieldType === '2' &&
                      <button
                        className={
                          'btn' +
                          (col.field.size === 'small' ? ' btn-sm' : '') +
                          (col.field.variant ? ` btn-${col.field.variant}` : '')
                        }
                        style={{
                          width: col.field.width,
                          maxWidth: col.field.maxWidth,
                          margin: col.field.padding
                        }}
                      >
                        {col.field.fieldLabel}
                      </button>
                    }

                    {col.field.fieldType === '3' &&
                      <div style={{
                        width: col.field.width,
                        maxWidth: col.field.maxWidth,
                        margin: col.field.padding
                      }}
                      >
                        {col.field.fieldLabel &&
                          <label className={
                            "mb-1" + (col.field.fieldLabelBold ? " bold" : "")
                          }
                          >
                            {col.field.fieldLabel}:
                          </label>
                        }
                        <input name={col.field.name}
                          type={col.field.inputType}
                          min={col.field.minValue}
                          max={col.field.maxValue}
                          className='form-control'
                        />
                      </div>
                    }

                    {col.field.fieldType === '4' &&
                      <div style={{
                        width: col.field.width,
                        maxWidth: col.field.maxWidth,
                        margin: col.field.padding
                      }}
                      >
                        {col.field.fieldLabel &&
                          <label className={
                            "mb-1" + (col.field.fieldLabelBold ? " bold" : "")
                          }
                          >
                            {col.field.fieldLabel}:
                          </label>
                        }
                        <textarea name={col.field.name}
                          className='form-control'
                          rows={col.field.rows}
                        />
                      </div>
                    }

                    {col.field.fieldType === '5' &&
                      <div style={{
                        width: col.field.width,
                        maxWidth: col.field.maxWidth,
                        margin: col.field.padding
                      }}
                      >
                        {col.field.fieldLabel &&
                          <label className={
                            "mb-1" + (col.field.fieldLabelBold ? " bold" : "")
                          }
                          >
                            {col.field.fieldLabel}:
                          </label>
                        }
                        <div className="mt-1">
                          <input type="file"
                            name={col.field.name}
                            className='form-control'
                          />
                        </div>
                      </div>
                    }

                    {col.field.fieldType === '6' &&
                      <div style={{
                        width: col.field.width,
                        maxWidth: col.field.maxWidth,
                        margin: col.field.padding
                      }}
                      >
                        {col.field.fieldLabel &&
                          <label className={
                            "mb-1" + (col.field.fieldLabelBold ? " bold" : "")
                          }
                          >
                            {col.field.fieldLabel}:
                          </label>
                        }
                        <select name={col.field.name}
                          className='form-control'
                        >
                          <option value>---------</option>
                          {(col.field.options ?? []).map((field, fieldIndex) =>
                            <option value={field.value} key={fieldIndex}>
                              {field.label}
                            </option>
                          )}
                        </select>
                      </div>
                    }

                    {(col.field.fieldType === '7' || col.field.fieldType === '8') &&
                      <div className="mt-2"
                        style={{
                          width: col.field.width,
                          maxWidth: col.field.maxWidth,
                          margin: col.field.padding
                        }}
                      >
                        {col.field.fieldLabel &&
                          <label className={
                            "mb-1" + (col.field.fieldLabelBold ? " bold" : "")
                          }
                          >
                            {col.field.fieldLabel}:
                          </label>
                        }
                        <div>
                          {(col.field.options ?? []).map((field, fieldIndex) =>
                            <span>
                              <input name={col.field.id}
                                type={col.field.fieldType === '7' ? 'radio' : 'checkbox'}
                                className="form-check-input"
                                value={field.value}
                              />
                              {" "}
                              <label key={fieldIndex} className="me-3">
                                {field.label}
                              </label>
                            </span>
                          )}
                        </div>
                      </div>
                    }
                  </div>
                }
              </div>
            )}
          </div>
        )}
      </div>
      <button className="btn btn-sm btn-primary my-3" onClick={openRowModal}>
        <i className="fas fa-plus"></i> Add row
      </button>

      <Menu />
      <RowModal />
      <FieldModal />
      <LoadFormModal />
      <SaveFormModal />
    </div>
  )
}
