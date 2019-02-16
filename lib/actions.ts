export const Types = {
  replaceUrl: "@@re-href/replace-url"
};

export const replaceUrl = (href: string) => ({
  type: Types.replaceUrl,
  payload: {
    href
  }
});
