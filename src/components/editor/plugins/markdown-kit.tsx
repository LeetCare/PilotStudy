/**
 * @fileoverview AI Kit Plugin
 *
 * This file contains a plugin used from the platejs library. The example
 * is taken from the plate playground template.
 *
 * @author PlateJS
 * @link https://github.com/udecode/plate-playground-template
 */

import { MarkdownPlugin, remarkMdx, remarkMention } from "@platejs/markdown";
import { KEYS } from "platejs";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

export const MarkdownKit = [
  MarkdownPlugin.configure({
    options: {
      disallowedNodes: [KEYS.suggestion],
      remarkPlugins: [remarkMath, remarkGfm, remarkMdx, remarkMention],
    },
  }),
];
