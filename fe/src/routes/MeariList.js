import ListContent from "../componentes/ListContent";
import { useList } from "../hooks/useList";
function MeariList({ mvalue }) {
  const lists = useList(mvalue);
  return <div id="mearilist"></div>;
}

export default MeariList;
