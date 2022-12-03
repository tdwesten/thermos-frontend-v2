"use strict";

module.exports = function (environment) {
  // eslint-disable-next-line prefer-const
  let ENV = {
    modulePrefix: "thermos",
    environment,
    rootURL: "/",
    locationType: "history",
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false,
      },
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
  };

  ENV["APP"]["apiHost"] = process.env.apiServer;

  if (environment === "development") {
    ENV["APP"]["apiHost"] = "https://api.thermos.test/api";
  }

  if (environment === "staging") {
    ENV["APP"]["apiHost"] = "https://thermos-api.thomasvanderwesten.nl/api/";
  }

  if (environment === "production") {
    ENV["APP"]["apiHost"] = "https://thermos-api.thomasvanderwesten.nl/api";
  }

  ENV["ember-simple-auth"] = {
    authorizer: "authorizer:token",
    useSessionSetupMethod: true,
  };

  ENV["ember-simple-auth-token"] = {
    serverTokenEndpoint: ENV["APP"]["apiHost"] + "/auth/login",
    identificationField: "email",
    tokenPropertyName: "access_token",
    serverTokenRefreshEndpoint: ENV["APP"]["apiHost"] + "/auth/refresh",
    refreshTokenPropertyName: "access_token",
    tokenExpireName: "expires_in",
    refreshAccessTokens: true,
    refreshLeeway: 60,
  };

  return ENV;
};
