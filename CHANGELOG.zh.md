4.2.0
- 删除:
    - 属性 allowedDragFromTreeIds.
    - 方法 allowExternalTouchOperation.

4.1.0
- 删除:
    - 方法 allowTouchOperationFromAnotherTree。
    - 方法 forbidTouchOperationFromAnotherTree。
- 添加:
    - 属性 allowedTouchFromTreeIds。
    - 方法 getDragFrom。

4.0.1
- 添加:
    - 触屏拖拽支持。
    - 属性 enableTouchSupport。
    - 方法 allowTouchOperationFromAnotherTree。
    - 方法 forbidTouchOperationFromAnotherTree。
    - 方法 allowExternalTouchOperation。
    - 方法 isTheTouchOperationFromTheTree。
    - 事件 dragleavetree
    - 事件 dragentertree
- 安全性:
    - 升级了一些依赖包。
    - 包@rollup/plugin-buble 替换为 @rollup/plugin-babel。
    - 包vue-jest 替换为 @vue/vue2-jest。

3.8.3
- 修正:
    - firefox中，编辑一个节点时，鼠标点击输入框中，输入框不能取消全选状态且光标未能移到指定位置。
- 安全性:
    - 升级了一些依赖包。

3.8.2
- 安全性:
    - 升级了一些依赖包。

3.8.1
- 修正:
    - 当fnCustomClasses被回调时，传入的node参数，其一些属性可能不是最新。
- 安全性:
    - 升级了一些依赖包。

3.7.0
- 添加:
    - 属性 fnCustomClasses

3.6.0
- 修正:
    - 编辑一个结点的标题时，输入框的宽度不能很好地适应内容的长度。
    - 方法reload()会产生一个动画效果。
- 安全性:
    - 升级一些依赖包.


3.5.0
- 安全性:
    - 升级一些依赖包。
- 修正:
    - 当只允许选中一个结点时，点击某个结点，fnBeforeSelect返回false，使得所点击结点未被选中，此时原来选中的结点也会失去选中状态。

3.4.0
- 安全性:
    - 升级一些依赖包。

3.3.0
- 添加:
    - 方法 expandAncestor(node)

3.2.0
- 修正：
    - 编辑一个结点的标题时，输入框的宽度不能很好地适应内容的长度。
- 变动:
    - 方法createAndEdit(node, parentNode, pos)会展开parentNode，如果parentNode是折叠状态。

3.1.0
- 添加:
    - 属性 dropToMove
- 删除:
    - 属性 useDefaultDrop
    - 属性 useDefaultIsDroppable
- 修正:
    - console中有时会报错，this.$refs.tree为undefined

3.0.0
- 添加:
    - 属性 enableDragNodeOut
    - 属性 enableDropExternalElement
    - 属性 useDefaultIsDroppable
    - 属性 useDefaultDrop
    - 属性 treeId
    - 属性 dragAndDrop.status
    - 插槽 input slot
- 修正:
    - 当用户拖动一个结点跨过一个结点的边缘时，鼠标及缩略图会闪烁。
    - 编辑一个结点的标题时，输入框的宽度不能很好地适应内容的长度。
    - 一个结点进入编辑模式时，内容不是选中状态。
    - 当父容器有overflow:hidden属性时，右键菜单可能会被遮挡。
- 安全性:
    - 升级一些依赖包.

2.14.0
- 添加:
    - 属性 autoHideContextMenu

2.13.0
- 与2.12.0相同，只是重新发布

2.12.0
- 添加:
    - 属性 fnBeforeDrop
    - 属性 pressEnterToBlur
    - 方法 createAndEdit(node, parentNode, pos)
    - 方法 blur(node)
- 变动:
    - 编辑结点时，输入框由contenteditable的span变为input，用户可从node.title直接获取用户编辑的内容，不再需要getNewTitle方法
    - 输入框的边框颜色由黑色变为蓝色

2.11.0
- 修正:
    - 如果右键菜单可取得焦点，则点击菜单项时，不会产生click事件。

2.10.0
- 添加:
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
