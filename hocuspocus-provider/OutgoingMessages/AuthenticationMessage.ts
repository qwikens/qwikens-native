import { OutgoingMessage } from "@/hocuspocus-provider/OutgoingMessage";
import {
  MessageType,
  type OutgoingMessageArguments,
} from "@/hocuspocus-provider/types";
import { writeAuthentication } from "@hocuspocus/common";
import { writeVarString, writeVarUint } from "lib0/encoding";

export class AuthenticationMessage extends OutgoingMessage {
  type = MessageType.Auth;

  description = "Authentication";

  get(args: Partial<OutgoingMessageArguments>) {
    if (typeof args.token === "undefined") {
      throw new Error(
        "The authentication message requires `token` as an argument.",
      );
    }

    writeVarString(this.encoder, args.documentName!);
    writeVarUint(this.encoder, this.type);
    writeAuthentication(this.encoder, args.token);

    return this.encoder;
  }
}
