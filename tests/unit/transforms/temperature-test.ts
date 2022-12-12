import { module, test } from "qunit";
import { setupTest } from "ember-qunit";

module(
  "transform:temperature",
  "Unit | Transform | temperature",
  function (hooks) {
    setupTest(hooks);

    // Replace this with your real tests.
    test("it exists", function (assert) {
      const transform = this.owner.lookup("transform:temperature");
      assert.ok(transform);
    });
  }
);
