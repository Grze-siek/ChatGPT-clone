interface Message {
  text: string;
  createdAt: OfflineAudioCompletionEventInit.firestore.Timestamp;
  repeated: boolean;
  user: {
    _id: string;
    name: string;
    avatar: string;
  };
}
