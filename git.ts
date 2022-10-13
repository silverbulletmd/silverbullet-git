import { run } from "$sb-syscall/plugos-syscall/shell.ts";
import {
  flashNotification,
  prompt,
} from "$sb-syscall/silverbullet-syscall/editor.ts";
import { invokeFunction } from "$sb-syscall/silverbullet-syscall/system.ts";

export async function commit(message?: string) {
  if (!message) {
    message = "Snapshot";
  }
  console.log(
    "Snapshotting the current space to git with commit message",
    message,
  );
  await run("git", ["add", "./*.md"]);
  try {
    await run("git", ["commit", "-a", "-m", message]);
  } catch {
    // We can ignore, this happens when there's no changes to commit
  }
  console.log("Done!");
}

export async function snapshotCommand() {
  let revName = await prompt(`Revision name:`);
  if (!revName) {
    revName = "Snapshot";
  }
  console.log("Revision name", revName);
  await invokeFunction("server", "commit", revName);
}

export async function syncCommand() {
  await flashNotification("Syncing with git");
  await invokeFunction("server", "sync");
  await flashNotification("Git sync complete!");
}

export async function sync() {
  console.log("Going to sync with git");
  await commit();
  console.log("Then pulling from remote");
  await run("git", ["pull"]);
  console.log("And then pushing to remote");
  await run("git", ["push"]);
  console.log("Done!");
}
