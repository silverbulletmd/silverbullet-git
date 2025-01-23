import { editor, shell, system } from "@silverbulletmd/silverbullet/syscalls";

const _gitlabRegex = /https:\/\/([^:]+):([^@]+)@gitlab\.com\/([^\/]+)\/([^\/\.]+)\.git/;
const _githubRegex = /https:\/\/([^@]+)@github\.com\/([^\/]+)\/([^\/\.]+)\.git/;

export async function commit(message?: string) {
  if (!message) {
    message = "Snapshot";
  }
  console.log(
    "Snapshotting the current space to git with commit message",
    message,
  );
  const { code } = await shell.run("git", ["add", "./*"]);
  console.log("Git add code", code);
  try {
    await shell.run("git", ["commit", "-a", "-m", message]);
  } catch {
    // We can ignore, this happens when there's no changes to commit
  }
  console.log("Done!");
}

export async function snapshotCommand() {
  let revName = await editor.prompt(`Revision name:`);
  if (!revName) {
    revName = "Snapshot";
  }
  console.log("Revision name", revName);
  await commit(revName);
  await editor.flashNotification("Done!");
}

export async function syncCommand() {
  await editor.flashNotification("Syncing with git");
  await sync();
  await editor.flashNotification("Git sync complete!");
}

async function sync() {
  console.log("Going to sync with git");
  await commit();
  console.log("Then pulling from remote");
  await shell.run("git", ["pull"]);
  console.log("And then pushing to remote");
  await shell.run("git", ["push"]);
  console.log("Done!");
}

async function initRepo(pieces: string[], name: string, email: string) {
  const url = pieces.join('/') + '.git';
  await editor.flashNotification('Now going to clone the project, this may take some time.');

  await shell.run("mkdir", ["-p", "_checkout"]);
  await shell.run("git", ["clone", url, "_checkout"]);
  // Moving all files from _checkout to the current directory, which will complain a bit about . and .., but we'll ignore that
  await shell.run("bash", ["-c", "mv -f _checkout/{.,}* . 2> /dev/null; true"]);
  await shell.run("rm", ["-rf", "_checkout"]);
  await shell.run("git", ["config", "user.name", name]);
  await shell.run("git", ["config", "user.email", email]);
  await editor.flashNotification(
    "Done. Now just wait for sync to kick in to get all the content.",
  );
}

export async function githubCloneCommand() {
  const url = await editor.prompt(`Github project URL:`);
  if (!url) {
    return;
  }
  const token = await editor.prompt(`Github token:`);
  if (!token) {
    return;
  }
  const name = await editor.prompt(`Your name:`);
  if (!name) {
    return;
  }
  const email = await editor.prompt(`Your email:`);
  if (!email) {
    return;
  }
  const pieces = url.split("/");
  pieces[2] = `${token}@${pieces[2]}`;

  await initRepo(pieces, name, email);
}

export async function gitlabCloneCommand() {
  const url = await editor.prompt('Gitlab project URL:');
  if (!url) {
    return;
  }
  const userName = await editor.prompt(`Gitlab Username:`);
  if (!userName) {
    return;
  }
  const token = await editor.prompt('Gitlab token:');
  if (!token) {
    return;
  }
  const name = await editor.prompt(`Your name:`);
  if (!name) {
    return;
  }
  const email = await editor.prompt(`Your email:`);
  if (!email) {
    return;
  }

  const pieces = url.split('/');
  pieces[2] = `${userName}:${token}@${pieces[2]}`;

  await initRepo(pieces, name, email);
}

export async function autoCommit() {
  const git = await system.getSpaceConfig("git", {});
  if (git.autoCommitMinutes) {
    console.log("Triggered auto commit with config", git);
    const currentMinutes = new Date().getMinutes();
    if (currentMinutes % git.autoCommitMinutes === 0) {
      console.log("Auto commit time!");
      if (git.autoSync) {
        await sync();
      } else {
        await commit("Auto commit");
      }
    }
  }
}

function _extractGithubUrlInfo(url: string): [string] | null {
  const match = url.match(_githubRegex);
  if (!match) return null;

  const [_, token, organization, repository] = match;
  return [
    token,
    organization,
    repository
  ];
}

function _extractGitLabUrlInfo(url: string): [string] | null {
  const match = url.match(_gitlabRegex);
  if (!match) return null;

  const [_, username, token, organization, repository] = match;
  return [
    username,
    token,
    organization,
    repository
  ];
}

function _replaceGitToken(url: string, newToken: string): string {
  let newUrl = "";

  if (_gitlabRegex.test(url)) {
    const info = _extractGitLabUrlInfo(url)
    newUrl = `https://${info[0]}:${newToken}@gitlab.com/${info[2]}/${info[3]}.git`;
  }
  if (_githubRegex.test(url)) {
    const info = _extractGithubUrlInfo(url);
    newUrl = `https://${newToken}@github.com/${info[1]}/${info[2]}.git`;
  }
  return newUrl
}

export async function gitReplaceTokenCommand() {

  const newToken = await editor.prompt("Enter new token:");
  if (!newToken) {
    return;
  }

  const url = (await shell.run("git", ["remote", "get-url", "origin"])).stdout.trim();

  const newUrl = _replaceGitToken(url, newToken)

  if (newUrl.trim() == "") {
    await editor.flashNotification("Token replaced failed!");
    return;
  }

  await shell.run("git", ["remote", "set-url", "origin", newUrl]);

  await editor.flashNotification("Token replaced successfully!");
}