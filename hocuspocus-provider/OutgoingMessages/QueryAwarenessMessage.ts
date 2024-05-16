import { OutgoingMessage } from "@/hocuspocus-provider/OutgoingMessage";
import {
  MessageType,
  type OutgoingMessageArguments,
} from "@/hocuspocus-provider/types";
import * as encoding from "lib0/encoding";

export class QueryAwarenessMessage extends OutgoingMessage {
  type = MessageType.QueryAwareness;

  description = "Queries awareness states";

  get(args: Partial<OutgoingMessageArguments>) {
    encoding.writeVarString(this.encoder, args.documentName!);
    encoding.writeVarUint(this.encoder, this.type);

    return this.encoder;
  }
}
