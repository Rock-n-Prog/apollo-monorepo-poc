const namespaces = ['common', 'forms', 'index', 'contents', 'reviews', 'hello', 'users'] as const;
type Namespace = typeof namespaces[number];

export type { Namespace };
export { namespaces };
