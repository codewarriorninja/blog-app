import { NextResponse } from "next/server"
import connect from "@/lib/db"
import User from "@/lib/models/userModel";
import Category from "@/lib/models/categoryModel";
import { Types } from "mongoose";

const { ObjectId } = Types;

export const GET = async(request:Request) => {
    try {
        const {searchParams} = new URL(request.url);
        const userId = searchParams.get('userId');

        if(!userId || !Types.ObjectId.isValid(userId)){
            return new NextResponse(JSON.stringify({message:'Invalid or missing userId'}),{status:400})
        }
        await connect();

        const user = await User.findById(userId);
        if(!user){
            return new NextResponse(
                JSON.stringify({message:'User not found'}),{status:400}
            )
        }

        const categories = await Category.find({user:new Types.ObjectId(userId)});

        return new NextResponse(JSON.stringify(categories),{status:200})
    } catch (error: any) {
        return new NextResponse(`Error in fetching categories ${error.message}`,{status:500})
    }
}

export const POST = async(request:Request) => {
    try {
        const {searchParams} = new URL(request.url);
        const userId = searchParams.get('userId');
        const {title} = await request.json();

        if(!userId || !Types.ObjectId.isValid(userId)){
            return new NextResponse(JSON.stringify({message:'Invalid or missing userId'}),{status:400})
        }
        await connect();
        const user = await User.findById(userId);
        
        if(!user){
            return new NextResponse(JSON.stringify({message:'User not found'}),{
                status:400,
            });
        }
        const newCategory = new Category({title,user:new Types.ObjectId(userId)});
        await newCategory.save();

        return new NextResponse(
            JSON.stringify({message:'Category is created',category:newCategory}),{status:200}
        );
    } catch (error:any) {
        return new NextResponse(`Error in creating categories ${error.message}`,{status:500})
    }
}