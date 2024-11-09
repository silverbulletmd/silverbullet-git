var M=Object.defineProperty;var l=(e,t)=>{for(var n in t)M(e,n,{get:t[n],enumerable:!0})};var g=typeof window>"u"&&typeof globalThis.WebSocketPair>"u";typeof Deno>"u"&&(self.Deno={args:[],build:{arch:"x86_64"},env:{get(){}}});var d=new Map,p=0;function c(e){self.postMessage(e)}g&&(globalThis.syscall=async(e,...t)=>await new Promise((n,o)=>{p++,d.set(p,{resolve:n,reject:o}),c({type:"sys",id:p,name:e,args:t})}));function y(e,t){g&&(self.addEventListener("message",n=>{(async()=>{let o=n.data;switch(o.type){case"inv":{let i=e[o.name];if(!i)throw new Error(`Function not loaded: ${o.name}`);try{let m=await Promise.resolve(i(...o.args||[]));c({type:"invr",id:o.id,result:m})}catch(m){console.error("An exception was thrown as a result of invoking function",o.name,"error:",m.message),c({type:"invr",id:o.id,error:m.message})}}break;case"sysr":{let i=o.id,m=d.get(i);if(!m)throw Error("Invalid request id");d.delete(i),o.error?m.reject(new Error(o.error)):m.resolve(o.result)}break}})().catch(console.error)}),c({type:"manifest",manifest:t}))}function k(e){let t=atob(e),n=t.length,o=new Uint8Array(n);for(let i=0;i<n;i++)o[i]=t.charCodeAt(i);return o}function x(e){typeof e=="string"&&(e=new TextEncoder().encode(e));let t="",n=e.byteLength;for(let o=0;o<n;o++)t+=String.fromCharCode(e[o]);return btoa(t)}async function T(e,t){if(typeof e!="string"){let n=new Uint8Array(await e.arrayBuffer()),o=n.length>0?x(n):void 0;t={method:e.method,headers:Object.fromEntries(e.headers.entries()),base64Body:o},e=e.url}return syscall("sandboxFetch.fetch",e,t)}globalThis.nativeFetch=globalThis.fetch;function U(){globalThis.fetch=async function(e,t){let n=t&&t.body?x(new Uint8Array(await new Response(t.body).arrayBuffer())):void 0,o=await T(e,t&&{method:t.method,headers:t.headers,base64Body:n});return new Response(o.base64Body?k(o.base64Body):null,{status:o.status,headers:o.headers})}}g&&U();var s={};l(s,{confirm:()=>ie,copyToClipboard:()=>ye,deleteLine:()=>xe,dispatch:()=>oe,downloadFile:()=>V,filterBox:()=>H,flashNotification:()=>I,fold:()=>me,foldAll:()=>le,getCurrentPage:()=>R,getCursor:()=>K,getSelection:()=>L,getText:()=>E,getUiOption:()=>se,goHistory:()=>_,hidePanel:()=>J,insertAtCursor:()=>re,insertAtPos:()=>X,moveCursor:()=>ee,moveCursorToLine:()=>te,navigate:()=>N,openCommandPalette:()=>B,openPageNavigator:()=>j,openSearchPanel:()=>fe,openUrl:()=>Q,prompt:()=>ne,redo:()=>ge,reloadConfigAndCommands:()=>$,reloadPage:()=>O,reloadUI:()=>W,replaceRange:()=>Z,save:()=>G,setSelection:()=>q,setText:()=>D,setUiOption:()=>ae,showPanel:()=>z,toggleFold:()=>ue,undo:()=>de,unfold:()=>ce,unfoldAll:()=>pe,uploadFile:()=>Y,vimEx:()=>Pe});typeof self>"u"&&(self={syscall:()=>{throw new Error("Not implemented here")}});function r(e,...t){return globalThis.syscall(e,...t)}function R(){return r("editor.getCurrentPage")}function E(){return r("editor.getText")}function D(e){return r("editor.setText",e)}function K(){return r("editor.getCursor")}function L(){return r("editor.getSelection")}function q(e,t){return r("editor.setSelection",e,t)}function G(){return r("editor.save")}function N(e,t=!1,n=!1){return r("editor.navigate",e,t,n)}function j(e="page"){return r("editor.openPageNavigator",e)}function B(){return r("editor.openCommandPalette")}function O(){return r("editor.reloadPage")}function W(){return r("editor.reloadUI")}function $(){return r("editor.reloadConfigAndCommands")}function Q(e,t=!1){return r("editor.openUrl",e,t)}function _(e){return r("editor.goHistory",e)}function V(e,t){return r("editor.downloadFile",e,t)}function Y(e,t){return r("editor.uploadFile",e,t)}function I(e,t="info"){return r("editor.flashNotification",e,t)}function H(e,t,n="",o=""){return r("editor.filterBox",e,t,n,o)}function z(e,t,n,o=""){return r("editor.showPanel",e,t,n,o)}function J(e){return r("editor.hidePanel",e)}function X(e,t){return r("editor.insertAtPos",e,t)}function Z(e,t,n){return r("editor.replaceRange",e,t,n)}function ee(e,t=!1){return r("editor.moveCursor",e,t)}function te(e,t=1,n=!1){return r("editor.moveCursorToLine",e,t,n)}function re(e){return r("editor.insertAtCursor",e)}function oe(e){return r("editor.dispatch",e)}function ne(e,t=""){return r("editor.prompt",e,t)}function ie(e){return r("editor.confirm",e)}function se(e){return r("editor.getUiOption",e)}function ae(e,t){return r("editor.setUiOption",e,t)}function me(){return r("editor.fold")}function ce(){return r("editor.unfold")}function ue(){return r("editor.toggleFold")}function le(){return r("editor.foldAll")}function pe(){return r("editor.unfoldAll")}function de(){return r("editor.undo")}function ge(){return r("editor.redo")}function fe(){return r("editor.openSearchPanel")}function ye(e){return r("editor.copyToClipboard",e)}function xe(){return r("editor.deleteLine")}function Pe(e){return r("editor.vimEx",e)}var u={};l(u,{applyAttributeExtractors:()=>Fe,getEnv:()=>Ue,getMode:()=>Re,getSpaceConfig:()=>Me,getVersion:()=>Ee,invokeCommand:()=>Ce,invokeFunction:()=>be,invokeSpaceFunction:()=>Se,listCommands:()=>we,listSyscalls:()=>Ae,reloadConfig:()=>Te,reloadPlugs:()=>ke});function be(e,...t){return r("system.invokeFunction",e,...t)}function Ce(e,t){return r("system.invokeCommand",e,t)}function we(){return r("system.listCommands")}function Ae(){return r("system.listSyscalls")}function Se(e,...t){return r("system.invokeSpaceFunction",e,...t)}function Fe(e,t,n){return r("system.applyAttributeExtractors",e,t,n)}async function Me(e,t){return await r("system.getSpaceConfig",e)??t}function ke(){return r("system.reloadPlugs")}function Te(){return r("system.reloadConfig")}function Ue(){return r("system.getEnv")}function Re(){return r("system.getMode")}function Ee(){return r("system.getVersion")}var a={};l(a,{run:()=>Oe});function Oe(e,t){return r("shell.run",e,t)}async function f(e){e||(e="Snapshot"),console.log("Snapshotting the current space to git with commit message",e);let{code:t}=await a.run("git",["add","./*"]);console.log("Git add code",t);try{await a.run("git",["commit","-a","-m",e])}catch{}console.log("Done!")}async function P(){let e=await s.prompt("Revision name:");e||(e="Snapshot"),console.log("Revision name",e),await f(e),await s.flashNotification("Done!")}async function h(){await s.flashNotification("Syncing with git"),await v(),await s.flashNotification("Git sync complete!")}async function v(){console.log("Going to sync with git"),await f(),console.log("Then pulling from remote"),await a.run("git",["pull"]),console.log("And then pushing to remote"),await a.run("git",["push"]),console.log("Done!")}async function b(e,t,n){let o=e.join("/")+".git";await s.flashNotification("Now going to clone the project, this may take some time."),await a.run("mkdir",["-p","_checkout"]),await a.run("git",["clone",o,"_checkout"]),await a.run("bash",["-c","mv -f _checkout/{.,}* . 2> /dev/null; true"]),await a.run("rm",["-rf","_checkout"]),await a.run("git",["config","user.name",t]),await a.run("git",["config","user.email",n]),await s.flashNotification("Done. Now just wait for sync to kick in to get all the content.")}async function C(){let e=await s.prompt("Github project URL:");if(!e)return;let t=await s.prompt("Github token:");if(!t)return;let n=await s.prompt("Your name:");if(!n)return;let o=await s.prompt("Your email:");if(!o)return;let i=e.split("/");i[2]=`${t}@${i[2]}`,await b(i,n,o)}async function w(){let e=await s.prompt("Gitlab project URL:");if(!e)return;let t=await s.prompt("Gitlab token:");if(!t)return;let n=await s.prompt("Your name:");if(!n)return;let o=await s.prompt("Your email:");if(!o)return;let i=e.split("/");i[2]=`${i[1]}:${t}@${i[2]}`,await b(i,n,o)}async function A(){let e=await u.getSpaceConfig("git",{});e.autoCommitMinutes&&(console.log("Triggered auto commit with config",e),new Date().getMinutes()%e.autoCommitMinutes===0&&(console.log("Auto commit time!"),e.autoSync?await v():await f("Auto commit")))}var S={autoCommit:A,githubCloneCommand:C,gitlabCloneCommand:w,snapshotCommand:P,syncCommand:h},F={name:"git",requiredPermissions:["shell"],functions:{autoCommit:{path:"git.ts:autoCommit",env:"server",cron:"* * * * *"},githubCloneCommand:{path:"./git.ts:githubCloneCommand",command:{name:"Github: Clone"}},gitlabCloneCommand:{path:"./git.ts:gitlabCloneCommand",command:{name:"Gitlab: Clone"}},snapshotCommand:{path:"./git.ts:snapshotCommand",command:{name:"Git: Snapshot"}},syncCommand:{path:"./git.ts:syncCommand",command:{name:"Git: Sync"}}},assets:{}},St={manifest:F,functionMapping:S};y(S,F);export{St as plug};
