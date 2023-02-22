import { beginWork } from "./mini_react_beginWork";
import { createFiber } from "./mini_react_Fiber";
let workInProgress = null;
let workInProgressRoot = null;
export function uploadContainer(element, container) {
  const current = container.current;
  current.updateQueue = { element };
  workInProgressRoot = root;
  const rootWorkInProgress = createWorkInProgress(current, null);
  workInProgress = rootWorkInProgress;
}
function createWorkInProgress(current, pendingProps) {
  let workInProgress = current.alternate;
  if (workInProgress === null) {
    workInProgress = createFiber(current.tag, pendingProps);
    workInProgress.elementType = current.elementType;
    workInProgress.type = current.type;
    workInProgress.stateNode = current.stateNode;
    workInProgress.alternate = current;
    current.alternate = workInProgress;
    workInProgress.memoizedProps = current.memoizedProps;
    workInProgress.updateQueue = current.updateQueue;
  }
  return workInProgress;
}

function workLoopSync() {
  // Already timed out, so perform work without checking if we need to yield.
  // 已经超时了，所以即使需要让出时，也不再做检查，直到把workInProgress执行完
  while (workInProgress !== null) {
    performUnitOfWork(workInProgress);
  }
}
requestIdleCallback(workLoopSync);
function performUnitOfWork(unitOfWork) {
  const current = unitOfWork.alternate; // 初始化mount时指向current
  let next;
  next = beginWork(current, unitOfWork);
  if (next === null) {
    console.log("createWorkInProgressTreeDone,startCommitWork");
    workInProgress = null;
    // If this doesn't spawn new work, complete the current work.
    completeUnitOfWork(unitOfWork);
  } else {
    workInProgress = next;
  }
  requestIdleCallback(workLoopSync);
}
function completeUnitOfWork(unitOfWork) {
  let completeWork = unitOfWork;
  while (false) {
    const current = unitOfWork.alternate;
    const returnFiber = unitOfWork.return;
  }
}
