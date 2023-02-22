import { createFiber } from "./mini_react_Fiber";

function FiberRootNode(containerInfo) {
    this.containerInfo = containerInfo
    // 指向rootFiber
    this.current = null
}   // FiberRoot 通过在workInProgress与current切换实现双缓存渲染

function createRootFiber() {
    return createFiber("HostRoot");
}

export function createFiberRoot(containerInfo,initialChildren) {
    const FiberRoot = new FiberRootNode(containerInfo)
    const RootFiber = createRootFiber()
    FiberRoot.current = RootFiber
    RootFiber.stateNode = FiberRoot
    return FiberRoot
}