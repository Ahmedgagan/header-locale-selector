import { ajax } from "discourse/lib/ajax";
import { apiInitializer } from "discourse/lib/api";
import LocaleSelector from "../components/locale-selector";

export default apiInitializer("1.28.0", (api) => {
  const siteSettings = api.container.lookup("site-settings:main");
  const currentUser = api.getCurrentUser();

  if (currentUser && siteSettings.allow_user_locale) {
    api.headerIcons.add(
      "locale-selector",
      <template>
        <li class="header-locale-selector-widget"><LocaleSelector /></li>
      </template>,
      {
        before: api.headerIcons.has("chat") ? "chat" : "search",
      }
    );

    api.onPageChange(() => {
      document.querySelectorAll('.post-action-menu__translate').forEach(btn => {
        btn.click(); // This simulates a user click; may need tweaks for your setup.
      });
    });
  }
});
