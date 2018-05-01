/* constant value */
export interface ConstantValue {
  constant: string | number;
}

export class ConstantValue implements ConstantValue {
  constructor(value: any) {
    this.constant = value;
  }
}

export function isConstantValue (scale: any): scale is ConstantValue {
  if (!scale) {
    return false;
  }
  if (typeof scale.constant === ('string' || 'number') ) {
    return true;
  }
  return false;
}
