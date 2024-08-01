import {auth} from "@/auth";
import Link from "next/link";
import React from "react";
import Image from "next/image";

export default async function Home(){
    const session = await auth()
    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center text-white">
            <Image
                src="/bg-home.jpg"
                fill
                quality={100}
                alt="GPS road background"
            />
            <div className="z-10 text-center p-8 bg-black bg-opacity-50 rounded-lg">
                <h1 className="text-4xl font-bold mb-4">Welcome to GPS Navigator</h1>
                <p className="mb-6">
                    Your ultimate companion for seamless navigation and route planning.
                    Discover the fastest and most efficient routes to your destination.
                </p>
                {session ? (
                    <Link href={"/dashboard"}>
                        <p className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                            Go to Dashboard
                        </p>
                    </Link>
                ) : (
                    <Link href={"/signin"}>
                        <p className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                            Login
                        </p>
                    </Link>
                )}
            </div>
        </div>)
}