import { apiInitializer } from "discourse/lib/api";
import { createWidget } from "discourse/widgets/widget";
import ComponentConnector from "discourse/widgets/component-connector";

export default apiInitializer("0.11.1", (api) => {
  const siteSettings = api.container.lookup("site-settings:main");
  const currentUser = api.getCurrentUser();

  if (currentUser && siteSettings.allow_user_locale) {
    createWidget("header-locale-selector-widget", {
      buildKey: () => "header-locale-selector-widget",
      tagName: "li",

      html() {
        return new ComponentConnector(this, "locale-selector", {
          layoutName: "components/locale-selector",
        });
      },
    });

    api.addToHeaderIcons("header-locale-selector-widget");
  }
});
