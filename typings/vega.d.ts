declare module 'vega' {
  export const version: string;
  export function parse(spec: any, config?: any): any;
  export function scale(type: any, scale?: any): any;
  export class View {
    _runtime: any;
    _viewWidth?: number;
    _viewHeight?: number;
    _origin?: number[];
    constructor(runtime: any);
    public logLevel(level: number): View;
    public initialize(dom: Element | string): View;
    public renderer(renderer: string): View;
    public finalize(): void;
    public hover(): View;
    public run(): View;
    public runAfter(callback: (view: View) => any): void;
    public change(name: string, changeset: any): View;
    public changeset(): any;
    public data(name: string): object[];
    public scenegraph(): any;
    public width(width?: number): number;
    public height(height?: number): number;
    public background(color?: any): any;
  }
  export const Warn: number;
  export const changeset: any;
}

declare module 'vega-event-selector' {
  export function selector(selector: string, source: string): any[];
}