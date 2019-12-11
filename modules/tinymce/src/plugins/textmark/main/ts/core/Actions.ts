/**
 * Copyright (c) Tiny Technologies, Inc. All rights reserved.
 * Licensed under the LGPL or a commercial license.
 * For LGPL see License.txt in the project root for license information.
 * For commercial licenses see https://www.tiny.cloud/
 */

import Settings from '../api/Settings';
import Utils from './Utils';
import Dialog from '../ui/Dialog';

const openDialog = function (editor) {
  return function () {
    Dialog.open(editor);
  };
};

const leftClickedOnAHref = function (editor) {
  return function (elm) {
    let sel, rng, node;
    // TODO: this used to query the context menu plugin directly. Is that a good idea?
    //  && !isContextMenuVisible(editor)
    if (Settings.hasContextToolbar(editor) && Utils.isLink(elm)) {
      sel = editor.selection;
      rng = sel.getRng();
      node = rng.startContainer;
      // ignore cursor positions at the beginning/end (to make context toolbar less noisy)
      if (node.nodeType === 3 && sel.isCollapsed() && rng.startOffset > 0 && rng.startOffset < node.data.length) {
        return true;
      }
    }
    return false;
  };
};

const toggleActiveState = function (editor) {
  return function (api) {
    const nodeChangeHandler = (e) => api.setActive(!editor.readonly && !!Utils.getAnchorElement(editor, e.element));
    editor.on('NodeChange', nodeChangeHandler);
    return () => editor.off('NodeChange', nodeChangeHandler);
  };
};

const toggleEnabledState = function (editor) {
  return function (api) {
    api.setDisabled(!Utils.hasLinks(editor.dom.getParents(editor.selection.getStart())));
    const nodeChangeHandler = (e) => api.setDisabled(!Utils.hasLinks(e.parents));
    editor.on('NodeChange', nodeChangeHandler);
    return () => editor.off('NodeChange', nodeChangeHandler);
  };
};

export default {
  openDialog,
  leftClickedOnAHref,
  toggleActiveState,
  toggleEnabledState,
};