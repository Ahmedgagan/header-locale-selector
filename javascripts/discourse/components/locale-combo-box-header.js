import { computed } from "@ember/object";
import { and, reads } from "@ember/object/computed";
import discourseComputed from "discourse-common/utils/decorators";
import SingleSelectHeaderComponent from "select-kit/components/select-kit/single-select-header";

export default SingleSelectHeaderComponent.extend({
  classNames: ["combo-box-header"],
  clearable: reads("selectKit.options.clearable"),
  caretUpIcon: reads("selectKit.options.caretUpIcon"),
  caretDownIcon: reads("selectKit.options.caretDownIcon"),
  shouldDisplayClearableButton: and("clearable", "value"),

  caretIcon: computed(
    "selectKit.isExpanded",
    "caretUpIcon",
    "caretDownIcon",
    function () {
      return this.selectKit.isExpanded ? this.caretUpIcon : this.caretDownIcon;
    }
  ),

  @discourseComputed("selectedContent")
  imgSrc(selectedContent) {
    return `theme_uploads.${selectedContent.value}`;
  },
});
