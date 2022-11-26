import { module, test } from "qunit";
import { setupTest } from "ember-qunit";
import { run } from "@ember/runloop";
import Store from "@ember-data/store";

module("Unit | Model | thermostat", function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test("it exists", function (assert) {
    let store = this.owner.lookup("service:store") as Store;
    let model = run(() => store.createRecord("thermostat", {}));
    assert.ok(model);
  });
});
