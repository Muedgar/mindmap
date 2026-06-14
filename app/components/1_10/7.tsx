'use client'

import { addEdge, applyEdgeChanges, applyNodeChanges, Background, Connection, Edge, EdgeChange, Node, NodeChange, ReactFlow } from "@xyflow/react"
import { useCallback, useState } from "react"

const initialNodes: Node[] = [
    {
        id: 'n-1',
        position: { x: 200, y: 300 },
        data: { label: 'Start' }
    },
    {
        id: 'n-2',
        position: { x: 200, y: 300 },
        data: { label: 'Node 1' }
    },
    {
        id: 'n-3',
        position: { x: 200, y: 300 },
        data: { label: 'Node 2' }
    },
    {
        id: 'n-4',
        position: { x: 200, y: 300 },
        data: { label: 'Finish' }
    }
]

const initialEdges: Edge[] = [
    {
        id: 'e-1',
        source: 'n-1',
        target: 'n-2'
    },
    {
        id: 'e-2',
        source: 'n-1',
        target: 'n-3'
    }
]

export default function Seven() {
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges)

    const handleNodeChange = useCallback((changes: NodeChange[]) => {
        setNodes(snapshot => applyNodeChanges(changes, snapshot))    
    },[]);

    const handleEdgeChange = useCallback((changes: EdgeChange[]) => {
        setEdges(snapshot => applyEdgeChanges(changes, snapshot))
    }, [])

    const handleConnection = useCallback((connection: Connection) => {
        setEdges(snapshot => addEdge(connection, snapshot))
    }, [])

    return (
        <div className="w-screen h-screen">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={handleNodeChange}
                onEdgesChange={handleEdgeChange}
                onConnect={handleConnection}
            >
                <Background />
            </ReactFlow>
        </div>
    )
}

