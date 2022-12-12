import Transform from "@ember-data/serializer/transform";

class Temperature extends Transform {
  deserialize(serialized: number) {
    return serialized / 100;
  }

  serialize(deserialized: number) {
    return deserialized * 100;
  }
}

declare module "ember-data/types/registries/transform" {
  export default interface TransformRegistry {
    temperature: typeof Temperature;
  }
}

export default Temperature;
