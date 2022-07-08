import { useSliceSelector, useSliceStore } from '../utils/reduxHelper';

export default function MenuColumn({anchorPoint}) {
  const store = useSliceStore('app');
  const [selectedCol, rows, copiedField] = useSliceSelector('app', ['selectedCol', 'rows', 'copiedField']);
  let [rowIndex, colIndex] = selectedCol.split('.');
  let row = rows[parseInt(rowIndex)];
  let col = row.columns[parseInt(colIndex)];

  function deleteColumn(){
    if(!window.confirm('Do you want to delete this column?')) {
      return;
    }

    let {selectedCol, rows} = store.getState();
    if(selectedCol) {
      let [rowIndex, colIndex] = selectedCol.split('.');
      rowIndex = parseInt(rowIndex);
      colIndex = parseInt(colIndex);
      let row = rows[rowIndex];
      let columns = [
        ...row.columns.slice(0, colIndex),
        ...row.columns.slice(colIndex+1)
      ];
      rows = [...rows.slice(0, rowIndex), {columns}, ...rows.slice(rowIndex+1)];

      store.setState({
        rows,
        selectedCol: null,
        modified: true
      });
    }
  }

  function pasteField() {
    let {selectedCol, rows, copiedField} = store.getState();
    if(selectedCol) {
      let [rowIndex, colIndex] = selectedCol.split('.');
      rowIndex = parseInt(rowIndex);
      colIndex = parseInt(colIndex);
      let row = rows[rowIndex];
      let columns = row.columns;
      
      columns = [
        ...columns.slice(0, colIndex),
        {...columns[colIndex], field: copiedField},
        ...columns.slice(colIndex+1)
      ];
      rows = [...rows.slice(0, rowIndex), {columns}, ...rows.slice(rowIndex+1)];
      store.setState({
        rows,
        modified: true
      });
    }
  }

  function openFieldModal() {
    store.setState({
      editingField: {fieldType: "3"},
      showFieldModal: true
    });
  }

  return(
    <>
      <ul className="menu" style={{ top: anchorPoint.y, left: anchorPoint.x }}>
        {!col.field &&
          <>
            <li className='px-2 py-1 my-1' onClick={openFieldModal}>Add field</li>
            {copiedField &&
              <li className='px-2 py-1 my-1' onClick={pasteField}>Paste Field</li>
            }
          </>
        }
        <li className='px-2 py-1 my-1' onClick={deleteColumn}>Delete column</li>
      </ul>
      
    </>
  );
}