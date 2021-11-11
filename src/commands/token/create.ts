import { flags } from "@oclif/command";
import AuthCommand from "../../auth-command";

import cli from "cli-ux";
import axios from "axios";

export default class TokenCreate extends AuthCommand {
  static description = "create a new token for given user";

  static examples = [`$ nandu start -p 4567`];

  static flags = {
    ...AuthCommand.flags,
    readonly: flags.boolean({
      description: "generate a readonly token",
    }),
    "cidr-whitelist": flags.string({
      description: "comma separated list of whitelisted cidrs",
    }),
  };

  static args = [{ name: "user", required: true }];

  async run() {
    const { args, flags } = this.parse(this.ctor);
    const url = `${flags.registry}/-/npm/v1/tokens/org.couchdb.user:${args.user}`;
    const { opts, password } = await this.getCredentials();

    const { "cidr-whitelist": cidrWhitelist } = flags;

    try {
      cli.action.start("creating token");
      const { data: token } = await axios.post(
        url,
        {
          password,
          readonly: flags.readonly,
          cidr_whitelist: cidrWhitelist ? cidrWhitelist.split(",") : void 0,
        },
        opts
      );
      cli.action.stop();
      console.log(`New token created for user ${args.user}`, token);
    } catch (err) {
      cli.action.stop();
      const { status, statusText } = (<any>err).response;
      console.error(`Error ${status} ${statusText}`);
    }
  }
}
