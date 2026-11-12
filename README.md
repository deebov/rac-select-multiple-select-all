# React Aria `Select` (`selectionMode="multiple"`): select all is ignored

Minimal repro for `react-aria-components@1.22.1`.

[Open in StackBlitz](https://stackblitz.com/github/deebov/rac-select-multiple-select-all?file=src%2FApp.tsx)

## Steps

1. Open the "Fruits" `Select` (`selectionMode="multiple"`).
2. With the list focused, press <kbd>Cmd</kbd>/<kbd>Ctrl</kbd>+<kbd>A</kbd>, or click the `selectionManager.selectAll()` button rendered inside the popover.

**Expected:** every item is selected and `onChange` is called with all keys, like the standalone `ListBox` in section 2.

**Actual:** nothing is selected and `onChange` is never called. Clicking a single option works.

## Run locally

```sh
npm install
npm run dev
```
