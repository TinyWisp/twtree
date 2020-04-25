import TWTree from '../../components/TWTree.vue'
import { mount } from '@vue/test-utils'

describe('basic', ()=>{
    let commonTree = [
        {
            id: 1,
            title: 'ROOT',
            hasChild: true,
            children: [
                {
                    id: 2,
                    title: 'child 1'
                },
                {
                    id: 3,
                    title: 'child 2',
                    hasChild: true,
                    children: [
                        {
                            id: 4,
                            title: 'child 2-1'
                        },
                        {
                            id: 5,
                            title: 'child 2-2'
                        },
                        {
                            id: 6,
                            title: 'child 2-3'
                        }
                    ]
                },
                {
                    id: 7,
                    title: 'child 3'
                },
                {
                    id: 8,
                    title: 'child 4'
                }
            ]
        }
    ]

    it('data:items', async ()=>{
        let wrapper = mount(TWTree, {
            propsData: {
                tree: commonTree
            }
        })
        await wrapper.vm.$nextTick()

        let items = wrapper.vm.items

        expect(items.length).toBe(8)
        for (let i=0; i<8; i++) {
            let item = items[i]

            expect(item.id).toBe(i + 1)
            expect(item.__.gpos).toBe(i)
            expect(item.__.depth).toBe(item.__.path.length + 1)

            if (item.__.parent !== null) {
                let parent = item.__.parent
                expect(parent.hasChild).toBeTruthy()
                expect(parent.children).toContain(item)
                expect(parent.children.indexOf(item)).toBe(item.__.pos)
            }
        }

        expect(items[0].title).toMatch('ROOT')
        expect(items[0].__.parent).toBeNull()
        expect(items[2].__.parent).toBe(items[0])
        expect(items[5].__.parent).toBe(items[2])
    })

    it('method: getById', async ()=>{
        let wrapper = mount(TWTree, {
            propsData: {
                tree: commonTree
            }
        })
        await wrapper.vm.$nextTick()

        let items = wrapper.vm.items
        for (let i=0; i<8; i++) {
            let item = items[i]
            let id = item.id
            expect(wrapper.vm.getById(id)).toBe(item)
        }
    })

    it('method: getByGpos', async ()=>{
        let wrapper = mount(TWTree, {
            propsData: {
                tree: commonTree
            }
        })
        await wrapper.vm.$nextTick()

        let items = wrapper.vm.items
        for (let i=0; i<8; i++) {
            let item = items[i]
            let gpos = item.__.gpos
            expect(wrapper.vm.getByGpos(gpos)).toBe(item)
        }
    })

    it('method: getAttr', async ()=>{
        let wrapper = mount(TWTree, {
            propsData: {
                tree: commonTree
            }
        })
        await wrapper.vm.$nextTick()

        let items = wrapper.vm.items
        for (let i=0; i<8; i++) {
            let item = items[i]
            expect(item.id).toBe(wrapper.vm.getAttr(item, 'id'))
            expect(item.title).toBe(wrapper.vm.getAttr(item, 'title'))
            expect(item.__.parent).toBe(wrapper.vm.getAttr(item, '__', 'parent'))
            expect(item.__.path).toBe(wrapper.vm.getAttr(item, '__', 'path'))
            expect(item.__.pos).toBe(wrapper.vm.getAttr(item, '__', 'pos'))
        }
    })

    it('method: setAttr', async ()=>{
        let wrapper = mount(TWTree, {
            propsData: {
                tree: commonTree
            }
        })
        await wrapper.vm.$nextTick()

        let items = wrapper.vm.items
        for (let i=0; i<8; i++) {
            let item = items[i]
            wrapper.vm.setAttr(item, 'test', i)
            expect(item.test).toBe(i)

            wrapper.vm.setAttr(item, 'sub', 'test', i)
            expect(item.sub.test).toBe(i)
        }
    })

    it('method: getFlatTree', async ()=>{
        let wrapper = mount(TWTree, {
            propsData: {
                tree: commonTree
            }
        })
        await wrapper.vm.$nextTick()

        let items = wrapper.vm.getFlatTree()
        expect(items.length).toBe(8)
        for (let i=0; i<8; i++) {
            expect(items[i].id).toBe(i+1)
        }
    })

    it('method: getNestedTree', async ()=>{
        let wrapper = mount(TWTree, {
            propsData: {
                tree: commonTree
            }
        })
        await wrapper.vm.$nextTick()

        let nodes = wrapper.vm.getNestedTree()
        expect(nodes.length).toBe(1)
        
        let root = nodes[0]
        expect(root.id).toBe(1)
        expect(root.title).toBe('ROOT')
        expect(root.hasChild).toBeTruthy()
        expect(root.children.length).toBe(4)

        let child2 = root.children[1]
        expect(child2.id).toBe(3)
        expect(child2.hasChild).toBeTruthy()
        expect(child2.children.length).toBe(3)
    })

    it('method: create', async ()=>{
        let wrapper = mount(TWTree, {
            propsData: {
                tree: commonTree
            }
        })
        await wrapper.vm.$nextTick()


        let node3 = wrapper.vm.getById(3)
        wrapper.vm.create({
            id: 9,
            title: 'create node',
            hasChild: false
        }, node3, 1)

        let created = wrapper.vm.getById(9)
        expect(created.__.parent).toBe(node3)
        expect(node3.children.length).toBe(4)
        expect(created).toBe(wrapper.vm.getByGpos(4))

        let node8 = wrapper.vm.getById(8)
        wrapper.vm.create({
            id: 10,
            title: 'create node',
            hasChild: false
        }, node8)
        created = wrapper.vm.getById(10)
        expect(created.__.parent).toBe(node8)
        expect(node8.hasChild).toBeTruthy()
        expect(node8.children.length).toBe(1)
        expect(node8.children[0]).toBe(created)
    })

    it('method: remove', async ()=>{
        let wrapper = mount(TWTree, {
            propsData: {
                tree: commonTree
            }
        })
        await wrapper.vm.$nextTick()

        wrapper.vm.remove(wrapper.vm.getById(5))        
        expect(wrapper.vm.getById(5)).toBeNull()
        expect(wrapper.vm.getById(3).children.length).toBe(2)

        wrapper.vm.remove(wrapper.vm.getById(3))
        expect(wrapper.vm.getById(3)).toBeNull()
        expect(wrapper.vm.items.length).toBe(4)
        
        expect(wrapper.vm.getById(8).__.pos).toBe(2)
    })

    it('method: move', async ()=>{
        let wrapper = mount(TWTree, {
            propsData: {
                tree: commonTree
            }
        })
        await wrapper.vm.$nextTick()

        let node3 = wrapper.vm.getById(3)
        let node5 = wrapper.vm.getById(5)
        let node6 = wrapper.vm.getById(6)

        expect(node3.children[1]).toBe(node5)
        wrapper.vm.move(node5, node3, 3)
        expect(node3.children.length).toBe(3)
        expect(node3.children[2]).toBe(node5)
        expect(node3.children[1]).toBe(node6)
        expect(node5.__.pos).toBe(2)
    })

    it('method: sort', async ()=>{
        let wrapper = mount(TWTree, {
            propsData: {
                tree: commonTree
            }
        })
        await wrapper.vm.$nextTick()

        let node3 = wrapper.vm.getById(3)
        wrapper.vm.sort(node3, false, function(node1, node2) {
            return node2.id - node1.id
        })

        expect(node3.children[0].id).toBe(6)
        expect(node3.children[1].id).toBe(5)
        expect(node3.children[2].id).toBe(4)
    })

    it('methods: search, getSearchResult, clearSearchResult', async ()=>{
        let wrapper = mount(TWTree, {
            propsData: {
                tree: commonTree,
                checkboxLinkage: true,
                defaultAttrs: {
                    checkbox: {
                        show: true,
                        state: 'unchecked',
                        disable: false
                    }
                }
            }
        })
        await wrapper.vm.$nextTick()

        wrapper.vm.search('ROOT')
        let nodes = wrapper.vm.getSearchResult()
        expect(nodes.length).toBe(1)
        expect(nodes[0]).toBe(wrapper.vm.getById(1))
        expect(nodes[0].__.isSearchResult).toBeTruthy()

        wrapper.vm.search({min:3, max:5}, function(node, keyword){
            return (node.id >= keyword.min && node.id <= keyword.max)
        })
        nodes = wrapper.vm.getSearchResult()
        expect(nodes.length).toBe(3)
        expect(nodes).toContain(wrapper.vm.getById(3))
        expect(nodes).toContain(wrapper.vm.getById(4))
        expect(nodes).toContain(wrapper.vm.getById(5))
        expect(nodes[0].__.isSearchResult).toBeTruthy()
        expect(nodes[1].__.isSearchResult).toBeTruthy()
        expect(nodes[2].__.isSearchResult).toBeTruthy()

        wrapper.vm.clearSearchResult()
        for (let item of wrapper.vm.items) {
            expect(item.__.isSearchResult).toBeFalsy()
        }
    })
})

