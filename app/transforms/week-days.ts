import Transform from "@ember-data/serializer/transform";

class WeekDays extends Transform {
  deserialize(serialized: string) {
    console.log("deserialize", serialized);

    return JSON.parse(serialized) || [];
  }

  serialize(deserialized: []) {
    console.log(deserialized);

    return JSON.stringify(deserialized);
  }
}

declare module "ember-data/types/registries/transform" {
  export default interface TransformRegistry {
    "week-days": typeof WeekDays;
  }
}

export default WeekDays;
