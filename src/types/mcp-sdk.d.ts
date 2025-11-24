declare module '@modelcontextprotocol/sdk/server' {
  export class Server {
    constructor(options: { name: string; description: string });
    registerTool(tool: any): void;
    start(): Promise<void>;
  }
}
