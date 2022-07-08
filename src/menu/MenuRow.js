import { useSliceStore } from '../utils/reduxHelper';

export default function MenuRow({anchorPoint}) {
  const store = useSliceStore('app');

  function addRowAbove() {
    let {selectedRow, rows} = store.getState();
    rows = [
      ...rows.slice(0, selectedRow),
      {columns: []},
      ...rows.slice(selectedRow),
    ];
    store.setState({rows, modified: true});
  }

  function addRowBelow() {
    let {selectedRow, rows} = store.getState();
    rows = [
      ...rows.slice(0, selectedRow+1),
      {columns: []},
      ...rows.slice(selectedRow+1),
    ];
    store.setState({rows, modified: true});
  }

  function editRow() {
    let {selectedRow, rows} = store.getState();
    let row = rows[selectedRow];
    store.setState({
      removeColumns: false,
      showRowModal: true,
      editingRow: {...row, index: selectedRow}
    });
  }

  function deleteRow() {
    if(!window.confirm('Do you want to delete this row?')) {
      return;
    }

    let {selectedRow, rows} = store.getState();
    if(selectedRow != null) {
      rows =  (rows ?? []);
      rows = [...rows.slice(0, selectedRow), ...rows.slice(selectedRow+1)];
      store.setState({
        rows: rows,
        selectedRow: null,
        modified: true
      });
    }
  }

  return(
    <ul className="menu" style={{ top: anchorPoint.y, left: anchorPoint.x }}>
      <li className='px-2 py-1 my-1' onClick={addRowAbove}>Add row above</li>
      <li className='px-2 py-1 my-1' onClick={addRowBelow}>Add row below</li>
      <li className='px-2 py-1 my-1' onClick={editRow}>Edit row</li>
      <li className='px-2 py-1 my-1' onClick={deleteRow}>Delete row</li>
    </ul>
  );
}