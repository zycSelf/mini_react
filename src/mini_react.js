function newElement(type, self, source, props) {
    const element = {
        type:type,
        props:props
    }

    return element
}
const RESOLVE_PROPS =  {
    __self: true,
    __source: true,
  };
export function createElement (type,config,children) {
    let self = config.__self === undefined ? null : config.__self;      //reactElement dev属性
    let source = config.__source === undefined ? null : config.__source;    //reactElement dev属性
    let props = {}
    let propName
    for(propName in config) {
        if (
            hasOwnProperty.call(config, propName) &&
            !RESOLVE_PROPS.hasOwnProperty(propName)
          ) {
            props[propName] = config[propName]
          }
    }

    const childrenLen = arguments.length - 2
    if(childrenLen === 1) {
        props.children = children
    }else if(childrenLen > 1) {
        const childrenArray = []
        for(let i =0;i<childrenLen;i++) {
            childrenArray.push(arguments[i+2])
        }
        props.children = childrenArray
    }

    return newElement(type,self,source,props)
    
}