2.4.0
    add a prop: fnAfterCalculate
    fix: 
        slot 'title' not working
        slot 'switcher' not working

2.3.0
    add a method: reload()

2.2.0
    add props: node.style.showIcon, node.style.showSwitcher
    fix a bug: method isDroppable sometimes doesn't work improperly 

2.1.1
    upgrade some dependencies

2.1.0
    fix: multiple selection is enabled when the user right click a node

2.0.0
    add a prop: node.__.dpos
    add events: expand, collapse
    rename events: 
        dragOver  -> dragover
        dragStart -> dragstart
        dragEnter -> dragenter
        dragLeave -> dragleave
        dragEnd   -> dragend
        quitEdit  -> quitedit
        checkboxStateChange -> checkboxstatechange
    rename css classes:
        tree-wrapper        -> twtree-wrapper
        tree                -> twtree
        node                -> twtree-node
        node-enter          -> twtree-node-enter
        node-enter-to       -> twtree-node-enter-to
        node-leave          -> twtree-node-leave
        node-leave-to       -> twtree-node-leave-to
        node-enter-active   -> twtree-node-enter-active
        node-leave-active   -> twtree-node-leave-active
        node-move           -> twtree-node-move
        icon-and-title      -> twtree-icon-and-title
        title               -> twtree-title
        editing             -> twtree-title-editing
        switcher-wrapper    -> twtree-switcher-wrapper
        switcher-icon       -> twtree-switcher-icon
        loading             -> twtree-switcher-loading
        icon-wrapper        -> twtree-icon-wrapper
        icon                -> twtree-icon
        search-result       -> twtree-node-search-result
        extra-wrapper       -> twtree-extra-wrapper
        drag-arrow-wrapper  -> twtree-drag-arrow-wrapper
        drag-over-prev      -> twtree-drag-over-prev
        drag-over-self      -> twtree-drag-over-self
        drag-over-next      -> twtree-drag-over-next
        not-droppable       -> twtree-not-droppable
        not-droppable-sign  -> twtree-not-droppable-sign
        drag-image-wrapper  -> twtree-drag-image-wrapper
        drag-image          -> twtree-drag-image
        checkbox-wrapper    -> twtree-checkbox-wrapper
        checkbox            -> twtree-checkbox
        checked             -> twtree-checkbox-checked
        unchecked           -> twtree-checkbox-unchecked
        disabled            -> twtree-checkbox-disabled
        undetermined        -> twtree-checkbox-undetermined
        contextmenu-wrapper -> twtree-contextmenu-wrapper

1.4.0
    modify: prop node.style.titleMaxWidth is able to be assigned with a negative value.

1.3.1
    fix: node.style.titleMaxWidth with a percentage value not working properly.
    add a prop: node.style.titleMaxWidth

1.3.0
    add props: node.style.extraAlwaysVisible, node.style.titleMaxWidth, node.style.titleOverflow, node.__.titleTip

1.2.2
    upgrade some dependencies

1.2.1
    fix: #2

1.2.0
    add a prop: node.style.extraFloatRight

1.1.2
    fix: dragAndDrop.dragNode and dragAndDrop.overNode are not null when dragend event is triggered.

1.1.1
    methods:
        remove method: getSearchResult()
        search(keyword, fnMatch) returns matched nodes

1.1.0
    props: remove prop 'fnMatch'
    methods: 
        search(keyword) -> search(keyword, fnMatch)
        refreshItems() -> refresh()
        add method: sort(node, recursive, fnCompare)

1.0.0  the first stable version
