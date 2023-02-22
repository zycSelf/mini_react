export const FiberFlags = {
  NoFlags: 0
};

function FiberNode(tag, pendingProps) {
  // Instance
  this.tag = tag;
  this.elementType = null;
  this.type = null;
  this.stateNode = null;
  // Fiber
  this.return = null;
  this.child = null;
  this.sibling = null;
  this.index = 0;

  this.pendingProps = pendingProps;
  this.memoizedProps = null;
  this.updateQueue = null;

  // Effects
  this.flags = FiberFlags.NoFlags;
  this.subtreeFlags = FiberFlags.NoFlags;
  this.deletions = null; // 删除列表

  this.alternate = null; // workInProgress 映射
}
export function createFiber(tag, pendingProps) {
  return new FiberNode(tag, pendingProps);
}

export function createFiberFromText(content, returnFiber) {
  const fiber = createFiber("HostText", content);
  return fiber;
}

export function createFiberFromElement(element, returnFiber) {
  const type = element.type;
  const pendingProps = element.props;
  const fiber = createFiberFromTypeAndProps(type, pendingProps);
  return fiber;
}
function createFiberFromTypeAndProps(type, pendingProps) {
  let fiberTag = "unknow";
  let resolvedType = type;
  // TODO FunctionElement

  // SingleElement
  fiberTag = "HostComponent";
  const fiber = createFiber(fiberTag, pendingProps);
  fiber.elementType = type;
  fiber.type = resolvedType;
  return fiber;
}
