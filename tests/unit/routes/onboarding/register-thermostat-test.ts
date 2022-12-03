import { module, test } from "qunit";
import { setupTest } from "ember-qunit";

module("Unit | Route | onboarding/register-thermostat", function (hooks) {
  setupTest(hooks);

  test("it exists", function (assert) {
    let route = this.owner.lookup("route:onboarding/register-thermostat");
    assert.ok(route);
  });
});
