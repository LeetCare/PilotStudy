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

import { EquationPlugin, InlineEquationPlugin } from "@platejs/math/react";

import {
  EquationElement,
  InlineEquationElement,
} from "@/components/ui/editor/equation-node";

export const MathKit = [
  InlineEquationPlugin.withComponent(InlineEquationElement),
  EquationPlugin.withComponent(EquationElement),
];
