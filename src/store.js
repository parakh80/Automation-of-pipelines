// store.js

import { create } from "zustand";
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
} from "reactflow";

export const useStore = create((set, get) => ({
  nodes: [],
  edges: [],
  connectedHandles: {}, // New state to track connected handles

  getNodeID: (type) => {
    const newIDs = { ...get().nodeIDs };
    if (newIDs[type] === undefined) {
      newIDs[type] = 0;
    }
    newIDs[type] += 1;
    set({ nodeIDs: newIDs });
    return `${type}-${newIDs[type]}`;
  },

  addNode: (node) => {
    set({
      nodes: [...get().nodes, node],
    });
  },

  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },

  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });

    // Update connectedHandles when edges change
    const currentEdges = applyEdgeChanges(changes, get().edges);
    const connectedHandles = {};

    currentEdges.forEach((edge) => {
      if (edge.sourceHandle) {
        connectedHandles[edge.sourceHandle] = true;
      }
      if (edge.targetHandle) {
        connectedHandles[edge.targetHandle] = true;
      }
    });

    set({ connectedHandles });
  },

  onConnect: (connection) => {
    const newEdge = {
      ...connection,
      type: "smoothstep",
      animated: true,
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: '#007BFF',
        width: 20,
        height: 20,
      },
      style: {
        stroke: '#007BFF',
        strokeWidth: 2,
      },
    };
    const updatedEdges = addEdge(newEdge, get().edges);

    // Update connectedHandles
    const connectedHandles = { ...get().connectedHandles };
    if (connection.sourceHandle) {
      connectedHandles[connection.sourceHandle] = true;
    }
    if (connection.targetHandle) {
      connectedHandles[connection.targetHandle] = true;
    }

    set({
      edges: updatedEdges,
      connectedHandles,
    });
  },

  updateNodeField: (nodeId, fieldName, fieldValue) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          node.data = { ...node.data, [fieldName]: fieldValue };
        }
        return node;
      }),
    });
  },
}));  