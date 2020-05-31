1.2.1
    fix bug: #2

1.2.0
    add prop: node.style.extraFloatRight

1.1.2
    fix bug: dragAndDrop.dragNode and dragAndDrop.overNode are not null when dragend event is triggered.

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