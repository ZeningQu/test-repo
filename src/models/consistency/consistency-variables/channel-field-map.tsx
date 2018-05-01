/* Lean Channel-Field Map */
export type FieldName = string;
export interface ChannelFieldMap {
  x?: FieldName;
  y?: FieldName;
  color?: FieldName;
  size?: FieldName;
  shape?: FieldName;
  opacity?: FieldName; // TODO: use index signature
}

export class ChannelFieldMap implements ChannelFieldMap {
  constructor(encoding: any) {
    for (let channel in encoding) {
      if (encoding[channel] && encoding[channel].field) {
        this[channel] = encoding[channel].field;
      }
    }
  }
}