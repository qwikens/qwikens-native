import { OutgoingMessage } from "@/hocuspocus-provider/OutgoingMessage";
import {
  MessageType,
  type OutgoingMessageArguments,
} from "@/hocuspocus-provider/types";
import { writeVarString, writeVarUint } from "lib0/encoding";
import { writeUpdate } from "y-protocols/sync";

export class UpdateMessage extends OutgoingMessage {
  type = MessageType.Sync;

  description = "A document update";

  get(args: Partial<OutgoingMessageArguments>) {
    writeVarString(this.encoder, args.documentName!);
    writeVarUint(this.encoder, this.type);

    writeUpdate(this.encoder, args.update);

    return this.encoder;
  }
}
