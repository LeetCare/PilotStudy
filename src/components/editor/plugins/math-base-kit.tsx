/**
 * @fileoverview AI Kit Plugin
 *
 * This file contains a plugin used from the platejs library. The example
 * is taken from the plate playground template.
 *
 * @author PlateJS
 * @link https://github.com/udecode/plate-playground-template
 */

import { BaseEquationPlugin, BaseInlineEquationPlugin } from "@platejs/math";

import {
  EquationElementStatic,
  InlineEquationElementStatic,
} from "@/components/ui/editor/equation-node-static";

export const BaseMathKit = [
  BaseInlineEquationPlugin.withComponent(InlineEquationElementStatic),
  BaseEquationPlugin.withComponent(EquationElementStatic),
];
