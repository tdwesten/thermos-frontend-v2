import DS from "ember-data";

const Json = DS.Transform.extend({
  deserialize(serialized: string) {
    return JSON.parse(serialized);
  },

  serialize(deserialized: []) {
    return JSON.stringify(deserialized);
  },
});

declare module "ember-data/types/registries/transform" {
  export default interface TransformRegistry {
    json: Json;
  }
}

export default Json;
