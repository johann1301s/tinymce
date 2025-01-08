const createReducer = <T extends Record<string, any>>(reducer: (state: T, action: any) => T) => {
    return reducer;
};

type State = Array<{foo: number}>

createReducer<State>((state) => ({
    ...state,
    bar: 1 // How can I modify `createReducer` so TypeScript throws an error here?
}));