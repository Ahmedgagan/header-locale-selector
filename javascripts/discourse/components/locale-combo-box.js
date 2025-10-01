import { gte } from "@ember/object/computed";
import SingleSelectComponent from "select-kit/components/single-select";
import Header from "./locale-combo-box/header"
import Row from "./locale-combo-box/row"

export default SingleSelectComponent.extend({
  pluginApiIdentifiers: ["combo-box"],
  classNames: ["combobox", "combo-box"],

  selectKitOptions: {
    caretUpIcon: "caret-up",
    caretDownIcon: "caret-down",
    autoFilterable: "autoFilterable",
    headerComponent: Header,
  },

  autoFilterable: gte("content.length", 10),

  modifyComponentForRow() {
    return Row;
  },
});
