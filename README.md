# <div align="center">`react-confirmly`</div>

<div align="center">

[![GitHub stars](https://img.shields.io/github/stars/saurabhcoded/react-confirmly?style=social)](https://github.com/saurabhcoded/react-confirmly/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/saurabhcoded/react-confirmly)](https://github.com/saurabhcoded/react-confirmly/issues)
[![GitHub pull requests](https://img.shields.io/github/issues-pr/saurabhcoded/react-confirmly)](https://github.com/saurabhcoded/react-confirmly/pulls)

[![Suggest Feature](https://img.shields.io/badge/Suggest%20Feature-Open%20Issue-blue?style=for-the-badge&logo=github)](https://github.com/saurabhcoded/react-confirmly/issues/new?labels=enhancement&template=feature_request.md&title=Feature%20Request%3A%20)
[![Report Bug](https://img.shields.io/badge/Report%20Bug-Open%20Issue-red?style=for-the-badge&logo=github)](https://github.com/saurabhcoded/react-confirmly/issues/new?labels=bug&template=bug_report.md&title=Bug%20Report%3A%20)

</div>

A lightweight and flexible confirmation dialog component for React applications. This package provides an easy-to-use solution for handling confirmation dialogs and notifications in your React projects.

## Features

- 🎯 Simple and intuitive API
- 🎨 Customizable dialog styling
- 🔄 Multiple dialog support
- 🔔 Built-in toast notifications
- ⚡ Lightweight and performant
- 📱 Responsive design
- 🎭 Multiple dialog types (Confirm, Alert, Info)
- 🎨 CSS Custom Properties for easy theming

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

## Customization

### CSS Custom Properties

You can customize the appearance of the dialogs by overriding the CSS custom properties in your application:

```css
:root {
  /* Button Styles */
  --cfm-btn-bg: #d4deff;
  --cfm-btn-color: #0d134d;
  --cfm-btn-borderRadius: 6px;

  /* Modal Styles */
  --cfm-modal-bg: #ffffff;
  --cfm-modal-borderRadius: 8px;

  /* Header Styles */
  --cfm-header-fs: 1.2rem;
  --cfm-header-color: #001f3f;
  --cfm-header-padding: 10px 16px;

  /* Content Styles */
  --cfm-content-fs: 1rem;
  --cfm-content-color: #001f3f;
  --cfm-content-padding: 25px 16px;

  /* Action Buttons Styles */
  --cfm-actions-padding: 10px 16px;
  --cfm-actions-gap: 8px;

  /* Backdrop Styles */
  --cfm-backdrop-color: rgba(10, 10, 10, 0.53);
  --cfm-backdrop-blur: 2px;

  /* Divider Styles */
  --cfm-divider: #dadada;

  /* Screen Margin */
  --cfm-screen-margin: 30px;
}
```

### Dialog Positioning

The dialogs can be positioned in different locations on the screen using the `position` prop:

```jsx
confirm('Are you sure?', {
  position: 'top-left' | 'top-right' | 'top-center' |
            'left' | 'center' | 'right' |
            'bottom-left' | 'bottom-right' | 'bottom'
});
```

Available positions:
- `top-left`
- `top-right`
- `top-center`
- `left`
- `center` (default)
- `right`
- `bottom-left`
- `bottom-right`
- `bottom`

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
  position?: string; // Dialog position
  disablePortal?: boolean; // Disable portal rendering
  actionsAlign?: 'left' | 'center' | 'right'; // Align action buttons
}
```

### ConfirmlyProvider Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Child components to wrap |
| `notifyProps` | `ToasterProps` | `{}` | Props to pass to the toast notification component. See [react-hot-toast options](https://react-hot-toast.com/docs/toast) |
| `disablePortal` | `boolean` | `false` | Whether to disable portal rendering for dialogs |
| `dialogPosition` | `'top-left' \| 'top-right' \| 'top-center' \| 'left' \| 'center' \| 'right' \| 'bottom-left' \| 'bottom-right' \| 'bottom-center'` | `'center'` | Default position for all dialogs |
| `showIcons` | `boolean` | `true` | Whether to show icons in dialogs by default |

Example usage with props:

```jsx
import { ConfirmlyProvider } from 'react-confirmly';

function App() {
  return (
    <ConfirmlyProvider
      disablePortal={false}
      dialogPosition="top-right"
      showIcons={true}
      notifyProps={{
        position: 'top-right',
        duration: 3000,
        style: {
          background: '#333',
          color: '#fff',
        },
      }}
    >
      {/* Your app components */}
    </ConfirmlyProvider>
  );
}
```

The provider accepts these props to configure the global behavior of all dialogs. Individual dialog configurations can override these settings when needed.

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

## License

MIT © [saurabhcoded](https://github.com/saurabhcoded)
