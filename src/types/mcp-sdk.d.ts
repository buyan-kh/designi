declare module '@modelcontextprotocol/sdk/server/mcp.js' {
  export class McpServer {
    constructor(options: { name: string; version: string; description: string });
    registerTool(name: string, config: { title?: string; description?: string; inputSchema?: any; outputSchema?: any; annotations?: any; _meta?: any; }, cb: (...args: any[]) => any): void;
    connect(transport: any): Promise<void>;
  }
}

declare module '@modelcontextprotocol/sdk/server/streamableHttp.js' {
  export class StreamableHTTPServerTransport {
    constructor(options: { sessionIdGenerator?: any; enableJsonResponse?: boolean });
    close(): void;
    handleRequest(req: any, res: any, body: any): Promise<void>;
    onclose: (() => void) | null; // Add onclose property
  }
}
