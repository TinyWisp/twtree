2.6.0
- fixed:
    - in firefox, a text file icon follows the mouse pointer when the user is dragging a node.

2.5.0  
- fixed:  
    - method 'refreshDirectoryCheckboxStateRecursively(node)' doesn't work properly.  
    - method 'reload()' will cause the mutations of prop 'tree'.

2.4.0
- added
    - prop 'fnAfterCalculate(node)'
- fixed: 
    - slot 'title' doesn't work.
    - slot 'switcher' doesn't work.

2.3.0
- added:
    - method 'reload()'

2.2.0
- added:
    - node prop 'node.style.showIcon'
    - node prop 'node.style.showSwitcher'
- fixed:
    - method 'isDroppable' sometimes doesn't work properly 

2.1.1
- security:
    - upgrade some dependencies.

2.1.0
- fixed: 
    - multiple selection is enabled when the user right clicks a node.

2.0.0
- added:
    - node prop 'node.__.dpos'
    - event 'expand'
    - event 'collapse'
- changed:
    - rename some events: 
        - dragOver  -> dragover
        - dragStart -> dragstart
        - dragEnter -> dragenter
        - dragLeave -> dragleave
        - dragEnd   -> dragend
        - quitEdit  -> quitedit
        - checkboxStateChange -> checkboxstatechange
    - rename css classes:
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
- changed: 
    - node prop 'node.style.titleMaxWidth' is able to be assigned with a negative value.

1.3.1
- fixed: 
    - node prop 'node.style.titleMaxWidth' with a percentage value doesn't work properly.
- added:
    - node prop 'node.style.titleMaxWidth'

1.3.0
- added:
    - node prop 'node.style.extraAlwaysVisible'
    - node prop 'node.style.titleMaxWidth'
    - node prop 'node.style.titleOverflow'
    - node prop 'node.__.titleTip'

1.2.2
- security:
    - upgrade some dependencies.

1.2.1
- fixed: 
    - #2

1.2.0
- added:
    - node prop 'node.style.extraFloatRight'

1.1.2
- fixed: 
    - 'dragAndDrop.dragNode' and 'dragAndDrop.overNode' are not null when dragend event is triggered.

1.1.1
- removed:
    - method 'getSearchResult()'
- changed:
    - method 'search(keyword, fnMatch)' returns matched nodes

1.1.0
- removed:
    - prop 'fnMatch'
- changed:
    - search(keyword) -> search(keyword, fnMatch)
    - refreshItems() -> refresh()
- added:
    - method 'sort(node, recursive, fnCompare)'

1.0.0
- the first stable version
