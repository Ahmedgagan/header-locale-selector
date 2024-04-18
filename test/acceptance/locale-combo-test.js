import { settled, visit } from "@ember/test-helpers";
import { test } from "qunit";
import { userPath } from "discourse/lib/url";
import { acceptance } from "discourse/tests/helpers/qunit-helpers";
import selectKit from "discourse/tests/helpers/select-kit-helper";

acceptance("Locale Combo Box - Guest", function (needs) {
  test("viewing dropdown list", async function (assert) {
    await visit("/");

    assert.notOk(
      selectKit(".header-locale-selector").exists(),
      "has not locale selector"
    );
  });
});

acceptance("Locale Combo Box - User", function (needs) {
  const actingUser = {
    username: "john",
  };

  const settings = {
    allow_user_locale: true,
    default_locale: "en",
    available_locales: JSON.stringify([
      { name: "English (US)", value: "en" },
      { name: "Français", value: "fr" },
    ]),
  };

  needs.user(actingUser);
  needs.settings(settings);

  needs.pretender((server, helper) => {
    server.put(userPath(`${actingUser.username}.json`), () => {
      document.documentElement.setAttribute("lang", "fr");
      return helper.response({});
    });
  });

  test("viewing dropdown list", async function (assert) {
    await visit("/");

    assert.ok(
      selectKit(".header-locale-selector").exists(),
      "has locale selector"
    );
  });

  test("default item", async function (assert) {
    await visit("/");
    document.documentElement.setAttribute("lang", settings.default_locale);

    const select = selectKit(".header-locale-selector");

    assert.strictEqual(
      select.header().el().querySelector(".selected-name").getAttribute("lang"),
      settings.default_locale,
      `default locale should be set to default locale (${settings.default_locale})`
    );

    await visit("/");
    document.documentElement.setAttribute("lang", "zz");

    assert.strictEqual(
      select.header().el().querySelector(".selected-name").getAttribute("lang"),
      settings.default_locale,
      `invalid locale should be set to default locale (${settings.default_locale})`
    );
  });

  test("switching locale", async function (assert) {
    await visit("/");
    document.documentElement.setAttribute("lang", settings.default_locale);

    const select = selectKit(".header-locale-selector");
    await select.expand();
    await select.selectRowByValue("fr");

    assert.strictEqual(select.header().value(), "fr", "locale should be set");

    await visit("/");

    assert.equal(
      document.documentElement.getAttribute("lang"),
      "fr",
      "locale changed"
    );
  });
});
