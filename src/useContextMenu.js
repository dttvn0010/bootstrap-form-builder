
import { useEffect, useCallback, useState } from "react";
import { useSliceSelector, useSliceStore } from './utils/reduxHelper';

const useContextMenu = () => {
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
  const store = useSliceStore('app');
  const [show] = useSliceSelector('app', ['showMenu'])

  const handleContextMenu = useCallback(
    (event) => {
      event.preventDefault();
      setAnchorPoint({ x: event.pageX, y: event.pageY });
      store.setState({showMenu: true});
    },
    [setAnchorPoint, store]
  );

  const handleClick = useCallback(
    e => {
      store.setState({
        showMenu: false,
        //selectedRow: null,
        //selectedCol: null,
        //selectedField: null,
      });
    },
    [store]
  );

  useEffect(() => {
    document.addEventListener("click", handleClick);
    document.addEventListener("contextmenu", handleContextMenu);
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("click", handleClick);
    };
  });
  return { anchorPoint, show };
};

export default useContextMenu;