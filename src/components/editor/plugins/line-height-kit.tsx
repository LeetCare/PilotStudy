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

import { LineHeightPlugin } from "@platejs/basic-styles/react";
import { KEYS } from "platejs";

export const LineHeightKit = [
  LineHeightPlugin.configure({
    inject: {
      nodeProps: {
        defaultNodeValue: 1.5,
        validNodeValues: [1, 1.2, 1.5, 2, 3],
      },
      targetPlugins: [...KEYS.heading, KEYS.p],
    },
  }),
];
