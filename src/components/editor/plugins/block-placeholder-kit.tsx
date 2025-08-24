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

import { KEYS } from "platejs";
import { BlockPlaceholderPlugin } from "platejs/react";

export const BlockPlaceholderKit = [
  BlockPlaceholderPlugin.configure({
    options: {
      className:
        "before:absolute before:cursor-text before:opacity-30 before:content-[attr(placeholder)]",
      placeholders: {
        [KEYS.p]: "Type something...",
      },
      query: ({ path }) => {
        return path.length === 1;
      },
    },
  }),
];
