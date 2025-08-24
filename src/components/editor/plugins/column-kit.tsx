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

import { ColumnItemPlugin, ColumnPlugin } from "@platejs/layout/react";

import {
  ColumnElement,
  ColumnGroupElement,
} from "@/components/ui/editor/column-node";

export const ColumnKit = [
  ColumnPlugin.withComponent(ColumnGroupElement),
  ColumnItemPlugin.withComponent(ColumnElement),
];
