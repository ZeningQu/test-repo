import { Type } from 'vega-lite/build/src/type';

export interface ChannelProps {
  field: string;
  fieldType: Type;
  domain: string[] | number[];
  range: string[] | number[];
  scaleType: string;
}

export function isChannelProps (scale: any): scale is ChannelProps {
  return scale ? (scale.field ? true : false) : false;
}