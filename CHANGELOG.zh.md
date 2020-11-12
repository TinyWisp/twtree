2.10.0
- 添加
    - 属性 'autoReload'

2.9.0
- 安全性:
    - 升级一些依赖包。

2.8.0
- 安全性:
    - 升级一些依赖包。

2.7.0
- 安全性:
    - 升级一些依赖包。

2.6.0
- 修正:
    - 拖动结点时，firefox中会显示一个文本文件图标。

2.5.0  
- 修正:  
    - 方法 'refreshDirectoryCheckboxStateRecursively(node)' 中的错误。  
    - 方法 'reload()' 会导致对tree属性的修改。

2.4.0
- 添加
    - 属性 'fnAfterCalculate(node)'
- 修正: 
    - 插槽 'title' 无效。
    - 插槽 'switcher' 无效。

2.3.0
- 添加:
    - 方法 'reload()'

2.2.0
- 添加:
    - 结点属性 'node.style.showIcon'
    - 结点属性 'node.style.showSwitcher'
- 修正:
    - 方法 'isDroppable(node)'在某些情形下不正常。

2.1.1
- 安全性:
    - 升级一些依赖包.

2.1.0
- 修正: 
    - 右键点击结点的时候，会多选。

2.0.0
- 添加:
    - 结点属性 'node.__.dpos'
    - 事件 'expand'
    - 事件 'collapse'
- 改动:
    - 重命名以下事件: 
        - dragOver  -> dragover
        - dragStart -> dragstart
        - dragEnter -> dragenter
        - dragLeave -> dragleave
        - dragEnd   -> dragend
        - quitEdit  -> quitedit
        - checkboxStateChange -> checkboxstatechange
    - 重命名以下css样式:
        - tree-wrapper        -> twtree-wrapper
        - tree                -> twtree
        - node                -> twtree-node
        - node-enter          -> twtree-node-enter
        - node-enter-to       -> twtree-node-enter-to
        - node-leave          -> twtree-node-leave
        - node-leave-to       -> twtree-node-leave-to
        - node-enter-active   -> twtree-node-enter-active
        - node-leave-active   -> twtree-node-leave-active
        - node-move           -> twtree-node-move
        - icon-and-title      -> twtree-icon-and-title
        - title               -> twtree-title
        - editing             -> twtree-title-editing
        - switcher-wrapper    -> twtree-switcher-wrapper
        - switcher-icon       -> twtree-switcher-icon
        - loading             -> twtree-switcher-loading
        - icon-wrapper        -> twtree-icon-wrapper
        - icon                -> twtree-icon
        - search-result       -> twtree-node-search-result
        - extra-wrapper       -> twtree-extra-wrapper
        - drag-arrow-wrapper  -> twtree-drag-arrow-wrapper
        - drag-over-prev      -> twtree-drag-over-prev
        - drag-over-self      -> twtree-drag-over-self
        - drag-over-next      -> twtree-drag-over-next
        - not-droppable       -> twtree-not-droppable
        - not-droppable-sign  -> twtree-not-droppable-sign
        - drag-image-wrapper  -> twtree-drag-image-wrapper
        - drag-image          -> twtree-drag-image
        - checkbox-wrapper    -> twtree-checkbox-wrapper
        - checkbox            -> twtree-checkbox
        - checked             -> twtree-checkbox-checked
        - unchecked           -> twtree-checkbox-unchecked
        - disabled            -> twtree-checkbox-disabled
        - undetermined        -> twtree-checkbox-undetermined
        - contextmenu-wrapper -> twtree-contextmenu-wrapper

1.4.0
- 改动: 
    - 结点属性 'node.style.titleMaxWidth' 可被赋予负值。

1.3.1
- 修正: 
    - 结点属性 'node.style.titleMaxWidth' 的值为百分比的时候效果不正确。
- 添加:
    - 结点属性 'node.style.titleMaxWidth'

1.3.0
- 添加:
    - 结点属性 'node.style.extraAlwaysVisible'
    - 结点属性 'node.style.titleMaxWidth'
    - 结点属性 'node.style.titleOverflow'
    - 结点属性 'node.__.titleTip'

1.2.2
- 安全性:
    - 升级一些依赖包.

1.2.1
- 修正: 
    - #2

1.2.0
- 添加:
    - 结点属性 'node.style.extraFloatRight'

1.1.2
- 修正: 
    - 'dragAndDrop.dragNode' 和 'dragAndDrop.overNode' 在dragend事件触发后不为空。

1.1.1
- 移除:
    - 方法 'getSearchResult()'
- 改动:
    - 方法 'search(keyword, fnMatch)' 返回匹配的结点。

1.1.0
- 移除:
    - prop 'fnMatch'
- 改动:
    - search(keyword) -> search(keyword, fnMatch)
    - refreshItems() -> refresh()
- 添加:
    - 方法 'sort(node, recursive, fnCompare)'

1.0.0
- 第一个稳定版本
