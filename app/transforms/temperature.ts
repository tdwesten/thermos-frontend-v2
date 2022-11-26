import DS from "ember-data";

const Temperature = DS.Transform.extend({
  deserialize(serialized: number) {
    return serialized / 100;
  },

  serialize(deserialized: number) {
    return deserialized * 100;
  },
});

declare module "ember-data/types/registries/transform" {
  export default interface TransformRegistry {
    temperature: Temperature;
  }
}

export default Temperature;
