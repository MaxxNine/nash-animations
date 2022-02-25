export default abstract class NashModel<ContextType extends RenderingContext> {
    
    ctx: ContextType;
    
    constructor(ctx: ContextType) {
        this.ctx = ctx;
    }
    
}