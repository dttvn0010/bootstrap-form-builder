import { useSliceSelector } from '../utils/reduxHelper';

import useContextMenu from "../useContextMenu";
import MenuRow from "./MenuRow";
import MenuColumn from "./MenuColumn";
import MenuField from "./MenuField";

export default function Menu(){
  const { anchorPoint, show } = useContextMenu();
  let [
    selectedRow,
    selectedCol,
    selectedField
  ] = useSliceSelector('app', ['selectedRow', 'selectedCol', 'selectedField']);
  
  if (show) {
    if(selectedRow != null) {
      return <MenuRow anchorPoint={anchorPoint}/>
    }

    if(selectedCol) {
      return <MenuColumn anchorPoint={anchorPoint}/>;
    }

    if(selectedField) {
      return <MenuField anchorPoint={anchorPoint}/>
    }
  }
  return <></>;
}
