import {
  createFiberFromElement,
  createFiberFromText
} from "./mini_react_Fiber";

export const mountChildFibers = createChildReconciler(false);
export const reconcileChildFibers = createChildReconciler(true);
function createChildReconciler(shouldTrackSideEffects) {
  function createChild(returnFiber, newChild) {
    if (newChild && typeof newChild === "object") {
      const created = createFiberFromElement(newChild, returnFiber);
      created.return = returnFiber;
      return created;
    }
    if (
      (typeof newChild === "string" && newChild !== "") ||
      typeof newChild === "number"
    ) {
      const created = createFiberFromText("" + newChild, returnFiber);
      created.return = returnFiber;
      return created;
    }
  }
  function reconcileSingleElement(returnFiber, currentFirstChild, element) {
    const created = createFiberFromElement(element, returnFiber);
    created.return = returnFiber;
    return created;
  }
  function reconcileChildrenArray(returnFiber, currentFirstChild, newChildren) {
    let firstChild = null;
    let prevNewFiber = null;
    let oldFiber = currentFirstChild; // workInprogress.alternate.child -------- null || FiberNode
    let newIndex = 0;
    let nextOldFiber = null;
    // TODO oldFiber !== null 时做current与workInProgress的比对更新
    if (oldFiber === null) {
      for (; newIndex < newChildren.length; newIndex++) {
        const newFiber = createChild(returnFiber, newChildren[newIndex]);
        if (!newFiber) {
          return;
        }
        if (!prevNewFiber) {
          firstChild = newFiber;
        } else {
          prevNewFiber.sibling = newFiber;
        }
        prevNewFiber = newFiber;
      }
    }
    return firstChild;
  }
  function reconcileSingleTextNode(
    returnFiber,
    currentFirstChild,
    textContent
  ) {
    // TODO current !== null 比较tag
    const created = createFiberFromText(textContent, returnFiber);
    created.return = returnFiber;
    return created;
  }
  function reconcileChildFibers(returnFiber, currentFirstChild, newChild) {
    if (newChild && typeof newChild === "object") {
      if (newChild.type) {
        return reconcileSingleElement(returnFiber, currentFirstChild, newChild);
      }
    }
    if (Array.isArray(newChild)) {
      return reconcileChildrenArray(returnFiber, currentFirstChild, newChild);
    }
    if (
      (typeof newChild === "string" && newChild !== "") ||
      typeof newChild === "number"
    ) {
      return reconcileSingleTextNode(
        returnFiber,
        currentFirstChild,
        "" + newChild
      );
    }
  }
  return reconcileChildFibers;
}
