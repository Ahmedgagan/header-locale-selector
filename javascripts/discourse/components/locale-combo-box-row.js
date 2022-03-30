import SelectKitRowComponent from "select-kit/components/select-kit/select-kit-row";
import discourseComputed from "discourse-common/utils/decorators";

export default SelectKitRowComponent.extend({
  @discourseComputed("rowValue")
  imgSrc(rowValue) {
    return `theme_uploads.${rowValue}`;
  },
});
