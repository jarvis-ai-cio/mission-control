import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("memories").withIndex("by_date").order("desc").collect();
  },
});

export const search = query({
  args: { query: v.string() },
  handler: async (ctx, args) => {
    if (!args.query) return ctx.db.query("memories").order("desc").collect();
    return await ctx.db
      .query("memories")
      .withSearchIndex("search_content", (q) => q.search("content", args.query))
      .collect();
  },
});

export const upsert = mutation({
  args: {
    filename: v.string(),
    content: v.string(),
    date: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("memories")
      .withIndex("by_filename", (q) => q.eq("filename", args.filename))
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        content: args.content,
        date: args.date,
        syncedAt: Date.now(),
      });
    } else {
      await ctx.db.insert("memories", { ...args, syncedAt: Date.now() });
    }
  },
});
