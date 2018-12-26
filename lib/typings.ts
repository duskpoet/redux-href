export type LocationToState<S> = (href: URL, state: S) => S;
export type StateToLocation<S> = (
  state: S
) => {
  path?: string;
  params?: { [name: string]: string };
  replaceHistory?: boolean;
};
