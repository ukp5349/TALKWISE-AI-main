import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
  },
  handler: async (ctx, args) => {
    console.log("🔍 Creating/fetching user with email:", args.email);
    
    // First check if user already exists
    const existingUser = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .first();
    
    if (existingUser) {
      console.log("🔄 Found existing user:", existingUser);
      return existingUser._id;
    }
    
    // Prepare user data
    const userData = {
      name: args.name,
      email: args.email,
      credits: 50000,      
      createdAt: new Date().toISOString()
    };
    
    console.log("📝 Creating new user with data:", userData);
    
    // Insert the new user
    const id = await ctx.db.insert("users", userData);
    console.log("✅ Created new user with ID:", id);
    return id;
  }
});

export const getUser = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .first();
    
    console.log("📖 Retrieved user data:", user);
    return user;
  }
});

export const UpdateUserToken=mutation({
  args:{
    id:v.id('users'),
    credits:v.number()
  
  },
  handler:async(ctx,args)=>{
    await ctx.db.patch(args.id,{
      credits:args.credits
    })
  }
})



