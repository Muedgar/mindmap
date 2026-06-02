'use client';

import { useCallback, useState } from 'react';
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Background,
  Controls,
  MiniMap,
  type Node,
  type Edge,
  type Connection,
  type NodeChange,
  type EdgeChange,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

const initialNodes: Node[] = [
  {
    id: 'start',
    position: { x: 0, y: 0 },
    data: { label: 'Start' },
    style: {
      background: '#22c55e',
      color: 'white',
      borderRadius: 12,
      padding: 12,
    },
  },
  {
    id: 'task-1',
    position: { x: 250, y: 0 },
    data: { label: 'Design UI' },
  },
  {
    id: 'task-2',
    position: { x: 250, y: 150 },
    data: { label: 'Build API' },
  },
  {
    id: 'end',
    position: { x: 500, y: 75 },
    data: { label: 'Finish' },
    style: {
      background: '#ef4444',
      color: 'white',
      borderRadius: 12,
      padding: 12,
    },
  },
];

const initialEdges: Edge[] = [
  { id: 'start-task-1', source: 'start', target: 'task-1' },
  { id: 'start-task-2', source: 'start', target: 'task-2' },
];

export default function Home() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  const [count, setCount] = useState(1);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      setNodes((nodesSnapshot) =>
        applyNodeChanges(changes, nodesSnapshot)
      );
    },
    []
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      setEdges((edgesSnapshot) =>
        applyEdgeChanges(changes, edgesSnapshot)
      );
    },
    []
  );

  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((edgesSnapshot) =>
        addEdge(
          {
            ...params,
            animated: true,
          },
          edgesSnapshot
        )
      );
    },
    []
  );

  const addNewNode = () => {
    const id = `new-${count}`;

    const newNode: Node = {
      id,
      position: {
        x: Math.random() * 400,
        y: Math.random() * 300,
      },
      data: {
        label: `New Node ${count}`,
      },
      style: {
        border: '2px solid #2563eb',
        borderRadius: 12,
        padding: 12,
      },
    };

    setNodes((prev) => [...prev, newNode]);
    setCount((prev) => prev + 1);
  };

  return (
    <div className="w-screen h-screen relative">
      <button
        onClick={addNewNode}
        className="absolute top-4 left-4 z-10 bg-blue-600 text-white px-4 py-2 rounded-lg shadow"
      >
        Add Node
      </button>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}