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
  BlockquotePlugin,
  H1Plugin,
  H2Plugin,
  H3Plugin,
  HorizontalRulePlugin,
} from "@platejs/basic-nodes/react";
import { ParagraphPlugin } from "platejs/react";

import { BlockquoteElement } from "@/components/ui/editor/blockquote-node";
import {
  H1Element,
  H2Element,
  H3Element,
} from "@/components/ui/editor/heading-node";
import { HrElement } from "@/components/ui/editor/hr-node";
import { ParagraphElement } from "@/components/ui/editor/paragraph-node";

export const BasicBlocksKit = [
  ParagraphPlugin.withComponent(ParagraphElement),
  H1Plugin.configure({
    node: {
      component: H1Element,
    },
    rules: {
      break: { empty: "reset" },
    },
    shortcuts: { toggle: { keys: "mod+alt+1" } },
  }),
  H2Plugin.configure({
    node: {
      component: H2Element,
    },
    rules: {
      break: { empty: "reset" },
    },
    shortcuts: { toggle: { keys: "mod+alt+2" } },
  }),
  H3Plugin.configure({
    node: {
      component: H3Element,
    },
    rules: {
      break: { empty: "reset" },
    },
    shortcuts: { toggle: { keys: "mod+alt+3" } },
  }),
  BlockquotePlugin.configure({
    node: { component: BlockquoteElement },
    shortcuts: { toggle: { keys: "mod+shift+period" } },
  }),
  HorizontalRulePlugin.withComponent(HrElement),
];
