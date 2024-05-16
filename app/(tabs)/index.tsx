import {
  Button,
  Image,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useSnapshot } from "valtio";
import { bind } from "valtio-yjs-read-only";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

import { HocuspocusProvider } from "@/hocuspocus-provider/HocuspocusProvider";
import { randomUUID } from "expo-crypto";
import { useEffect, useState } from "react";
import * as Y from "yjs";
import { type Task, tasksState } from "../store";

const ydoc = new Y.Doc();

export default function HomeScreen() {
  const [newTaskContent, setNewTaskContent] = useState("");
  const snap = useSnapshot(tasksState);
  const provider = new HocuspocusProvider({
    url: process.env.EXPO_PUBLIC_WS_URL ?? "",
    name: "todo-document",
    document: ydoc,
  });
  const tasksDocument = provider.document.getArray<Task>("tasks-state");

  useEffect(() => {
    const unbindTasks = bind(tasksState, tasksDocument);

    return () => {
      unbindTasks();
    };
  }, [tasksDocument]);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      {snap.map((task, index) => (
        <ThemedView key={index} style={styles.taskContainer}>
          <ThemedText style={styles.taskContent}>{task.content}</ThemedText>
          <TouchableOpacity
            onPress={() => {
              tasksDocument.delete(index, 1);
            }}
            style={styles.deleteButton}
          >
            <ThemedText style={styles.deleteText}>Delete</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      ))}

      <ThemedView style={styles.inputContainer}>
        <ThemedText>Create a task:</ThemedText>
        <TextInput
          style={styles.input}
          placeholder="Enter task content"
          value={newTaskContent}
          onChangeText={(text) => setNewTaskContent(text)}
        />
        <Button
          title="Create"
          onPress={() => {
            if (!newTaskContent) return;
            tasksDocument.push([
              { id: randomUUID(), content: newTaskContent, isDone: false },
            ]);
            setNewTaskContent("");
          }}
        />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  taskContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
    padding: 8,
    backgroundColor: "#ECECEC",
    borderRadius: 8,
    marginBottom: 8,
    color: "black",
  },
  taskContent: {
    color: "black",
  },
  deleteButton: {
    backgroundColor: "#FF6F6F",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  deleteText: {
    color: "white",
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    color: "white",
  },
});
