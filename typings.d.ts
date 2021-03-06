/// <reference types="zone.js" />
/// <reference types="meteor-typings" />
/// <reference types="@types/underscore" />
/// <reference types="@types/core-js" />
/// <reference types="@types/hammerjs" />

declare module '*.html' {
  const template: string;
  export default template;
}

declare module '*.scss' {
  const style: string;
  export default style;
}

declare module '*.less' {
  const style: string;
  export default style;
}

declare module '*.css' {
  const style: string;
  export default style;
}

declare module '*.sass' {
  const style: string;
  export default style;
}

declare module 'angular2-meteor-accounts-ui';

declare var Fake: {
  sentence(words: number): string;
}

declare module 'meteor/tmeasday:publish-counts' {
  import { Mongo } from 'meteor/mongo';

  interface CountsObject {
    get(publicationName: string): number;
    publish(context: any, publicationName: string, cursor: Mongo.Cursor<Object>, options: any): number;
  }

  export const Counts: CountsObject;
}
