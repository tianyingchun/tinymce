/**
 * Copyright (c) Tiny Technologies, Inc. All rights reserved.
 * Licensed under the LGPL or a commercial license.
 * For LGPL see License.txt in the project root for license information.
 * For commercial licenses see https://www.tiny.cloud/
 */

import { HTMLAnchorElement } from '@ephox/dom-globals';
import Editor from 'tinymce/core/api/Editor';
import Actions from '../core/Actions';
import Utils from '../core/Utils';

const setupButtons = function (editor: Editor) {
  setupICons(editor);
  editor.ui.registry.addToggleButton('textmark', {
    icon: 'wink',
    tooltip: 'Insert/Edit Text Mark',
    onAction: Actions.openDialog(editor),
    onSetup: Actions.toggleActiveState(editor)
  });

  editor.ui.registry.addButton('untextmark', {
    icon: 'unwink',
    tooltip: 'Remove Text Mark',
    onAction: () => Utils.untextmark(editor),
    onSetup: Actions.toggleEnabledState(editor)
  });
};

const setupMenuItems = function (editor: Editor) {
  editor.ui.registry.addMenuItem('textmark', {
    icon: 'wink',
    text: 'Text Mark...',
    shortcut: 'Meta+M',
    onAction: Actions.openDialog(editor)
  });

  editor.ui.registry.addMenuItem('untextmark', {
    icon: 'unwink',
    text: 'Remove Text mark',
    onAction: () => Utils.untextmark(editor),
    onSetup: Actions.toggleEnabledState(editor)
  });
};

const setupContextMenu = function (editor: Editor) {
  const inLink = 'textmark untextmark';
  const noLink = 'textmark';
  editor.ui.registry.addContextMenu('textmark', {
    update: (element) => {
      return Utils.hasLinks(editor.dom.getParents(element, 'a') as HTMLAnchorElement[]) ? inLink : noLink;
    }
  });
};

const setupICons = function (editor: Editor) {
  editor.ui.registry.addIcon('wink', `
  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
  <path d="M12 24c6.627 0 12-5.373 12-12s-5.373-12-12-12-12 5.373-12 12 5.373 12 12 12zM12 2.25c5.385 0 9.75 4.365 9.75 9.75s-4.365 9.75-9.75 9.75-9.75-4.365-9.75-9.75 4.365-9.75 9.75-9.75zM12.72 16.665c3.287-0.649 5.839-2.146 6.761-4.139-0.508 3.936-3.786 6.974-7.754 6.974-2.795 0-5.247-1.507-6.63-3.772 1.65 1.29 4.559 1.542 7.624 0.937zM15 8.25c0-1.243 0.672-2.25 1.5-2.25s1.5 1.007 1.5 2.25c0 1.243-0.672 2.25-1.5 2.25s-1.5-1.007-1.5-2.25zM8.25 8.707c-0.98 0-1.813 0.367-2.121 0.879-0.083-0.137-0.129-0.754-0.129-0.908 0-0.728 1.007-1.318 2.25-1.318s2.25 0.59 2.25 1.318c0 0.154-0.046 0.771-0.129 0.908-0.309-0.512-1.142-0.879-2.121-0.879z"></path>
  </svg>`
  );
  editor.ui.registry.addIcon('unwink', `
  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12c6.627 0 12-5.373 12-12s-5.373-12-12-12zM16.5 6c0.828 0 1.5 1.007 1.5 2.25s-0.672 2.25-1.5 2.25-1.5-1.007-1.5-2.25 0.672-2.25 1.5-2.25zM8.25 7.314c1.398 0 2.391 0.523 2.391 1.343 0 0.173 0.089 1.008-0.004 1.162-0.348-0.576-1.285-0.989-2.387-0.989s-2.039 0.413-2.387 0.989c-0.093-0.155-0.004-0.989-0.004-1.162 0-0.819 0.993-1.343 2.391-1.343zM11.727 19.5c-2.795 0-5.247-1.507-6.63-3.772 1.65 1.29 4.559 1.542 7.624 0.937 3.287-0.649 5.839-2.146 6.761-4.139-0.508 3.937-3.786 6.974-7.754 6.974z"></path>
  </svg>
  `);
};

export default {
  setupICons,
  setupButtons,
  setupMenuItems,
  setupContextMenu,
};
