import { useSliceStore } from '../utils/reduxHelper';

export default function MenuField({anchorPoint}){
  const store = useSliceStore('app');

  function editField() {
    let {selectedField, rows} = store.getState();
    let [rowIndex, colIndex] = selectedField.split('.');
    let row = rows[parseInt(rowIndex)];
    let column = row.columns[parseInt(colIndex)];
    store.setState({
      showFieldModal: true,
      editingField: {...column.field}
    });
  }

  function cutField() {
    let {selectedField, rows} = store.getState();
    let [rowIndex, colIndex] = selectedField.split('.');
    rowIndex = parseInt(rowIndex);
    colIndex = parseInt(colIndex);

    let row = rows[rowIndex];
    let column = row.columns[colIndex];

    let copiedField = column.field;

    let columns = [
      ...row.columns.slice(0, colIndex),
      {...column, field: null},
      ...row.columns.slice(colIndex+1)
    ];
    rows = [...rows.slice(0, rowIndex), {columns}, ...rows.slice(rowIndex+1)];

    store.setState({
      rows,
      copiedField,
      modified: true
    })
  }

  function copyField() {
    let {selectedField, rows} = store.getState();
    let [rowIndex, colIndex] = selectedField.split('.');
    rowIndex = parseInt(rowIndex);
    colIndex = parseInt(colIndex);

    let row = rows[rowIndex];
    let column = row.columns[colIndex];

    store.setState({
      rows,
      copiedField: column.field
    })
  }

  function deleteField() {
    if(!window.confirm('Do you want to delete this field?')) {
      return;
    }

    let {selectedField, rows} = store.getState();
    if(selectedField) {
      let [rowIndex, colIndex] = selectedField.split('.');
      rowIndex = parseInt(rowIndex);
      colIndex = parseInt(colIndex);
      let row = rows[rowIndex];
      let column = row.columns[colIndex];

      let columns = [
        ...row.columns.slice(0, colIndex),
        {...column, field: null},
        ...row.columns.slice(colIndex+1)
      ];
      rows = [...rows.slice(0, rowIndex), {columns}, ...rows.slice(rowIndex+1)];

      store.setState({
        rows,
        selectedCol: null,
        modified: true
      })
    }
  }

  return(
    <ul className="menu" style={{ top: anchorPoint.y, left: anchorPoint.x }}>
      <li className='px-2 py-1 my-1' onClick={editField}>Edit field</li>
      <li className='px-2 py-1 my-1' onClick={copyField}>Copy Field</li>
      <li className='px-2 py-1 my-1' onClick={cutField}>Cut Field</li>
      <li className='px-2 py-1 my-1' onClick={deleteField}>Delete field</li>
    </ul>
  )
}