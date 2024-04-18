import discourseComputed from "discourse-common/utils/decorators";
import SelectKitRowComponent from "select-kit/components/select-kit/select-kit-row";

export default SelectKitRowComponent.extend({
  @discourseComputed("rowValue")
  imgSrc(rowValue) {
    return `theme_uploads.${rowValue}`;
  },
});
