import type { NodeComponent } from '@vue-flow/core'
import { Handle } from '@vue-flow/core'
import { defineComponent, h, markRaw } from 'vue'

const CustomNode: NodeComponent = defineComponent(() => {
  return () =>
    h('div', { class: 'vue-flow__node-default' }, [
      h(Handle as any, { id: 'handle-1', position: 'left', type: 'target', style: { top: '5px' } }),
      h(Handle as any, { id: 'handle-2', position: 'left', type: 'target', style: { bottom: '-10px' } }),
      'Custom Node',
      h(Handle as any, { id: 'handle-3', position: 'right' }),
    ])
})

describe('Check if custom nodes are rendered', () => {
  beforeEach(() => {
    cy.vueFlow({
      fitViewOnInit: false,
      modelValue: [
        {
          id: '1',
          label: 'Node 1',
          position: { x: 0, y: 0 },
        },
        {
          id: '2',
          type: 'custom',
          label: 'Node 2',
          position: { x: 300, y: 300 },
        },
      ],
      nodeTypes: {
        custom: markRaw(CustomNode),
      },
      autoConnect: true,
    })
  })

  it('renders custom node', () => {
    cy.get('.vue-flow__node-custom').should('have.length', 1)
  })
})
