declare module '@modelcontextprotocol/sdk/server/mcp.js' {
  export class McpServer {
    constructor(options: { name: string; description: string });
    registerTool(name: string, config: { title?: string; description?: string; inputSchema?: any; outputSchema?: any; annotations?: any; _meta?: any; }, cb: (...args: any[]) => any): void;
    start(): Promise<void>;
  }
}