describe('select', ()=>{
    let selectTree = [
        {
            id: 1,
            title: 'ROOT',
            hasChild: true,
            children: [
                {
                    id: 2,
                    title: 'child 1',
                    selected: true
                },
                {
                    id: 3,
                    title: 'child 2',
                    hasChild: true,
                    children: [
                        {
                            id: 4,
                            title: 'child 2-1'
                        },
                        {
                            id: 5,
                            title: 'child 2-2',
                        },
                        {
                            id: 6,
                            title: 'child 2-3'
                        }
                    ]
                },
                {
                    id: 7,
                    title: 'child 3'
                },
                {
                    id: 8,
                    title: 'child 4'
                }
            ]
        }
    ]


    it('data: items', async ()=>{
        let wrapper = mount(TWTree, {
            propsData: {
                tree: selectTree,
            }
        })
        await wrapper.vm.$nextTick()

        let items = wrapper.vm.items
        for (let i=0; i<8; i++) {
            if (i !== 1) {
                expect(items[i].selected).toBeFalsy()
            } else {
                expect(items[i].selected).toBeTruthy()
            }
        }
    })

    it('methods: getSelected, getSelectedOne, select, deselect', async ()=>{
        let wrapper = mount(TWTree, {
            propsData: {
                tree: selectTree,
                multiSelect: true
            }
        })
        await wrapper.vm.$nextTick()

        let selected = wrapper.vm.getSelected()
        let selectedOne = wrapper.vm.getSelectedOne()
        expect(selected.length).toBe(1)
        expect(selected[0]).toBe(selectedOne)

        let node5 = wrapper.vm.getById(5)
        wrapper.vm.select(node5)
        selected = wrapper.vm.getSelected()
        selectedOne = wrapper.vm.getSelectedOne()
        expect(selected.length).toBe(2)
        expect(selectedOne).toBe(selected[0])

        let node7 = wrapper.vm.getById(7)
        wrapper.vm.select(node7)
        selected = wrapper.vm.getSelected()
        selectedOne = wrapper.vm.getSelectedOne()
        expect(selected.length).toBe(3)
        expect(selectedOne).toBe(selected[0])

        wrapper.vm.select(node7)
        selected = wrapper.vm.getSelected()
        selectedOne = wrapper.vm.getSelectedOne()
        expect(selected.length).toBe(3)
        expect(selectedOne).toBe(selected[0])

        wrapper.vm.deselect(node7)
        selected = wrapper.vm.getSelected()
        selectedOne = wrapper.vm.getSelectedOne()
        expect(selected.length).toBe(2)
        expect(selectedOne).toBe(selected[0])
    })


    it('action: single select', async ()=>{
        let wrapper = mount(TWTree, {
            propsData: {
                tree: selectTree,
                multiSelect: false
            }
        })
        await wrapper.vm.$nextTick()

        let selected = wrapper.vm.getSelected()
        let selectedOne = wrapper.vm.getSelectedOne()
        expect(selected.length).toBe(1)
        expect(selected[0]).toBe(selectedOne)

        wrapper.get({ref: 'node-5'}).trigger('click')
        await wrapper.vm.$nextTick()
        selected = wrapper.vm.getSelected()
        selectedOne = wrapper.vm.getSelectedOne()
        expect(selected.length).toBe(1)
        expect(selectedOne).toBe(selected[0])

        wrapper.get({ref: 'node-6'}).trigger('click')
        await wrapper.vm.$nextTick()
        selected = wrapper.vm.getSelected()
        selectedOne = wrapper.vm.getSelectedOne()
        expect(selected.length).toBe(1)
        expect(selectedOne).toBe(selected[0])

        wrapper.get({ref: 'node-6'}).trigger('click')
        await wrapper.vm.$nextTick()
        selected = wrapper.vm.getSelected()
        selectedOne = wrapper.vm.getSelectedOne()
        expect(selected.length).toBe(1)
        expect(selectedOne).toBe(selected[0])
    })

    it('action: multi select', async ()=>{
        let wrapper = mount(TWTree, {
            propsData: {
                tree: selectTree,
                multiSelect: true
            }
        })
        await wrapper.vm.$nextTick()

        let selected = wrapper.vm.getSelected()
        let selectedOne = wrapper.vm.getSelectedOne()
        expect(selected.length).toBe(1)
        expect(selected[0]).toBe(selectedOne)

        wrapper.get({ref: 'node-5'}).trigger('click')
        await wrapper.vm.$nextTick()
        selected = wrapper.vm.getSelected()
        selectedOne = wrapper.vm.getSelectedOne()
        expect(selected.length).toBe(2)
        expect(selectedOne).toBe(selected[0])

        wrapper.get({ref: 'node-7'}).trigger('click')
        await wrapper.vm.$nextTick()
        selected = wrapper.vm.getSelected()
        selectedOne = wrapper.vm.getSelectedOne()
        expect(selected.length).toBe(3)
        expect(selectedOne).toBe(selected[0])

        wrapper.get({ref: 'node-7'}).trigger('click')
        await wrapper.vm.$nextTick()
        selected = wrapper.vm.getSelected()
        selectedOne = wrapper.vm.getSelectedOne()
        expect(selected.length).toBe(2)
        expect(selectedOne).toBe(selected[0])
    })
})

