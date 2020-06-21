1.4.0
    modify: prop node.style.titleMaxWidth can be assigned with a negative value.

1.3.1
    fix: node.style.titleMaxWidth with a percentage value not working properly.
    add a prop: node.__.titleMaxWidth

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
