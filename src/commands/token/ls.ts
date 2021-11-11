import { Command, flags } from "@oclif/command";
import cli from "cli-ux";
import axios, { AxiosRequestConfig } from "axios";

export default class TokenList extends Command {
  static description = "list tokens for given user";

  static examples = [`$ nandu start -p 4567`];

  static flags = {
    help: flags.help({ char: "h" }),
    token: flags.string({
      default: process.env["ENV_TOKEN"],
      description:
        "Token to be used for authentication, uses NPM_TOKEN env variable if unspecified",
      exclusive: ["userpass"],
    }),
    registry: flags.string({
      required: true,
      description: "URI pointing to your Nandu NPM Registry",
    }),
  };

  static args = [{ name: "user", required: true }];

  async run() {
    const { args, flags } = this.parse(TokenList);
    const url = `${flags.registry}/-/npm/v1/tokens/org.couchdb.user:${args.user}`;
    const opts: AxiosRequestConfig = {};

    let password;

    if (!flags.token) {
      const username = await cli.prompt("username:");
      password = await cli.prompt("password", { type: "hide" });

      opts.auth = {
        username,
        password,
      };
    } else {
      password = await cli.prompt("password", { type: "hide" });

      opts.headers = {
        Authorization: `Bearer ${flags.token}`,
      };
    }

    try {
      cli.action.start("listing tokens");
      const { data } = await axios.get(url, opts);
      cli.action.stop();
      console.log(data.objects);
    } catch (err) {
      cli.action.stop();
      const { status, statusText } = (<any>err).response;
      console.error(`Error ${status} ${statusText}`);
    }
  }
}
