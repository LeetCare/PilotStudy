/**
 * @fileoverview AI Kit Plugin
 *
 * This file contains a plugin used from the platejs library. The example
 * is taken from the plate playground template.
 *
 * @author PlateJS
 * @link https://github.com/udecode/plate-playground-template
 */

import { BaseTogglePlugin } from "@platejs/toggle";

import { ToggleElementStatic } from "@/components/ui/editor/toggle-node-static";

export const BaseToggleKit = [
  BaseTogglePlugin.withComponent(ToggleElementStatic),
];
