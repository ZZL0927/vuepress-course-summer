declare const __STATE: any

declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}
