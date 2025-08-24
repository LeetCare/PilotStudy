/**
 * @fileoverview AI Kit Plugin
 *
 * This file contains a plugin used from the platejs library.
 *
 * @author PlateJS
 * @link https://github.com/udecode/plate-playground-template
 */

"use client";

import { BasicBlocksKit } from "./basic-blocks-kit";
import { BasicMarksKit } from "./basic-marks-kit";

export const BasicNodesKit = [...BasicBlocksKit, ...BasicMarksKit];
