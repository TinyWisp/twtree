import Vue from 'vue'
import VueRouter from 'vue-router'

import AsyncExample from '../views/AsyncExample.vue'
import EditExample from '../views/EditExample.vue'
import ButtonExample from '../views/ButtonExample.vue'
import ContextMenuExample from '../views/ContextMenuExample.vue'
import SearchExample from '../views/SearchExample.vue'
import MultiSelectExample from '../views/MultiSelectExample.vue'
import RadioButtonExample from '../views/RadioButtonExample.vue'
import SortExample from '../views/SortExample.vue'
import ReloadExample from '../views/ReloadExample.vue'

import GettingStartedDisplayATreeExample from '../views/GettingStartedDisplayATreeExample.vue'
import GettingStartedBasicOperationsExample from '../views/GettingStartedBasicOperationsExample.vue'
import GettingStartedSetPropsExample from '../views/GettingStartedSetPropsExample.vue'

import DragAndDropBasicExample from '../views/DragAndDropBasicExample.vue'
import DragAndDropAdvancedExample from '../views/DragAndDropAdvancedExample.vue'
import DragAndDropDisableExample from '../views/DragAndDropDisableExample.vue'
import DragAndDropCustomAppearanceExample from '../views/DragAndDropCustomAppearanceExample.vue'

import CheckboxWithLinkageExample from '../views/CheckboxWithLinkageExample.vue'
import CheckboxWithoutLinkageExample from '../views/CheckboxWithoutLinkageExample.vue'
import CheckboxCustomAppearanceExample from '../views/CheckboxCustomAppearanceExample.vue'

import RootNodeNoRootNodeExample from '../views/RootNodeNoRootNodeExample.vue'
import RootNodeNoSwitcherExample from '../views/RootNodeNoSwitcherExample.vue'
import RootNodeCheckingExample from '../views/RootNodeCheckingExample.vue'
import RootNodeCustomAppearanceExample from '../views/RootNodeCustomAppearanceExample.vue'

import CustomAppearanceSizeExample from '../views/CustomAppearanceSizeExample.vue'
import CustomAppearanceIconExample from '../views/CustomAppearanceIconExample.vue'
import CustomAppearanceNoIconsExample from '../views/CustomAppearanceNoIconsExample.vue'
import CustomAppearanceNoDirectoryTogglesExample from '../views/CustomAppearanceNoDirectoryTogglesExample.vue'
import CustomAppearanceBackgroundColorExample from '../views/CustomAppearanceBackgroundColorExample.vue'
import CustomAppearanceStripesExample from '../views/CustomAppearanceStripesExample.vue'
import CustomAppearanceDisableAnimationsExample from '../views/CustomAppearanceDisableAnimationsExample.vue'
import CustomAppearanceExtraContentExample from '../views/CustomAppearanceExtraContentExample.vue'
import CustomAppearanceLimitTitleWidthExample from '../views/CustomAppearanceLimitTitleWidthExample.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/example/getting-started/display-a-tree',
  },
  {
    path: '/example/async',
    name: 'async-example',
    component: AsyncExample
  },
  {
    path: '/example/edit',
    name: 'edit-example',
    component: EditExample
  },
  {
    path: '/example/button',
    name: 'button-example',
    component: ButtonExample
  },
  {
    path: '/example/contextmenu',
    name: 'contextmenu-example',
    component: ContextMenuExample
  },

  {
    path: '/example/search',
    name: 'search-example',
    component: SearchExample
  },
  {
    path: '/example/multi-select',
    name: 'multi-select-example',
    component: MultiSelectExample
  },
  {
    path: '/example/radio-button',
    name: 'radio-button-example',
    component: RadioButtonExample
  },
  {
    path: '/example/sort',
    name: 'sort-example',
    component: SortExample
  },
  {
    path: '/example/reload',
    name: 'reload-example',
    component: ReloadExample
  },

  {
    path: '/example/getting-started/display-a-tree',
    name: 'getting-started-display-a-tree-example',
    component: GettingStartedDisplayATreeExample
  },
  {
    path: '/example/getting-started/basic-operations',
    name: 'getting-started-basic-operations-example',
    component: GettingStartedBasicOperationsExample
  },
  {
    path: '/example/getting-started/set-props',
    name: 'getting-started-set-props-example',
    component: GettingStartedSetPropsExample
  },

  {
    path: '/example/checkbox/with-linkage',
    name: 'checkbox-with-linkage-example',
    component: CheckboxWithLinkageExample
  },
  {
    path: '/example/checkbox/without-linkage',
    name: 'checkbox-without-linkage-example',
    component: CheckboxWithoutLinkageExample
  },
  {
    path: '/example/checkbox/custom-appearance',
    name: 'checkbox-custom-appearance-example',
    component: CheckboxCustomAppearanceExample
  },

  {
    path: '/example/drag-and-drop/basic',
    name: 'drag-and-drop-basic-example',
    component: DragAndDropBasicExample
  },
  {
    path: '/example/drag-and-drop/advanced',
    name: 'drag-and-drop-advanced-example',
    component: DragAndDropAdvancedExample
  },
  {
    path: '/example/drag-and-drop/disable',
    name: 'drag-and-drop-disable-example',
    component: DragAndDropDisableExample
  },
  {
    path: '/example/drag-and-drop/custom-appearance',
    name: 'drag-and-drop-custom-appearance-example',
    component: DragAndDropCustomAppearanceExample
  },

  {
    path: '/example/root-node/no-root-node',
    name: 'root-node-no-root-node-example',
    component: RootNodeNoRootNodeExample
  },
  {
    path: '/example/root-node/no-switcher',
    name: 'root-node-no-switcher-example',
    component: RootNodeNoSwitcherExample
  },
  {
    path: '/example/root-node/checking',
    name: 'root-node-checking-example',
    component: RootNodeCheckingExample
  },
  {
    path: '/example/root-node/custom-appearance',
    name: 'root-node-custom-appearance-example',
    component: RootNodeCustomAppearanceExample
  },

  {
    path: '/example/custom-appearance/size',
    name: 'custom-appearance-size-example',
    component: CustomAppearanceSizeExample
  },
  {
    path: '/example/custom-appearance/icon',
    name: 'custom-appearance-icon-example',
    component: CustomAppearanceIconExample
  },
  {
    path: '/example/custom-appearance/no-icons',
    name: 'custom-appearance-no-icons-example',
    component: CustomAppearanceNoIconsExample
  },
  {
    path: '/example/custom-appearance/no-directory-toggles',
    name: 'custom-appearance-no-directory-toggles-example',
    component: CustomAppearanceNoDirectoryTogglesExample
  },
  {
    path: '/example/custom-appearance/background-color',
    name: 'custom-appearance-background-color-example',
    component: CustomAppearanceBackgroundColorExample
  },
  {
    path: '/example/custom-appearance/stripes',
    name: 'custom-appearance-stripes-example',
    component: CustomAppearanceStripesExample
  },
  {
    path: '/example/custom-appearance/disable-animations',
    name: 'custom-appearance-disable-animations-example',
    component: CustomAppearanceDisableAnimationsExample
  },
  {
    path: '/example/custom-appearance/extra-content',
    name: 'custom-appearance-extra-content-example',
    component: CustomAppearanceExtraContentExample
  },
  {
    path: '/example/custom-appearance/limit-title-width',
    name: 'custom-appearance-limit-title-width-example',
    component: CustomAppearanceLimitTitleWidthExample
  }
]

const router = new VueRouter({
  routes
})

export default router
