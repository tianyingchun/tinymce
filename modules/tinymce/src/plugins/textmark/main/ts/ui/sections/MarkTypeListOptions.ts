/**
 * Copyright (c) Tiny Technologies, Inc. All rights reserved.
 * Licensed under the LGPL or a commercial license.
 * For LGPL see License.txt in the project root for license information.
 * For commercial licenses see https://www.tiny.cloud/
 */

import Settings from '../../api/Settings';
import { Future, Option, Type } from '@ephox/katamari';
import { ListItem } from '../DialogTypes';
import { ListOptions } from '../../core/ListOptions';

const getTextMarkTypes = (editor): Future<Option<ListItem[]>> => {
  const extractor = (item) => editor.convertURL(item.value || item.url, 'href');

  const textMarkList = Settings.getTextMarkTypeList(editor);
  return Future.nu<Option<ListItem[]>>((callback) => {
    if (Type.isFunction(textMarkList)) {
      textMarkList((output) => callback(Option.some(output)));
    } else {
      callback(Option.from(textMarkList as ListItem[]));
    }
  }).map((optItems) => {
    return optItems.bind(ListOptions.sanitizeWith(extractor)).map((items) => {
      if (items.length > 0) {
        return [].concat(items);
      } else {
        return [{ text: '文本输入框', value: 'textbox' }];
      }
    });
  });
};

export const LinkListOptions = {
  getTextMarkTypes
};
