import { OutgoingMessage } from "@/hocuspocus-provider/OutgoingMessage";
import {
  MessageType,
  type OutgoingMessageArguments,
} from "@/hocuspocus-provider/types";
import * as encoding from "lib0/encoding";
import * as syncProtocol from "y-protocols/sync";

export class SyncStepOneMessage extends OutgoingMessage {
  type = MessageType.Sync;

  description = "First sync step";

  get(args: Partial<OutgoingMessageArguments>) {
    if (typeof args.document === "undefined") {
      throw new Error(
        "The sync step one message requires document as an argument",
      );
    }

    encoding.writeVarString(this.encoder, args.documentName!);
    encoding.writeVarUint(this.encoder, this.type);
    syncProtocol.writeSyncStep1(this.encoder, args.document);

    return this.encoder;
  }
}