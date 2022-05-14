3.8.3
- fixed:
    - the input box cannot deselect the selection and move the cursor to the expected position when the user clicks in it in firefox.
- security:
    - upgraded some dependencies.

3.8.2
- security:
    - upgraded some dependencies.

3.8.1
- fixed:
    - the properties of the node passed to the fnCustomClasses may not be the latest.
- security:
    - upgraded some dependencies.

3.7.0
- added:
    - the fnCustomClasses property

3.6.0
- fixed:
    - the input box's width didn't fit its content well.
    - the reload() method caused an animation playing.
- security:
    - upgraded some dependencies.

3.5.0
- security:
    - upgraded some dependencies.
- fixed:
    - the previously selected node will be deselected if the user clicks a node and then the fnBeforeSelect function returns false.

3.4.0
- security:
    - upgraded some dependencies.

3.3.0
- added:
    - the expandAncestors(node) method

3.2.0
- fixed:
    - the input box's width didn't fit its content well.
- changed:
    - the createAndEdit(node, parentNode, pos) method will expand the parentNode if it is collapsed.

3.1.0
- added:
    - the dropToMove property
- removed:
    - the useDefaultDrop property
    - the useDefaultIsDroppable property
- fixed:
    - the tree ref is undefined sometimes

3.0.0
- added:
    - the enableDragNodeOut property
    - the enableDropExternalElement property
    - the useDefaultIsDroppable property
    - the useDefaultDrop property
    - the dragAndDrop.status property
    - the treeId property
    - the input slot
- fixed:
    - the cursor and the ghost image blinked when the user dragged a node over the edge of another node.
    - the input box's width didn't fit its content well.
    - the input box's content wasn't selected when a node's title was switched to edit mode.
    - the contextmenu wasn't fully displayed if parts of it was outside the container with overflow:hidden.
- security:
    - upgraded some dependencies.

2.14.0
- added:
    - the autoHideContextMenu property

2.13.0
- it's the same as 2.12.0. just publish it again for some reasons.

2.12.0
- added:
    - the fnBeforeDrop property
    - the pressEnterToBlur property
    - the createAndEdit(node, parentNode, pos) method
    - the blur(node) method
- changed:
    - the implementation of the input boxes.
    - the border color of the input boxes.

2.11.0
- fixed:
    - if the context menu was focusable, the click events wouldn't be triggered when the user clicked a menu item.

2.10.0
- added:
    - the autoReload property

2.9.0
- security:
    - upgraded some dependencies.

2.8.0
- security:
    - upgraded some dependencies.

2.7.0
- security:
    - upgraded some dependencies.

2.6.0
- fixed:
    - in firefox, a text file icon followed the mouse pointer when the user was dragging a node.

2.5.0  
- fixed:  
    - the refreshDirectoryCheckboxStateRecursively(node) method did't work properly.  
    - the reload() method caused mutations of the tree property.

2.4.0
- added:
    - prop 'fnAfterCalculate(node)'
- fixed: 
    - the title slot didn't work.
    - the switcher slot didn't work.

2.3.0
- added:
    - method 'reload()'

2.2.0
- added:
    - the node.style.showIcon property
    - the node.style.showSwitcher property
- fixed:
    - the isDroppable method sometimes didn't work properly 

2.1.1
- security:
    - upgraded some dependencies.

2.1.0
- fixed: 
    - multiple selection was enabled when the user right clicked a node.

2.0.0
- added:
    - the node.__.dpos property
    - the expand event
    - the collapse event
- changed:
    - event names: 
        - dragOver  -> dragover
        - dragStart -> dragstart
        - dragEnter -> dragenter
        - dragLeave -> dragleave
        - dragEnd   -> dragend
        - quitEdit  -> quitedit
        - checkboxStateChange -> checkboxstatechange
    - css class names:
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
    - the node.style.titleMaxWidth property is able to be assigned a negative value now.

1.3.1
- fixed: 
    - the node.style.titleMaxWidth property assigned a percentage value didn't work properly.
- added:
    - the node.style.titleMaxWidth property

1.3.0
- added:
    - the node style.extraAlwaysVisible property
    - the node style.titleMaxWidth property
    - the node style.titleOverflow property
    - the node __.titleTip property

1.2.2
- security:
    - upgraded some dependencies.

1.2.1
- fixed: 
    - #2

1.2.0
- added:
    - the node.style.extraFloatRight property

1.1.2
- fixed: 
    - dragAndDrop.dragNode and dragAndDrop.overNode were not null when a dragend event was triggered.

1.1.1
- removed:
    - the getSearchResult() method
- changed:
    - the search(keyword, fnMatch) method returns matched nodes now.

1.1.0
- removed:
    - the fnMatch property
- changed:
    - search(keyword) -> search(keyword, fnMatch)
    - refreshItems() -> refresh()
- added:
    - sort(node, recursive, fnCompare) method

1.0.0
- the first stable version
