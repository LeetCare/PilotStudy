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

import { TextAlignPlugin } from "@platejs/basic-styles/react";
import { KEYS } from "platejs";

export const AlignKit = [
  TextAlignPlugin.configure({
    inject: {
      nodeProps: {
        defaultNodeValue: "start",
        nodeKey: "align",
        styleKey: "textAlign",
        validNodeValues: ["start", "left", "center", "right", "end", "justify"],
      },
      targetPlugins: [...KEYS.heading, KEYS.p, KEYS.img, KEYS.mediaEmbed],
    },
  }),
];
