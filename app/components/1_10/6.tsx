'use client'

import { addEdge, applyEdgeChanges, applyNodeChanges, Connection, Edge, EdgeChange, Node, NodeChange, ReactFlow } from "@xyflow/react"
import { useCallback, useState } from "react"


const initialNodes: Node[] = [
    {
        id: 'n-1',
        position: { x: 100, y: 100 },
        data: { label: 'Start' }
    },
    {
        id: 'n-2',
        position: { x: 150, y: 150 },
        data: { label: 'Node A' } 
    },
    {
        id: 'n-3',
        position: { x: 200, y: 200 },
        data: { label: 'Node B' }
    },
    {
        id: 'n-4',
        position: { x: 240, y: 240 },
        data: { label: 'Finish' }
    }
]

const initialEdges: Edge[] = [
    { id: 'e-1', source: 'n-1', target: 'n-2' },
    { id: 'e-2', source: 'n-1', target: 'n-3' }
]

export default function Six() {
    const [nodes, setNodes] = useState<Node[]>(initialNodes);
    const [edges, setEdges] = useState<Edge[]>(initialEdges);

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
        <div className="w-screen h-screen">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onConnect={handleConnection}
                onNodesChange={handleNodeChange}
                onEdgesChange={handleEdgeChange}
            >
                
            </ReactFlow>
        </div>
    )
}