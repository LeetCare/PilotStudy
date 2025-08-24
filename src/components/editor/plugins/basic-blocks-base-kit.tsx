/**
 * @fileoverview AI Kit Plugin
 *
 * This file contains a plugin used from the platejs library. The example
 * is taken from the plate playground template.
 *
 * @author PlateJS
 * @link https://github.com/udecode/plate-playground-template
 */

import {
  BaseBlockquotePlugin,
  BaseH1Plugin,
  BaseH2Plugin,
  BaseH3Plugin,
  BaseHorizontalRulePlugin,
} from "@platejs/basic-nodes";
import { BaseParagraphPlugin } from "platejs";

import { BlockquoteElementStatic } from "@/components/ui/editor/blockquote-node-static";
import {
  H1ElementStatic,
  H2ElementStatic,
  H3ElementStatic,
} from "@/components/ui/editor/heading-node-static";
import { HrElementStatic } from "@/components/ui/editor/hr-node-static";
import { ParagraphElementStatic } from "@/components/ui/editor/paragraph-node-static";

export const BaseBasicBlocksKit = [
  BaseParagraphPlugin.withComponent(ParagraphElementStatic),
  BaseH1Plugin.withComponent(H1ElementStatic),
  BaseH2Plugin.withComponent(H2ElementStatic),
  BaseH3Plugin.withComponent(H3ElementStatic),
  BaseBlockquotePlugin.withComponent(BlockquoteElementStatic),
  BaseHorizontalRulePlugin.withComponent(HrElementStatic),
];
