import { OutgoingMessage } from "@/hocuspocus-provider/OutgoingMessage";
import {
  MessageType,
  type OutgoingMessageArguments,
} from "@/hocuspocus-provider/types";
import { writeVarString, writeVarUint } from "lib0/encoding";

export class StatelessMessage extends OutgoingMessage {
  type = MessageType.Stateless;

  description = "A stateless message";

  get(args: Partial<OutgoingMessageArguments>) {
    writeVarString(this.encoder, args.documentName!);
    writeVarUint(this.encoder, this.type);
    writeVarString(this.encoder, args.payload ?? "");

    return this.encoder;
  }
}
