import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <div className="m-5 flex flex-col justify-center items-center min-h-screen text-slate-600">
    <div className="flex flex-col justify-center items-center text-center bg-slate-200 shadow-cyan-300 shadow-md rounded-md p-20">
        <h2 className=" text-slate-700 text-4xl mb-20 font-serif font-semibold">Welcome to TestQuiz</h2>
        <h2 className="text-2xl mb-20 font-serif font-semibold">Click the button below to start your test</h2>
        <Link href={'/quiz'}>
            <Button 
                className="font-semibold font-sans bg-cyan-400 text-black text-xl hover:text-white" 
                variant={'default'}
            >
                Start Quiz
            </Button>
        </Link>
    </div>
</div>
  );
}