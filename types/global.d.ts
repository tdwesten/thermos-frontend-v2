// Types for compiled templates
declare module "thermos/templates/*" {
  import { TemplateFactory } from "ember-cli-htmlbars";

  const tmpl: TemplateFactory;
  export default tmpl;
}

declare module "ember-simple-auth-token/authenticators/jwt" {
  export default class {
    [x: string]: any;
    makeRequest(url: string, data: any, headers: any): Promise<any>;
    handleAuthResponse(response: any): any;
    handleTokenRefreshFail(status: number): void;
    trigger(event: string, data: any): void;
    serverTokenRefreshEndpoint: string;
  }
}
