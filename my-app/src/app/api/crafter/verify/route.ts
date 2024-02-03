import { db } from "@/firebase";
import { auth } from "@clerk/nextjs";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

// {DOMAIN}/api/crafter/verify?id={userId}

// verify the user is crafter or not

export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get("id");
    const q = query(collection(db, "crafters"), where("id", "==", userId));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      return NextResponse.json({ crafterId: userId });
    } else {
      return NextResponse.json({ crafterId: undefined });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: JSON.stringify(error) });
  }
}
