import { ApplicationStateAction } from './state';
import { ConsistencyAction } from './consistency';
import { DashboardAction } from './dashboard';
import { ModeAction } from './mode';

export * from './state';
export * from './consistency';
export * from './dashboard';
export * from './mode';

import {
  BookmarkAction,
  ConfigAction,
  CustomWildcardAction,
  DatasetAction,
  LogAction,
  RelatedViewsAction,
  ResetAction,
  ResultAction,
  ShelfAction,
  ShelfPreviewAction,
  TabAction,
  UndoableAction
} from 'datavoyager/build/actions';

export type Action =  (
  // Voyager actions
  BookmarkAction |
  ConfigAction |
  CustomWildcardAction |
  DatasetAction |
  LogAction |
  RelatedViewsAction |
  ResetAction |
  ResultAction |
  ShelfAction |
  ShelfPreviewAction |
  TabAction |
  UndoableAction |

  // native actions
  ApplicationStateAction |
  ConsistencyAction |
  DashboardAction |
  ModeAction
);
