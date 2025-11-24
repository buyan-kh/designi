import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { loadDesignProfile, saveDesignProfile } from './store.js';
import { designProfileSchema, designProfileUpdateSchema } from './designProfileSchema.js';
const mcp = new McpServer({
    name: 'design_identity_server',
    description: 'Manages and provides a user\'s design identity (color palettes, typography, tone, etc.) to AI agents.',
});
// Tool to get the current design profile
mcp.registerTool('get_design_identity', {
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
mcp.registerTool('update_design_identity', {
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
async function startServer() {
    try {
        await mcp.start();
        console.log('Design Identity MCP Server started successfully!');
    }
    catch (error) {
        console.error('Failed to start Design Identity MCP Server:', error);
        process.exit(1);
    }
}
startServer();
