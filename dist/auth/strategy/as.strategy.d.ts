declare const AtStrategy_base: new (...args: any[]) => any;
export declare class AtStrategy extends AtStrategy_base {
    constructor();
    validate(payload: any): Promise<any>;
}
export {};
