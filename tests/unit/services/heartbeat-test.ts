import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | heartbeat', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let service = this.owner.lookup('service:heartbeat');
    assert.ok(service);
  });
});

