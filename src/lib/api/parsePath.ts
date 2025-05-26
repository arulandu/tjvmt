export const parsePath = (path) => {
  let parts = (new RegExp(/^\w*:\/\/[^\/]*/)).exec(path);
  const baseUrl = parts.length == 0 ? '' : parts[0];
  parts = (new RegExp(/\/[\w|\/]*$/)).exec(path);
  const route = parts.length == 0 ? '' : parts[0]
  return {
    baseUrl,
    route
  }
}