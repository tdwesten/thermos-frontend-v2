import Transform from "@ember-data/serializer/transform";

class Time extends Transform {
  deserialize(serialized: string) {
    const date = new Date(serialized);

    if (date.toString() === "Invalid Date") {
      return null;
    }

    return date?.toISOString()?.split("T")[1]?.split(".")[0];
  }

  serialize(deserialized: string) {
    return deserialized;
  }
}

declare module "ember-data/types/registries/transform" {
  export default interface TransformRegistry {
    time: typeof Time;
  }
}

export default Time;
