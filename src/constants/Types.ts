// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PropsObject = { [key: string]: any };

// eslint-disable-next-line no-empty-pattern
export type FunctionalComponent = ({}: PropsObject) => JSX.Element;
