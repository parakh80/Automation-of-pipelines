// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
        <div style={{ padding: '10px' }}>
            <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
                <DraggableNode type='file' label='File' />
                <DraggableNode type='logic' label='Logic' />
                <DraggableNode type='math' label='Math' />
                <DraggableNode type='timer' label='Timer' />
                <DraggableNode type='color' label='Color' />
            </div>
        </div>
    );
};
