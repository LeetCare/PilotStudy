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

import { TogglePlugin } from "@platejs/toggle/react";

import { IndentKit } from "@/components/editor/plugins/indent-kit";
import { ToggleElement } from "@/components/ui/editor/toggle-node";

export const ToggleKit = [
  ...IndentKit,
  TogglePlugin.withComponent(ToggleElement),
];
