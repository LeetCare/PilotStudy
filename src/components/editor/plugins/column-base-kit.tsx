/**
 * @fileoverview AI Kit Plugin
 *
 * This file contains a plugin used from the platejs library. The example
 * is taken from the plate playground template.
 *
 * @author PlateJS
 * @link https://github.com/udecode/plate-playground-template
 */

import { BaseColumnItemPlugin, BaseColumnPlugin } from "@platejs/layout";

import {
  ColumnElementStatic,
  ColumnGroupElementStatic,
} from "@/components/ui/editor/column-node-static";

export const BaseColumnKit = [
  BaseColumnPlugin.withComponent(ColumnGroupElementStatic),
  BaseColumnItemPlugin.withComponent(ColumnElementStatic),
];
