import Transform from "@ember-data/serializer/transform";

class Json extends Transform {
  deserialize(serialized: string) {
    return JSON.parse(serialized) || [];
  }

  serialize(deserialized: []) {
    return JSON.stringify(deserialized);
  }
}

declare module "ember-data/types/registries/transform" {
  export default interface TransformRegistry {
    json: typeof Json;
  }
}

export default Json;
