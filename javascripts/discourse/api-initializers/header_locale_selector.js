import { ajax } from "discourse/lib/ajax";
import { popupAjaxError } from "discourse/lib/ajax-error";
import { apiInitializer } from "discourse/lib/api";
import ComponentConnector from "discourse/widgets/component-connector";
import { createWidget } from "discourse/widgets/widget";

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

    api.reopenWidget("post-menu", {
      didRenderWidget() {
        if (!this.attrs.can_translate) {
          return;
        }

        if (this.state.isTranslated) {
          return;
        }

        if (this.state.isTranslating) {
          return;
        }

        if (this.state.translateError) {
          return;
        }

        this.state.isTranslated = true;
        this.state.isTranslating = true;
        this.scheduleRerender();
        const post = this.findAncestorModel();

        ajax("/translator/translate", {
          type: "POST",
          data: { post_id: post.get("id") },
        })
          .then(function (res) {
            post.setProperties({
              translated_text: res.translation,
              detected_lang: res.detected_lang,
            });
          })
          .finally(() => {
            this.state.isTranslating = false;
            this.scheduleRerender();
          })
          .catch((error) => {
            this.state.isTranslated = false;
            this.state.translateError = true;
            this.scheduleRerender();
          });
      },
    });
  }
});
