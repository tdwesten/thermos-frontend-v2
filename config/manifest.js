"use strict";

module.exports = function (/* environment, appConfig */) {
  // See https://zonkyio.github.io/ember-web-app for a list of
  // supported properties

  return {
    name: "Thermos",
    short_name: "Thermos",
    description:
      "Thermos is a simple web app for controlling your home's temperature.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#fff",
    icons: [],
    ms: {
      tileColor: "#fff",
    },
  };
};
