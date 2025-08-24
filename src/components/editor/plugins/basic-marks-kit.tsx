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

import {
  BoldPlugin,
  HighlightPlugin,
  ItalicPlugin,
  KbdPlugin,
  StrikethroughPlugin,
  SubscriptPlugin,
  SuperscriptPlugin,
  UnderlinePlugin,
} from "@platejs/basic-nodes/react";

import { HighlightLeaf } from "@/components/ui/editor/highlight-node";
import { KbdLeaf } from "@/components/ui/editor/kbd-node";

export const BasicMarksKit = [
  BoldPlugin,
  ItalicPlugin,
  UnderlinePlugin,
  StrikethroughPlugin.configure({
    shortcuts: { toggle: { keys: "mod+shift+x" } },
  }),
  SubscriptPlugin.configure({
    shortcuts: { toggle: { keys: "mod+comma" } },
  }),
  SuperscriptPlugin.configure({
    shortcuts: { toggle: { keys: "mod+period" } },
  }),
  HighlightPlugin.configure({
    node: { component: HighlightLeaf },
    shortcuts: { toggle: { keys: "mod+shift+h" } },
  }),
  KbdPlugin.withComponent(KbdLeaf),
];
