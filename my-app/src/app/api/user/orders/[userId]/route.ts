import { db } from "@/firebase";
import { Order } from "@/lib/types";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

// http://localhost:3000/api/user/orders/[jobId]

// View All Orders Of Specific User
export async function GET(request:NextRequest, {params}:{params:{userId:string}}) {
    try {
        const { userId } = params;
        const q = query(collection(db, "orders"), where("userId", "==", userId));
        const querySnapshot = await getDocs(q);
        const proposals = querySnapshot.docs.map((doc) => doc.data());
        if (!querySnapshot.empty) {
          return NextResponse.json(proposals);
        } else {
          return NextResponse.json(null);
        }
      } catch (error) {
        console.log(error);
        return NextResponse.json({ error: JSON.stringify(error) });
      }
}