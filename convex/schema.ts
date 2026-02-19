import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  tasks: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    status: v.union(v.literal("backlog"), v.literal("in_progress"), v.literal("done")),
    assignee: v.union(v.literal("jarvis"), v.literal("chuka")),
    priority: v.optional(v.union(v.literal("low"), v.literal("medium"), v.literal("high"))),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_status", ["status"])
    .index("by_assignee", ["assignee"]),

  memories: defineTable({
    filename: v.string(),
    content: v.string(),
    date: v.string(),
    syncedAt: v.number(),
  })
    .index("by_date", ["date"])
    .index("by_filename", ["filename"])
    .searchIndex("search_content", {
      searchField: "content",
      filterFields: ["filename"],
    }),
});
