/*
In NativeScript, the app.ts file is the entry point to your application.
You can use this file to perform app-level initialization, but the primary
purpose of the file is to pass control to the app’s first module.
*/

import { svelteNative } from "svelte-native";
import App from  "./App.svelte";

// https://github.com/halfnelson/svelte-native/issues/39
/*
// Register the plugin's new field as a tag.
//
// https://github.com/halfnelson/svelte-native/issues/20
//
import { NativeElementNode, registerElement } from "svelte-native/dom";
import { AutosizeLabel } from "nativescript-autosize-label";

registerElement('autosizeLabel', () => new NativeElementNode('autosizeLabel', AutosizeLabel as any))
*/
svelteNative(App, {});

