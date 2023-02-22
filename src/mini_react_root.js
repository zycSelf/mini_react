import { createFiberRoot } from "./mini_react_FiberRoot";
import { uploadContainer } from "./mini_react_reconciler";

function DOMRoot(root) {
  this.internalRoot = root;
}

export function createRoot(container) {
  const initialChildren = null;
  const root = createFiberRoot(container, initialChildren);
  return new DOMRoot(root);
}

DOMRoot.prototype.render = function(children) {
  const root = this.internalRoot;
  if (root === null) {
    return;
  }

  const container = root.containerInfo;
  const nodeType = container.nodeType;

  uploadContainer(children, root);
};
