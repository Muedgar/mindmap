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

    const initialNodes:Node[] = [
        {
            id: 'n-1',
            position: { x: 150, y: 100 },
            data: { label: 'Start' }
        },
        {
            id: 'n-2',
            position: { x: 180, y: 200 },
            data: { label: 'Task 1' }
        },
        {
            id: 'n-3',
            position: { x: 200, y: 300 },
            data: { label: 'Task 2' }
        },
        {
            id: 'n-4',
            position: { x: 250, y: 400 },
            data: { label: 'Finish' }
        }
    ];

    const initialEdges:Edge[] = [{ id: 'e-1', source: 'n-1', target: 'n-2' }, { id: 'e-2', source: 'n-1', target: 'n-3' }];

export default function Four() {


    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);

    
    const handleNodeChange = useCallback((changes: NodeChange[]) => {
        setNodes(prev => applyNodeChanges(changes, prev))
    }, [])

    const handleEdgeChange = useCallback((changes: EdgeChange[]) => {
        setEdges(prev => applyEdgeChanges(changes, prev))
    }, [])

    const handleConnection = useCallback((connection: Connection) => {
            setEdges(prev => addEdge(connection, prev))
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