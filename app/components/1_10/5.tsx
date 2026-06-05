'use client';

import { useCallback, useMemo, useState } from 'react';
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Background,
  Controls,
  MiniMap,
  Handle,
  Position,
  type Node,
  type Edge,
  type Connection,
  type NodeChange,
  type EdgeChange,
  type NodeProps,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

const initialNodes: Node[] = [
    {
        id: 'n-1',
        position: { x: 150, y: 150 },
        data: { label: 'Start' }
    },
    {
        id: 'n-2',
        position: { x: 200, y: 200 },
        data: { label: 'Task 1' }
    },
    {
        id: 'n-3',
        position: { x: 300, y: 300 },
        data: { label: 'Task 2' }
    },
    {
        id: 'n-4',
        position: { x: 400, y: 200 },
        data: { label: 'Finish' }
    }
];

const initialEdges: Edge[] = [
    { id: 'e-1', source: 'n-1', target: 'n-2' },
    { id: 'e-2', source: 'n-1', target: 'n-3' }
];

export default function Five() {
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);

    const handleNodeChange = useCallback((changes: NodeChange[]) => {
        setNodes((nodeSnapshot) => applyNodeChanges(changes, nodeSnapshot))
    }, [])

    const handleEdgeChange = useCallback((changes: EdgeChange[]) => {
        setEdges((edgeSnapshot) => applyEdgeChanges(changes, edgeSnapshot))
    }, [])

    const handleConnection = useCallback((connection: Connection) => {
        setEdges((edgeSnapshot) => addEdge(connection, edgeSnapshot))
    }, [])


    return (
        <div className='w-screen h-screen'>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={handleNodeChange}
                onEdgesChange={handleEdgeChange}
                onConnect={handleConnection}
            >
                <Background />
                <Controls />
                <MiniMap />
            </ReactFlow>
        </div>
    )

}