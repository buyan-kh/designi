import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import express from 'express';
import { z } from 'zod';
import { loadDesignProfile, saveDesignProfile } from './store.js';
import { designProfileSchema, designProfileUpdateSchema } from './designProfileSchema.js';
// Create the MCP server instance
const mcpServer = new McpServer({
    name: 'design_identity_server',
    version: '1.0.0', // It's good practice to provide a version
    description: 'Manages and provides a user\'s design identity (color palettes, typography, tone, etc.) to AI agents.',
});
// Tool to get the current design profile
mcpServer.registerTool('get_design_identity', {
    title: 'Get Design Identity',
    description: 'Retrieves the user\'s current design identity profile, including color palette, typography, and general tone.',
    inputSchema: z.object({}),
    outputSchema: designProfileSchema,
}, async () => {
    const profile = await loadDesignProfile();
    console.log('get_design_identity called. Returning profile:', profile);
    return profile;
});
// Tool to update parts of the design profile
mcpServer.registerTool('update_design_identity', {
    title: 'Update Design Identity',
    description: 'Updates specific aspects of the user\'s design identity profile. Only provided fields will be updated.',
    inputSchema: designProfileUpdateSchema,
    outputSchema: designProfileSchema,
}, async (input) => {
    let currentProfile = await loadDesignProfile();
    const updatedProfile = {
        ...currentProfile,
        ...input,
        colorPalette: input.colorPalette ? { ...currentProfile.colorPalette, ...input.colorPalette } : currentProfile.colorPalette,
        typography: input.typography ? { ...currentProfile.typography, ...input.typography } : currentProfile.typography,
        keywords: input.keywords ? Array.from(new Set([...(currentProfile.keywords || []), ...input.keywords])) : currentProfile.keywords,
    };
    await saveDesignProfile(updatedProfile);
    console.log('update_design_identity called. New profile:', updatedProfile);
    return updatedProfile;
});
// Set up Express and HTTP transport
const app = express();
app.use(express.json());
app.post('/mcp', async (req, res) => {
    try {
        const transport = new StreamableHTTPServerTransport({
            sessionIdGenerator: undefined, // Stateless mode
            enableJsonResponse: true
        });
        res.on('close', () => {
            transport.close();
        });
        await mcpServer.connect(transport);
        await transport.handleRequest(req, res, req.body);
    }
    catch (error) {
        console.error('Error handling MCP request:', error);
        if (!res.headersSent) {
            res.status(500).json({
                jsonrpc: '2.0',
                error: {
                    code: -32603,
                    message: 'Internal server error'
                },
                id: null
            });
        }
    }
});
const port = parseInt(process.env.PORT || '3000');
app.listen(port, () => {
    console.log(`Design Identity MCP Server running on http://localhost:${port}/mcp`);
}).on('error', error => {
    console.error('Server error:', error);
    process.exit(1);
});
