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

type TaskNodeData = {
  label: string;
  onDelete: (id: string) => void;
};

function TaskNode({ id, data }: NodeProps<Node<TaskNodeData>>) {
  return (
    <div className="min-w-45 rounded-2xl border border-slate-200 bg-white shadow-lg overflow-hidden">
      <Handle type="target" position={Position.Left} />

      <div className="flex items-center justify-between gap-3 bg-slate-900 px-4 py-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-300">
          Task
        </span>

        <button
          onClick={() => data.onDelete(id)}
          className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-sm font-bold text-white hover:bg-red-600"
        >
          ×
        </button>
      </div>

      <div className="px-4 py-4">
        <p className="text-sm font-semibold text-slate-800">{data.label}</p>
        <p className="mt-1 text-xs text-slate-500">Workflow step</p>
      </div>

      <Handle type="source" position={Position.Right} />
    </div>
  );
}

const initialNodes: Node<TaskNodeData>[] = [
  {
    id: 'start',
    type: 'task',
    position: { x: 0, y: 0 },
    data: {
      label: 'Start',
      onDelete: () => {},
    },
  },
  {
    id: 'task-1',
    type: 'task',
    position: { x: 280, y: -80 },
    data: {
      label: 'Design UI',
      onDelete: () => {},
    },
  },
  {
    id: 'task-2',
    type: 'task',
    position: { x: 280, y: 120 },
    data: {
      label: 'Build API',
      onDelete: () => {},
    },
  },
  {
    id: 'end',
    type: 'task',
    position: { x: 580, y: 20 },
    data: {
      label: 'Finish',
      onDelete: () => {},
    },
  },
];

const initialEdges: Edge[] = [
  {
    id: 'start-task-1',
    source: 'start',
    target: 'task-1',
    animated: true,
  },
  {
    id: 'start-task-2',
    source: 'start',
    target: 'task-2',
    animated: true,
  },
];

export default function Three() {
  const [nodeName, setNodeName] = useState('');
  const [nodes, setNodes] = useState<Node<TaskNodeData>[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [count, setCount] = useState(1);

  const deleteNode = useCallback((nodeId: string) => {
    setNodes((prev) => prev.filter((node) => node.id !== nodeId));

    setEdges((prev) =>
      prev.filter((edge) => edge.source !== nodeId && edge.target !== nodeId)
    );
  }, []);

  const nodeTypes = useMemo(
    () => ({
      task: TaskNode,
    }),
    []
  );

  const visibleNodes = useMemo(() => {
    return nodes.map((node) => ({
      ...node,
      data: {
        ...node.data,
        onDelete: deleteNode,
      },
    }));
  }, [nodes, deleteNode]);

  const onNodesChange = useCallback((changes: NodeChange[]) => {
    setNodes((nodesSnapshot) =>
      applyNodeChanges(changes, nodesSnapshot) as Node<TaskNodeData>[]
    );
  }, []);

  const onEdgesChange = useCallback((changes: EdgeChange[]) => {
    setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot));
  }, []);

  const onConnect = useCallback((params: Connection) => {
    setEdges((edgesSnapshot) =>
      addEdge(
        {
          ...params,
          animated: true,
          style: {
            strokeWidth: 2,
          },
        },
        edgesSnapshot
      )
    );
  }, []);

  const addNewNode = () => {
    const cleanName = nodeName.trim();

    if (!cleanName) return;

    const id = `new-${count}`;

    const newNode: Node<TaskNodeData> = {
      id,
      type: 'task',
      position: {
        x: Math.random() * 500,
        y: Math.random() * 350,
      },
      data: {
        label: cleanName,
        onDelete: deleteNode,
      },
    };

    setNodes((prev) => [...prev, newNode]);
    setCount((prev) => prev + 1);
    setNodeName('');
  };

  return (
    <div className="h-screen w-screen bg-slate-100">
      <div className="absolute left-1/2 top-6 z-20 w-[92%] max-w-3xl -translate-x-1/2 rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-xl backdrop-blur">
        <div className="mb-3">
          <h1 className="text-lg font-bold text-slate-900">
            Workflow Builder
          </h1>
          <p className="text-sm text-slate-500">
            Add, connect, move, and delete workflow steps.
          </p>
        </div>

        <div className="flex gap-3">
          <input
            className="h-11 flex-1 rounded-xl border border-slate-300 bg-white px-4 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            value={nodeName}
            onChange={(event) => setNodeName(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') addNewNode();
            }}
            placeholder="Example: Review Design"
          />

          <button
            onClick={addNewNode}
            className="rounded-xl bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-md hover:bg-blue-700 active:scale-95"
          >
            Add Node
          </button>
        </div>
      </div>

      <ReactFlow
        nodes={visibleNodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        defaultEdgeOptions={{
          animated: true,
          style: {
            strokeWidth: 2,
          },
        }}
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}