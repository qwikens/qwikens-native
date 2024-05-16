import type { IncomingMessage } from "@/hocuspocus-provider/IncomingMessage";
import type { OutgoingMessage } from "@/hocuspocus-provider/OutgoingMessage";
import type { AuthenticationMessage } from "@/hocuspocus-provider/OutgoingMessages/AuthenticationMessage";
import type { AwarenessMessage } from "@/hocuspocus-provider/OutgoingMessages/AwarenessMessage";
import type { QueryAwarenessMessage } from "@/hocuspocus-provider/OutgoingMessages/QueryAwarenessMessage";
import type { SyncStepOneMessage } from "@/hocuspocus-provider/OutgoingMessages/SyncStepOneMessage";
import type { SyncStepTwoMessage } from "@/hocuspocus-provider/OutgoingMessages/SyncStepTwoMessage";
import type { UpdateMessage } from "@/hocuspocus-provider/OutgoingMessages/UpdateMessage";
import type { CloseEvent } from "@hocuspocus/common";
import type { Encoder } from "lib0/encoding";
import type { Event, MessageEvent } from "ws";
import type { Awareness } from "y-protocols/awareness";
import type * as Y from "yjs";

export enum MessageType {
  Sync = 0,
  Awareness = 1,
  Auth = 2,
  QueryAwareness = 3,
  Stateless = 5,
  CLOSE = 7,
  SyncStatus = 8,
}

export enum WebSocketStatus {
  Connecting = "connecting",
  Connected = "connected",
  Disconnected = "disconnected",
}

export interface OutgoingMessageInterface {
  encoder: Encoder;
  type?: MessageType;
}

export interface OutgoingMessageArguments {
  documentName: string;
  token: string;
  document: Y.Doc;
  awareness: Awareness;
  clients: number[];
  states: Map<number, { [key: string]: any }>;
  update: any;
  payload: string;
  encoder: Encoder;
}

export interface Constructable<T> {
  new (...args: any): T;
}

export type ConstructableOutgoingMessage =
  | Constructable<AuthenticationMessage>
  | Constructable<AwarenessMessage>
  | Constructable<QueryAwarenessMessage>
  | Constructable<SyncStepOneMessage>
  | Constructable<SyncStepTwoMessage>
  | Constructable<UpdateMessage>;

export type onAuthenticationFailedParameters = {
  reason: string;
};

export type onOpenParameters = {
  event: Event;
};

export type onMessageParameters = {
  event: MessageEvent;
  message: IncomingMessage;
};

export type onOutgoingMessageParameters = {
  message: OutgoingMessage;
};

export type onStatusParameters = {
  status: WebSocketStatus;
};

export type onSyncedParameters = {
  state: boolean;
};

export type onDisconnectParameters = {
  event: CloseEvent;
};

export type onCloseParameters = {
  event: CloseEvent;
};

export type onAwarenessUpdateParameters = {
  states: StatesArray;
};

export type onAwarenessChangeParameters = {
  states: StatesArray;
};

export type onStatelessParameters = {
  payload: string;
};

export type StatesArray = { clientId: number; [key: string | number]: any }[];

// hocuspocus-pro types

export type TCollabThread<Data = any, CommentData = any> = {
  id: string;
  createdAt: number;
  updatedAt: number;
  resolvedAt?: string; // (new Date()).toISOString()
  comments: TCollabComment<CommentData>[];
  data: Data;
};

export type TCollabComment<Data = any> = {
  id: string;
  createdAt: number;
  updatedAt: number;
  data: Data;
  content: any;
};

export type THistoryVersion = {
  name?: string;
  version: number;
  date: number;
};

export type THistoryConfiguration = {
  autoVersioning: boolean;
  currentVersion: number;
  stateCaptured: number; // indicates whether changes have been made since the last version
};

export type THistoryAction =
  | THistoryDocumentRevertAction
  | THistoryVersionCreateAction
  | THistoryVersionPreviewAction;

export type THistoryDocumentRevertAction = {
  action: "document.revert";
  /**
   * if changes haven't been persisted to a version yet, we'll create one with the specified name,
   * expect when `false` is passed.
   */
  currentVersionName?: string | false;
  /**
   * Name of the version that is created after the revert. Pass `false` to avoid generating a new version.
   */
  newVersionName?: string | false;
};

export type THistoryVersionCreateAction = {
  action: "version.create";
  name?: string;
};

export type THistoryVersionPreviewAction = {
  action: "version.preview";
  version: number;
};

export type THistoryEvent =
  | THistoryVersionPreviewEvent
  | THistoryVersionCreatedEvent
  | THistoryDocumentRevertedEvent;

export type THistoryVersionCreatedEvent = {
  event: "version.created";
  version: number;
};

export type THistoryVersionPreviewEvent = {
  event: "version.preview";
  version: number;
  ydoc: string; // base64-encoded Uint8Array
};

export type THistoryDocumentRevertedEvent = {
  event: "document.reverted";
  version: number;
};
