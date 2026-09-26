import React from 'react';
import { Renderer } from 'core/renderers';
import styles from './LinkedListRenderer.module.scss';
import { classes } from 'common/util';

class LinkedListRenderer extends Renderer {
  constructor(props) {
    super(props);
    this.containerRef = React.createRef();
    this.nodeRefs = {};
  }

  getPointerBadgeClass(name) {
    if (name.includes('dau') || name.includes('head')) return styles.badge_dau;
    if (name.includes('cuoi') || name.includes('tail')) return styles.badge_cuoi;
    if (name.includes('p')) return styles.badge_p;
    if (name.includes('q')) return styles.badge_q;
    return styles.badge_p;
  }

  renderSvgLinks() {
    const { nodes = [], isDoubly = false, bypass, prevBypass } = this.props.data;
    if (!nodes.length) return null;

    const nodeWidth = 108;
    const gap = 36;
    const totalNodeSlot = nodeWidth + gap;
    const startX = 20;
    const centerY = 50 + 38 / 2 + 38 + 6; // pointer height (38) + margin (6) + padding top (50) + half node body (19)

    const lines = [];

    // Render direct links between consecutive non-detached nodes
    for (let i = 0; i < nodes.length - 1; i++) {
      const curr = nodes[i];
      const next = nodes[i + 1];
      if (curr.detached || next.detached || curr.fadingOut || next.fadingOut) continue;

      const x1 = startX + i * totalNodeSlot + nodeWidth - 6;
      const x2 = startX + (i + 1) * totalNodeSlot + 4;

      if (isDoubly) {
        // Parallel 2-directional arrows for Doubly Linked List:
        // 1. Top arrow (sau): points from curr to next ->
        // 2. Bottom arrow (truoc): points from next to curr <-
        lines.push(
          <g key={`doubly_link_${curr.id}_${next.id}`}>
            <line
              x1={x1}
              y1={centerY - 5}
              x2={x2}
              y2={centerY - 5}
              stroke="#58a6ff"
              strokeWidth="2"
              markerEnd="url(#arrow_head)"
            />
            <line
              x1={x2}
              y1={centerY + 5}
              x2={x1}
              y2={centerY + 5}
              stroke="#58a6ff"
              strokeWidth="2"
              markerEnd="url(#arrow_head)"
            />
          </g>
        );
      } else {
        // Single directional arrow for Singly Linked List ->
        lines.push(
          <g key={`singly_link_${curr.id}_${next.id}`}>
            <line
              x1={x1}
              y1={centerY}
              x2={x2}
              y2={centerY}
              stroke="#58a6ff"
              strokeWidth="2"
              markerEnd="url(#arrow_head)"
            />
          </g>
        );
      }
    }

    // Render bypass curves (e.g. p->sau = q->sau)
    if (bypass && bypass.fromId && bypass.toId) {
      const fromIdx = nodes.findIndex(n => n.id === bypass.fromId);
      const toIdx = nodes.findIndex(n => n.id === bypass.toId);
      if (fromIdx !== -1 && toIdx !== -1) {
        const x1 = startX + fromIdx * totalNodeSlot + nodeWidth - 10;
        const y1 = centerY - 16;
        const x2 = startX + toIdx * totalNodeSlot + 10;
        const y2 = centerY - 16;
        const midX = (x1 + x2) / 2;
        const archY = y1 - 42;

        const pathD = `M ${x1} ${y1} Q ${midX} ${archY} ${x2} ${y2}`;

        lines.push(
          <g key="bypass_link">
            <path
              d={pathD}
              fill="none"
              stroke="#d29922"
              strokeWidth="2.5"
              strokeDasharray="6 3"
              markerEnd="url(#arrow_head_bypass)"
            />
            {bypass.label && (
              <text x={midX} y={archY - 6} fill="#d29922" fontSize="11" fontFamily="JetBrains Mono, monospace" fontWeight="700" textAnchor="middle">
                {bypass.label}
              </text>
            )}
          </g>
        );
      }
    }

    // Render backward bypass curves for doubly linked list
    if (prevBypass && prevBypass.fromId && prevBypass.toId) {
      const fromIdx = nodes.findIndex(n => n.id === prevBypass.fromId);
      const toIdx = nodes.findIndex(n => n.id === prevBypass.toId);
      if (fromIdx !== -1 && toIdx !== -1) {
        const x1 = startX + fromIdx * totalNodeSlot + 10;
        const y1 = centerY + 18;
        const x2 = startX + toIdx * totalNodeSlot + nodeWidth - 10;
        const y2 = centerY + 18;
        const midX = (x1 + x2) / 2;
        const archY = y1 + 42;

        const pathD = `M ${x1} ${y1} Q ${midX} ${archY} ${x2} ${y2}`;

        lines.push(
          <g key="prev_bypass_link">
            <path
              d={pathD}
              fill="none"
              stroke="#388bfd"
              strokeWidth="2.5"
              strokeDasharray="6 3"
              markerEnd="url(#arrow_head_prev_bypass)"
            />
            {prevBypass.label && (
              <text x={midX} y={archY + 14} fill="#58a6ff" fontSize="11" fontFamily="JetBrains Mono, monospace" fontWeight="700" textAnchor="middle">
                {prevBypass.label}
              </text>
            )}
          </g>
        );
      }
    }

    return (
      <svg className={styles.svg_layer}>
        <defs>
          <marker id="arrow_head" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M 0 0 L 6 3 L 0 6 z" fill="#58a6ff" />
          </marker>
          <marker id="arrow_head_bypass" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M 0 0 L 6 3 L 0 6 z" fill="#d29922" />
          </marker>
          <marker id="arrow_head_prev_bypass" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M 0 0 L 6 3 L 0 6 z" fill="#388bfd" />
          </marker>
        </defs>
        {lines}
      </svg>
    );
  }

