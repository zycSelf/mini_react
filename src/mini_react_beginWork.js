import {
  mountChildFibers,
  reconcileChildFibers
} from "./mini_react_childFiber";

export function reconcileChildren(current, workInProgress, nextChildren) {
  if (current === null) {
    workInProgress.child = mountChildFibers(workInProgress, null, nextChildren);
  } else {
    const fiber = reconcileChildFibers(
      workInProgress,
      current.child,
      nextChildren,
      renderLanes
    );
    workInProgress.child = fiber;
  }
}

export function beginWork(current, workInProgress) {
  // current ----- workInprogress.alternate
  switch (workInProgress.tag) {
    case "HostRoot":
      return updateHostRoot(current, workInProgress);
    case "FunctionElement":
      return null;
    case "HostComponent":
      return updateHostComponent(current, workInProgress);
    case "unknow":
      return null;
    default:
      return null;
  }
}

function updateHostComponent(current, workInProgress) {
  const type = workInProgress.type;
  const nextProps = workInProgress.pendingProps;
  const nextChildren = nextProps.children;
  reconcileChildren(current, workInProgress, nextChildren);
  return workInProgress.child;
}

function updateHostRoot(current, workInProgress) {
  const root = workInProgress.stateNode;
  const nextProps = workInProgress.pendingProps;
  workInProgress.updateQueue = current.updateQueue;
  // UPDATEQUEUE 打平结构
  const nextChildren = workInProgress.updateQueue.element;
  const child = mountChildFibers(workInProgress, null, nextChildren);
  workInProgress.child = child;
  let node = child;
  while (node) {
    node = node.sibling;
  }
  return workInProgress.child;
}
