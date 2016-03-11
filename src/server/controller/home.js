export default {
    index: async (ctx, next) => {
        await ctx.render('home/index');
    }
}
