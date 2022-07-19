export interface Route {
  [key: string]: {
    Component: { render: () => Promise<string>; after_render: () => Promise<void> };
    Roles: string[];
  };
}
