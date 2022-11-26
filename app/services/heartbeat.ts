import Store from "@ember-data/store";
import Service, { inject as service } from "@ember/service";
import { tracked } from "@glimmer/tracking";

export default class HeartbeatService extends Service {
  @tracked private declare timer: any;
  @service declare store: Store;

  constructor() {
    super(...arguments);
  }

  start() {
    this.store.queryRecord("heartbeat", {
      limit: 1,
    });
  }

  ping() {
    console.log("ping");
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module "@ember/service" {
  interface Registry {
    heartbeat: HeartbeatService;
  }
}
