export const samplePosts = [
  {
    id: '1',
    title: 'Getting Started with React and TypeScript',
    content: `# Getting Started with React and TypeScript

React and TypeScript are a powerful combination for building robust web applications. Here's why you should consider using them together:

## Type Safety

TypeScript adds static typing to JavaScript, helping you catch errors before they reach production.

## Better Developer Experience

- Improved autocomplete
- Easier refactoring
- Better documentation

## Code Example

\`\`\`typescript
interface Props {
  name: string;
  age: number;
}

const Greeting: React.FC<Props> = ({ name, age }) => {
  return <h1>Hello, {name}! You are {age} years old.</h1>;
};
\`\`\`

Give it a try in your next project!`,
    authorId: 'system',
    author: 'System Admin',
    createdAt: '2024-03-10T10:00:00.000Z',
    updatedAt: '2024-03-10T10:00:00.000Z'
  },
  {
    id: '2',
    title: 'Modern Web Development Best Practices',
    content: `# Modern Web Development Best Practices

Building modern web applications requires following certain best practices to ensure maintainability and performance.

## Key Areas to Focus On

1. Performance Optimization
2. Accessibility
3. Security
4. Responsive Design

## Tips for Better Performance

- Use code splitting
- Implement lazy loading
- Optimize images
- Minimize bundle size

Remember: Always measure performance impact before and after optimization!`,
    authorId: 'system',
    author: 'System Admin',
    createdAt: '2024-03-09T15:30:00.000Z',
    updatedAt: '2024-03-09T15:30:00.000Z'
  }
];

export const sampleComments = [
  {
    id: '1',
    content: 'Great introduction to TypeScript with React!',
    authorId: 'system',
    author: 'Tech Enthusiast',
    postId: '1',
    createdAt: '2024-03-10T11:00:00.000Z'
  },
  {
    id: '2',
    content: 'The code examples are very helpful. Thanks for sharing!',
    authorId: 'system',
    author: 'React Developer',
    postId: '1',
    createdAt: '2024-03-10T12:30:00.000Z'
  }
];