describe('checkbox (checkboxLinkage = true)', ()=>{
    let checkboxTree = [
        {
            id: 1,
            title: 'ROOT',
            hasChild: true,
            children: [
                {
                    id: 2,
                    title: 'child 1'
                },
                {
                    id: 3,
                    title: 'child 2',
                    hasChild: true,
                    children: [
                        {
                            id: 4,
                            title: 'child 2-1',
                            checkbox: {
                                show: false
                            }
                        },
                        {
                            id: 5,
                            title: 'child 2-2',
                            checkbox: {
                                disable: true
                            }
                        },
                        {
                            id: 6,
                            title: 'child 2-3',
                            checkbox: {
                                state: 'checked'
                            }
                        }
                    ]
                },
                {
                    id: 7,
                    title: 'child 3'
                },
                {
                    id: 8,
                    title: 'child 4'
                }
            ]
        }
    ]


    it('data: items', async ()=>{
        let wrapper = mount(TWTree, {
            propsData: {
                tree: checkboxTree,
                checkboxLinkage: true,
                defaultAttrs: {
                    checkbox: {
                        show: true,
                        state: 'unchecked',
                        disable: false
                    }
                }
            }
        })
        await wrapper.vm.$nextTick()

        let node1 = wrapper.vm.getById(1)
        expect(node1.checkbox.show).toBeTruthy()
        expect(node1.checkbox.state).toMatch('undetermined')
        expect(node1.checkbox.disable).toBeFalsy()

        let node2 = wrapper.vm.getById(2)
        expect(node2.checkbox.show).toBeTruthy()
        expect(node2.checkbox.state).toMatch('unchecked')
        expect(node2.checkbox.disable).toBeFalsy()

        let node3 = wrapper.vm.getById(3)
        expect(node3.checkbox.show).toBeTruthy()
        expect(node3.checkbox.state).toMatch('undetermined')
        expect(node3.checkbox.disable).toBeFalsy()

        let node4 = wrapper.vm.getById(4)
        expect(node4.checkbox.show).toBeFalsy()

        let node5 = wrapper.vm.getById(5)
        expect(node5.checkbox.show).toBeTruthy()
        expect(node5.checkbox.state).toMatch('unchecked')
        expect(node5.checkbox.disable).toBeTruthy()

        let node6 = wrapper.vm.getById(6)
        expect(node6.checkbox.show).toBeTruthy()
        expect(node6.checkbox.state).toMatch('checked')
        expect(node6.checkbox.disable).toBeFalsy()
    })

    it('methods: getChecked, getUnchecked, getUndetermined', async ()=>{
        let wrapper = mount(TWTree, {
            propsData: {
                tree: checkboxTree,
                checkboxLinkage: true,
                defaultAttrs: {
                    checkbox: {
                        show: true,
                        state: 'unchecked',
                        disable: false
                    }
                }
            }
        })
        await wrapper.vm.$nextTick()

        let checked = wrapper.vm.getChecked()
        expect(checked.length).toBe(1)
        expect(checked[0]).toBe(wrapper.vm.getById(6))

        let unchecked = wrapper.vm.getUnchecked()
        expect(unchecked.length).toBe(4)
        expect(unchecked).toContain(wrapper.vm.getById(2))
        expect(unchecked).toContain(wrapper.vm.getById(5))
        expect(unchecked).toContain(wrapper.vm.getById(7))
        expect(unchecked).toContain(wrapper.vm.getById(8))

        let undetermined = wrapper.vm.getUndetermined()
        expect(undetermined.length).toBe(2)
        expect(undetermined).toContain(wrapper.vm.getById(1))
        expect(undetermined).toContain(wrapper.vm.getById(3))
    })

    it('methods: check, uncheck (check/uncheck a disabled node)', async ()=>{
        let wrapper = mount(TWTree, {
            propsData: {
                tree: checkboxTree,
                checkboxLinkage: true,
                defaultAttrs: {
                    checkbox: {
                        show: true,
                        state: 'unchecked',
                        disable: false
                    }
                }
            }
        })
        await wrapper.vm.$nextTick()

        let node5 = wrapper.vm.getById(5)
        wrapper.vm.check(node5)
        expect(node5.checkbox.state).toMatch('unchecked')

        wrapper.vm.setCheckboxState(node5, 'checked')
        wrapper.vm.uncheck(node5)
        expect(node5.checkbox.state).toMatch('checked')
    })

    it('methods: check, uncheck (check/uncheck a leaf node)', async ()=>{
        let wrapper = mount(TWTree, {
            propsData: {
                tree: checkboxTree,
                checkboxLinkage: true,
                defaultAttrs: {
                    checkbox: {
                        show: true,
                        state: 'unchecked',
                        disable: false
                    }
                }
            }
        })
        await wrapper.vm.$nextTick()

        let node6 = wrapper.vm.getById(6)
        wrapper.vm.uncheck(node6)
        expect(node6.__.parent.checkbox.state).toMatch('unchecked')
        expect(node6.__.parent.__.parent.checkbox.state).toMatch('unchecked')

        wrapper.vm.check(node6)
        expect(node6.__.parent.checkbox.state).toMatch('undetermined')
        expect(node6.__.parent.__.parent.checkbox.state).toMatch('undetermined')
    })

    it('methods: check, uncheck (check/uncheck the root node, no disabled checkbox)', async ()=>{
        let wrapper = mount(TWTree, {
            propsData: {
                tree: checkboxTree,
                checkboxLinkage: true,
                defaultAttrs: {
                    checkbox: {
                        show: true,
                        state: 'unchecked',
                        disable: false
                    }
                }
            }
        })
        await wrapper.vm.$nextTick()
        wrapper.vm.setAttr(wrapper.vm.getById(5), 'checkbox', 'disable', false)

        wrapper.vm.uncheck(wrapper.vm.getById(6))
        for (let i=0; i<8; i++) {
            let item = wrapper.vm.items[i]
            if (item.checkbox.show === true) {
                expect(item.checkbox.state).toMatch('unchecked')
            }
        }

        let root = wrapper.vm.getById(1)
        wrapper.vm.check(root)
        for (let i=0; i<8; i++) {
            let item = wrapper.vm.items[i]
            if (item.checkbox.show === true && item.checkbox.disable === false) {
                expect(item.checkbox.state).toMatch('checked')
            }
        }

        wrapper.vm.uncheck(root)
        for (let i=0; i<8; i++) {
            let item = wrapper.vm.items[i]
            if (item.checkbox.show === true && item.checkbox.disable === false) {
                expect(item.checkbox.state).toMatch('unchecked')
            }
        }
    })
})

