import { Href } from "expo-router";

export const paths = {
  root: {
    getHref: (): Href => '/',
  },

  landing: {
    getHref: (): Href => '/(landing)',

    host: {
      getHref: (): Href => '/(landing)/host',
    },

    info: {
      getHref: (): Href => '/(landing)/info',
    }
  },

  tabs: {
    index: {
      getHref: (): Href => '/(pages)/(tabs)',
    },
    summary: {
      getHref: (): Href => '/(pages)/(tabs)/summary',
    },
    profile: {
      getHref: (): Href => '/(pages)/(tabs)/profile',
    }
  },
  options: {
    host: {
      getHref: (): Href => '/(pages)/(options)/host',
    },
    info: {
      getHref: (): Href => '/(pages)/(options)/info',
    },
    preferences: {
      getHref: (): Href => '/(pages)/(options)/preferences',
    }
  }
} as const;