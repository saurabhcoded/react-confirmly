# `react-confirmly`

A lightweight and flexible confirmation dialog component for React applications. This package provides an easy-to-use solution for handling confirmation dialogs and notifications in your React projects.

## Features

- 🎯 Simple and intuitive API
- 🎨 Customizable dialog styling
- 🔄 Multiple dialog support
- 🔔 Built-in toast notifications
- ⚡ Lightweight and performant
- �� Responsive design
- 🎭 Multiple dialog types (Confirm, Alert, Info)

## Installation

```bash
npm install react-confirmly
# or
yarn add react-confirmly
```
## Live Demo

Try React Confirmly in action with our interactive demo on Stackblitz:

[![Open in Stackblitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/vitejs-vite-begdu71a?file=src%2Findex.css)

## Usage

1. First, wrap your application with the `ConfirmlyProvider`:

```jsx
import { ConfirmlyProvider } from 'react-confirmly';

function App() {
  return <ConfirmlyProvider>{/* Your app components */}</ConfirmlyProvider>;
}
```

2. Use the confirmation dialogs in your components:

```jsx
import { useConfirmly } from 'react-confirmly';

function MyComponent() {
  const { confirm, alert, info, notify } = useConfirmly();

  const handleDelete = () => {
    confirm('Are you sure you want to delete this item?', {
      title: 'Delete Item',
      onConfirm: () => {
        // Handle confirmation
        notify.success('Item deleted successfully!');
      },
      onCancel: () => {
        notify.error('Deletion cancelled');
      },
    });
  };

  const handleWarning = () => {
    alert('This action cannot be undone!', {
      title: 'Warning',
      actions: [
        { label: 'Proceed', onClick: () => console.log('Proceeded') },
        { label: 'Cancel', onClick: () => console.log('Cancelled') },
      ],
    });
  };

  const showInfo = () => {
    info('Your changes have been saved successfully.', {
      title: 'Success',
      showIcon: true,
    });
  };

  return (
    <div>
      <button onClick={handleDelete}>Delete Item</button>
      <button onClick={handleWarning}>Show Warning</button>
      <button onClick={showInfo}>Show Info</button>
    </div>
  );
}
```

## API

### useConfirmly Hook

The hook provides the following methods:

- `confirm(description, config)` - Show a confirmation dialog
- `alert(description, config)` - Show an alert dialog
- `info(description, config)` - Show an info dialog
- `notify` - Show toast notifications
- `modals` - Current state of all modals
- `clearModals()` - Clear all modals

### Dialog Configuration

All dialog types (confirm, alert, info) accept the following configuration options:

```typescript
interface DialogConfig {
  title?: string; // Dialog title
  icon?: ReactNode; // Custom icon component
  actions?: Array<{
    // Custom action buttons
    label: string;
    onClick: () => void;
  }>;
  onConfirm?: () => void; // Callback for confirmation
  onCancel?: () => void; // Callback for cancellation
  showIcon?: boolean; // Whether to show the default icon
  divider?: boolean; // Show divider
  dividerTop?: boolean; // Show top divider
  dividerBottom?: boolean; // Show bottom divider
}
```

### Default Dialog Types

Each dialog type comes with its own default icon and title:

- **Confirm Dialog**: Default icon for confirmation actions
- **Alert Dialog**: Warning icon for important alerts
- **Info Dialog**: Information icon for general messages

### Toast Notifications

The package includes built-in toast notifications through `react-hot-toast`. You can use them like this:

```jsx
const { notify } = useConfirmly();

// Success notification
notify.success('Operation successful!');

// Warning notification with custom icon
notify.warning('Please review your changes');

// Error notification
notify.error('Something went wrong');

// Loading notification
notify.loading('Processing your request...');

// Clear all notifications
notify.clear();
```

Each notification method accepts an optional options object that can include:

- `clearPrev`: boolean - Whether to clear previous notifications before showing the new one
- Any other options supported by react-hot-toast

Example with options:

```jsx
notify.success('Operation successful!', {
  clearPrev: true,
  duration: 3000,
});
```

### ConfirmlyProvider Props

| Prop          | Type        | Description                                       |
| ------------- | ----------- | ------------------------------------------------- |
| `notifyProps` | `object`    | Props to pass to the toast notification component |
| `children`    | `ReactNode` | Child components to wrap                          |

## License

MIT © [saurabhcoded](https://github.com/saurabhcoded)
