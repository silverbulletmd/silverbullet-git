var mod=(()=>{var l=Object.defineProperty;var C=Object.getOwnPropertyDescriptor;var A=Object.getOwnPropertyNames;var F=Object.prototype.hasOwnProperty;var d=(e,t)=>{for(var n in t)l(e,n,{get:t[n],enumerable:!0})},S=(e,t,n,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let i of A(t))!F.call(e,i)&&i!==n&&l(e,i,{get:()=>t[i],enumerable:!(o=C(t,i))||o.enumerable});return e};var M=e=>S(l({},"__esModule",{value:!0}),e);var Fe={};d(Fe,{functionMapping:()=>w});typeof Deno>"u"&&(self.Deno={args:[],build:{arch:"x86_64"},env:{get(){}}});var g=new Map,p=0;function u(e){self.postMessage(e)}self.syscall=async(e,...t)=>await new Promise((n,o)=>{p++,g.set(p,{resolve:n,reject:o}),u({type:"sys",id:p,name:e,args:t})});function f(e,t){self.addEventListener("message",n=>{(async()=>{let o=n.data;switch(o.type){case"inv":{let i=e[o.name];if(!i)throw new Error(`Function not loaded: ${o.name}`);try{let c=await Promise.resolve(i(...o.args||[]));u({type:"invr",id:o.id,result:c})}catch(c){console.error("An exception was thrown as a result of invoking function",o.name,"error:",c),u({type:"invr",id:o.id,error:c.message})}}break;case"sysr":{let i=o.id,c=g.get(i);if(!c)throw Error("Invalid request id");g.delete(i),o.error?c.reject(new Error(o.error)):c.resolve(o.result)}break}})().catch(console.error)}),u({type:"manifest",manifest:t})}function k(e){let t=atob(e),n=t.length,o=new Uint8Array(n);for(let i=0;i<n;i++)o[i]=t.charCodeAt(i);return o}function y(e){typeof e=="string"&&(e=new TextEncoder().encode(e));let t="",n=e.byteLength;for(let o=0;o<n;o++)t+=String.fromCharCode(e[o]);return btoa(t)}async function U(e,t){if(typeof e!="string"){let n=new Uint8Array(await e.arrayBuffer()),o=n.length>0?y(n):void 0;t={method:e.method,headers:Object.fromEntries(e.headers.entries()),base64Body:o},e=e.url}return syscall("sandboxFetch.fetch",e,t)}function D(){globalThis.nativeFetch=globalThis.fetch,globalThis.fetch=async function(e,t){let n=t&&t.body?y(new Uint8Array(await new Response(t.body).arrayBuffer())):void 0,o=await U(e,t&&{method:t.method,headers:t.headers,base64Body:n});return new Response(o.base64Body?k(o.base64Body):null,{status:o.status,headers:o.headers})}}D();var m=globalThis.syscall;var s={};d(s,{run:()=>E});function E(e,t){return m("shell.run",e,t)}var a={};d(a,{confirm:()=>se,dispatch:()=>ne,downloadFile:()=>Y,filterBox:()=>J,flashNotification:()=>H,fold:()=>ue,foldAll:()=>pe,getCurrentPage:()=>N,getCursor:()=>O,getSelection:()=>$,getText:()=>G,getUiOption:()=>ae,hidePanel:()=>Z,insertAtCursor:()=>oe,insertAtPos:()=>ee,moveCursor:()=>re,navigate:()=>j,openUrl:()=>V,prompt:()=>ie,reloadPage:()=>_,reloadUI:()=>I,replaceRange:()=>te,save:()=>W,setPage:()=>B,setSelection:()=>Q,setUiOption:()=>ce,showPanel:()=>X,toggleFold:()=>de,unfold:()=>le,unfoldAll:()=>ge,uploadFile:()=>z,vimEx:()=>me});typeof self>"u"&&(self={syscall:()=>{throw new Error("Not implemented here")}});var r=self.syscall;function N(){return r("editor.getCurrentPage")}function B(e){return r("editor.setPage",e)}function G(){return r("editor.getText")}function O(){return r("editor.getCursor")}function $(){return r("editor.getSelection")}function Q(e,t){return r("editor.setSelection",e,t)}function W(){return r("editor.save")}function j(e,t,n=!1,o=!1){return r("editor.navigate",e,t,n,o)}function _(){return r("editor.reloadPage")}function I(){return r("editor.reloadUI")}function V(e,t=!1){return r("editor.openUrl",e,t)}function Y(e,t){return r("editor.downloadFile",e,t)}function z(e,t){return r("editor.uploadFile",e,t)}function H(e,t="info"){return r("editor.flashNotification",e,t)}function J(e,t,n="",o=""){return r("editor.filterBox",e,t,n,o)}function X(e,t,n,o=""){return r("editor.showPanel",e,t,n,o)}function Z(e){return r("editor.hidePanel",e)}function ee(e,t){return r("editor.insertAtPos",e,t)}function te(e,t,n){return r("editor.replaceRange",e,t,n)}function re(e,t=!1){return r("editor.moveCursor",e,t)}function oe(e){return r("editor.insertAtCursor",e)}function ne(e){return r("editor.dispatch",e)}function ie(e,t=""){return r("editor.prompt",e,t)}function se(e){return r("editor.confirm",e)}function ae(e){return r("editor.getUiOption",e)}function ce(e,t){return r("editor.setUiOption",e,t)}function me(e){return r("editor.vimEx",e)}function ue(){return r("editor.fold")}function le(){return r("editor.unfold")}function de(){return r("editor.toggleFold")}function pe(){return r("editor.foldAll")}function ge(){return r("editor.unfoldAll")}async function h(e){e||(e="Snapshot"),console.log("Snapshotting the current space to git with commit message",e);let{code:t}=await s.run("git",["add","./*"]);console.log("Git add code",t);try{await s.run("git",["commit","-a","-m",e])}catch{}console.log("Done!")}async function x(){let e=await a.prompt("Revision name:");e||(e="Snapshot"),console.log("Revision name",e),await h(e),await a.flashNotification("Done!")}async function P(){await a.flashNotification("Syncing with git"),console.log("Going to sync with git"),await h(),console.log("Then pulling from remote"),await s.run("git",["pull"]),console.log("And then pushing to remote"),await s.run("git",["push"]),console.log("Done!"),await a.flashNotification("Git sync complete!")}async function b(){let e=await a.prompt("Github project URL:");if(!e)return;let t=await a.prompt("Github token:");if(!t)return;let n=await a.prompt("Your name:");if(!n)return;let o=await a.prompt("Your email:");if(!o)return;let i=e.split("/");i[2]=`${t}@${i[2]}`,e=i.join("/")+".git",await a.flashNotification("Now going to clone the project, this may take some time."),await s.run("mkdir",["-p","_checkout"]),await s.run("git",["clone",e,"_checkout"]),await s.run("bash",["-c","mv -f _checkout/{.,}* . 2> /dev/null; true"]),await s.run("rm",["-rf","_checkout"]),await s.run("git",["config","user.name",n]),await s.run("git",["config","user.email",o]),await a.flashNotification("Done. Now just wait for sync to kick in to get all the content.")}async function v(){console.log("Triggered auto commit")}var w={autoCommit:v,githubCloneCommand:b,snapshotCommand:x,syncCommand:P},Ae={name:"git",requiredPermissions:["shell"],functions:{autoCommit:{path:"git.ts:autoCommit",env:"server",cron:"* * * * *"},githubCloneCommand:{path:"./git.ts:githubCloneCommand",command:{name:"Github: Clone"}},snapshotCommand:{path:"./git.ts:snapshotCommand",command:{name:"Git: Snapshot"}},syncCommand:{path:"./git.ts:syncCommand",command:{name:"Git: Sync"}}},assets:{}};f(w,Ae);return M(Fe);})();