  renderData() {
    const { nodes = [], isDoubly = false, pointers = {} } = this.props.data;

    // Group pointers by node ID
    const pointersByNode = {};
    Object.keys(pointers).forEach(pName => {
      const targetId = pointers[pName];
      if (targetId !== undefined && targetId !== null) {
        if (!pointersByNode[targetId]) pointersByNode[targetId] = [];
        pointersByNode[targetId].push(pName);
      }
    });

    return (
      <div className={styles.linked_list_container} ref={this.containerRef}>
        <div className={styles.stage_wrapper}>
          {this.renderSvgLinks()}
          <div className={styles.nodes_row}>
            {nodes.map((node, index) => {
              const nodePointers = pointersByNode[node.id] || [];
              const isDetached = node.detached;
              const isFading = node.fadingOut;
              const nextNode = nodes[index + 1];

              let cardStateClass = '';
              if (node.state === 'focus') cardStateClass = styles.focus;
              else if (node.state === 'target') cardStateClass = styles.target;
              else if (node.state === 'isolated' || isDetached) cardStateClass = styles.isolated;

              return (
                <div
                  key={node.id}
                  className={classes(
                    styles.node_wrapper,
                    isDetached && styles.detached,
                    isFading && styles.fading_out
                  )}
                >
                  <div className={styles.pointer_top}>
                    {nodePointers.length > 0 && (
                      <>
                        <div className={styles.pointer_badge_group}>
                          {nodePointers.map(pName => (
                            <span
                              key={pName}
                              className={classes(styles.pointer_badge, this.getPointerBadgeClass(pName))}
                            >
                              {pName}
                            </span>
                          ))}
                        </div>
                        <div className={styles.pointer_arrow} />
                      </>
                    )}
                  </div>

                  <div className={classes(styles.node_card, cardStateClass)}>
                    <div className={styles.node_header}>
                      <span>#{node.id}</span>
                      <span>{node.addr || `0x${(1000 + node.id * 16).toString(16).toUpperCase()}`}</span>
                    </div>
                    <div className={styles.node_body}>
                      {isDoubly && (
                        <div className={styles.cell_prev}>
                          <span>{index === 0 ? 'NULL' : '◄'}</span>
                        </div>
                      )}
                      <div className={styles.cell_data}>{node.val}</div>
                      <div className={styles.cell_ptr}>
                        <span>{nextNode ? '►' : 'NULL'}</span>
                      </div>
                    </div>
                  </div>

                  <div className={styles.node_address}>
                    <span>nut *p_{node.id}</span>
                  </div>
                </div>
              );
            })}
            <div className={styles.null_terminator}>
              <span>NULL</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LinkedListRenderer;
