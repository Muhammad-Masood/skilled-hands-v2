import { db } from "@/firebase";
import { auth } from "@clerk/nextjs";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const {userId} = auth();
        const q = query(collection(db, "crafters"), where("id","==",userId));
        const querySnapshot = await getDocs(q);
        if(!querySnapshot.empty){
            return NextResponse.json({ userId: userId });
        } else {
            return NextResponse.json({userId:null});
        }
    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: JSON.stringify(error) });
    }
  }