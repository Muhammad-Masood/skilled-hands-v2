

// GET POST PATCH PUT DELETE
// data -> body -> large data
// data -> url (searchparams) -> small data

import { db } from "@/firebase";
import { Profile } from "@/lib/types";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { INTERNALS } from "next/dist/server/web/spec-extension/request";
import { NextRequest, NextResponse } from "next/server";

const obj = {
    message: "Profile data stored!"
}

export async function POST(request:NextRequest){
    const data:Profile = await request.json();
    console.log(data);
    const dataDocumentReference = doc(db,"profile",data.id)
    await setDoc(dataDocumentReference,data, {merge:true});
    return NextResponse.json(obj);
}

// for single search profile
export async function GET(request:NextRequest){
    const id = request.nextUrl.searchParams.get("id")
    if(id!==null){
        const crafterProfileRef = doc(db, "profile",id);
        const crafterProfileData = (await getDoc(crafterProfileRef)).data();
        return NextResponse.json(crafterProfileData);
    } else {
        return NextResponse.json({message: "id not found"});
    }
}