import JWTAuthenticator from "ember-simple-auth-token/authenticators/jwt";

export default class ApplicationAuthenticator extends JWTAuthenticator {
  declare headers: Headers;

  refreshAccessToken(token: string) {
    return new Promise((resolve, reject) => {
      const headers: Headers = {
        ...this.headers,
        ...{
          Authorization: `Bearer ${token}`,
        },
      };

      this.makeRequest(this.serverTokenRefreshEndpoint, {}, headers)
        .then((response: Record<string, unknown>) => {
          try {
            const sessionData = this.handleAuthResponse(response);
            this.trigger("sessionDataUpdated", sessionData);
            return resolve(sessionData);
          } catch (error) {
            return reject(error);
          }
        })
        .catch((error: { status: number }) => {
          this.handleTokenRefreshFail(error.status);
          return reject(error);
        });
    });
  }
}