describe('directory', ()=>{
    let directoryTree = [
        {
            id: 1,
            title: 'ROOT',
            hasChild: true,
            children: [
                {
                    id: 2,
                    title: 'child 1'
                },
                {
                    id: 3,
                    title: 'child 2',
                    directoryState: 'collapsed',
                    hasChild: true,
                    children: [
                        {
                            id: 4,
                            title: 'child 2-1'
                        },
                        {
                            id: 5,
                            title: 'child 2-2'
                        },
                        {
                            id: 6,
                            title: 'child 2-3'
                        }
                    ]
                },
                {
                    id: 7,
                    title: 'child 3'
                },
                {
                    id: 8,
                    title: 'child 4'
                }
            ]
        }
    ]

    it('data: items', async ()=>{
        let wrapper = mount(TWTree, {
            propsData: {
                tree: directoryTree,
            }
        })
        await wrapper.vm.$nextTick()

        expect(wrapper.vm.getById(1).directoryState).toMatch('expanded')
        expect(wrapper.vm.getById(3).directoryState).toMatch('collapsed')

        expect(wrapper.vm.getById(1).__.isVisible).toBeTruthy()
        expect(wrapper.vm.getById(2).__.isVisible).toBeTruthy()
        expect(wrapper.vm.getById(3).__.isVisible).toBeTruthy()
        expect(wrapper.vm.getById(4).__.isVisible).toBeFalsy()
        expect(wrapper.vm.getById(5).__.isVisible).toBeFalsy()
        expect(wrapper.vm.getById(6).__.isVisible).toBeFalsy()
        expect(wrapper.vm.getById(7).__.isVisible).toBeTruthy()
        expect(wrapper.vm.getById(8).__.isVisible).toBeTruthy()
    })

    it('method: expand', async ()=>{
        let wrapper = mount(TWTree, {
            propsData: {
                tree: directoryTree,
            }
        })
        await wrapper.vm.$nextTick()

        wrapper.vm.expand(wrapper.vm.getById(3))
        expect(wrapper.vm.getById(3).directoryState).toMatch('expanded')
        for (let item of wrapper.vm.items) {
            expect(item.__.isVisible).toBeTruthy()
        }
    })

    it('method: collapse', async ()=>{
        let wrapper = mount(TWTree, {
            propsData: {
                tree: directoryTree,
            }
        })
        await wrapper.vm.$nextTick()

        wrapper.vm.collapse(wrapper.vm.getById(1))
        expect(wrapper.vm.getById(1).directoryState).toMatch('collapsed')
        for (let item of wrapper.vm.items) {
            if (item.id === 1) {
                expect(item.__.isVisible).toBeTruthy()
            } else {
                expect(item.__.isVisible).toBeFalsy()
            }
        }
    })
})