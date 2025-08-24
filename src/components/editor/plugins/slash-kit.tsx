/**
 * @fileoverview AI Kit Plugin
 *
 * This file contains a plugin used from the platejs library. The example
 * is taken from the plate playground template.
 *
 * @author PlateJS
 * @link https://github.com/udecode/plate-playground-template
 */

"use client";

import { SlashInputPlugin, SlashPlugin } from "@platejs/slash-command/react";
import { KEYS } from "platejs";

import { SlashInputElement } from "@/components/ui/editor/slash-node";

export const SlashKit = [
  SlashPlugin.configure({
    options: {
      triggerQuery: (editor) =>
        !editor.api.some({
          match: { type: editor.getType(KEYS.codeBlock) },
        }),
    },
  }),
  SlashInputPlugin.withComponent(SlashInputElement),
];
