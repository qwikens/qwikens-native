import type {
  MessageType,
  OutgoingMessageArguments,
  OutgoingMessageInterface,
} from "@/hocuspocus-provider/types";
import { type Encoder, createEncoder, toUint8Array } from "lib0/encoding";

export class OutgoingMessage implements OutgoingMessageInterface {
  encoder: Encoder;

  type?: MessageType;

  constructor() {
    this.encoder = createEncoder();
  }

  get(args: Partial<OutgoingMessageArguments>) {
    return args.encoder;
  }

  toUint8Array() {
    return toUint8Array(this.encoder);
  }
}
