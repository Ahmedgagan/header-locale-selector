import Component from "@ember/component";
import discourseComputed from "discourse-common/utils/decorators";
import { action } from "@ember/object";
import { ajax } from "discourse/lib/ajax";
import { userPath } from "discourse/lib/url";

export default Component.extend({
  @discourseComputed()
  availableLocales() {
    return JSON.parse(this.siteSettings.available_locales);
  },

  @action
  onChangeLocale(value) {
    this.set("currentUser.locale", value);
    ajax(userPath(`${this.currentUser.username_lower}.json`), {
      data: { locale: this.currentUser.locale },
      type: "PUT",
    }).then((val) => {
      location.reload();
    });
  },

  defaultItem() {
    const currentUserLocale = document
      .getElementsByTagName("html")[0]
      .getAttribute("lang")
      .replaceAll("-", "_");

    if (currentUserLocale) {
      return this.content.find((val) => val.value === currentUserLocale);
    }

    return this.content.find(
      (val) => val.value === this.siteSettings.default_locale
    );
  },
});
