import { ChannelFieldMap } from './channel-field-map';
import { ChannelProps } from './channel-props';
import { ConstantValue } from './constant-value';

export * from './channel-field-map';
export * from './channel-props';
export * from './constant-value';

export interface ConsistencyChannelVariables {
  x?: ChannelProps;
  y?: ChannelProps;
  color?: ConstantValue | ChannelProps;
  size?: ConstantValue | ChannelProps;
  shape?: ConstantValue | ChannelProps;
  opacity?: ConstantValue | ChannelProps;
}

export interface ConsistencyVariables extends ConsistencyChannelVariables {
  channelFieldMap: ChannelFieldMap;

  anchors?: { // TODO: make this required once we start handling layout
    topLeft: number[],
    topRight: number[],
    bottomLeft: number[],
    bottomRight: number[]
  };
}

export const DEFAULT_CONSISTENCY_VARIABLES: ConsistencyVariables = {
  channelFieldMap: {}
};
