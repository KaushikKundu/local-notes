"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Lock, Wifi, Zap, Cloud } from "lucide-react"
import { useRouter } from "next/navigation"

export default function Page() {
    const router = useRouter();
    return (
        <main className="min-h-screen">
            <nav className="fixed top-2 inset-x-0 mx-auto w-[95%] max-w-7xl z-50 bg-white/80 rounded-full backdrop-blur-md px-4 py-3 mt-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <span className="text-black font-semibold tracking-wide text-xl">OwnSpace</span>
                </div>
                <Button className="bg-white hover:bg-white/90 text-slate-900 font-semibold cursor-pointer rounded-full"
                    onClick={() => router.push('/dashboard')}>Get Started</Button>
            </nav>

            <section className="relative h-screen w-full overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-b">
                    <Image
                        src="/image.png"
                        alt="Serene countryside with cottage"
                        fill
                        priority
                        quality={100}
                        className="object-cover"
                    />
                </div>

                <div className="absolute inset-0 bg-linear-to-b from-white"></div>

                <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
                    <div className="max-w-3xl mx-auto space-y-8">
                        <div className="space-y-4">
                            <h1 className="text-4xl md:text-7xl text-gray-800 outfit text-shadow-lg">
                                Your Private Writing Space
                            </h1>
                            <p className="mt-4 text-lg md:text-xl text-slate-500 text-balance max-w-lg mx-auto">
                                Take notes that stay completely yours. No accounts, no servers, no tracking.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="px-6 py-3 text-lg bg-white/50 hover:bg-white/80  active:opacity-80  shadow-xl text-black border border-gray-200 font-semibold rounded-3xl cursor-pointer ">
                                Start Taking Notes
                            </button>

                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 px-6 bg-stone-900">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-semibold text-white mb-4 text-balance">
                            Privacy That Actually Works
                        </h2>
                        <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
                            Built from the ground up with privacy at its core, not as an afterthought.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="p-8 bg-stone-800 rounded-lg  shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                            <div className="mb-4 ">
                                <Lock className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl mb-3">100% Private</h3>
                            <p className="text-slate-100 leading-relaxed">
                                Your notes never leave your device. We can't read them even if we wanted to.
                            </p>
                        </div>
                        <div className="p-8 bg-stone-800 rounded-lg  shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                            <div className="mb-4 ">
                                <Wifi className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl mb-3">Works Offline</h3>
                            <p className="text-slate-100 leading-relaxed">
                                No internet connection needed. Your notes are available anytime, anywhere.
                            </p>
                        </div>

                        <div className="p-8 bg-stone-800 rounded-lg  shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                            <div className="mb-4 ">
                                <Zap className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl mb-3">Lightning Fast</h3>
                            <p className="text-slate-100 leading-relaxed">
                                Instant responsiveness. No delays, no loading screens, just seamless note-taking.
                            </p>
                        </div>

                        <div className="p-8 bg-stone-800 rounded-lg  shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                            <div className="mb-4 ">
                                <Cloud className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl mb-3">Browser Based</h3>
                            <p className="text-slate-100 leading-relaxed">
                                No installation needed. Open your browser and start writing immediately.
                            </p>
                        </div>
                    </div>
                </div>
            </section>



            {/* CTA Section */}
            <section className="py-24 px-6 bg-teal-100 rounded-2xl">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl italic font-medium text-slate-900 mb-6 text-balance">Take back your digital privacy</h2>
                    <p className="text-lg text-slate-600 mb-12 leading-relaxed">
                        Start your private note-taking journey today. It's free, it's private, and it's yours.
                    </p>
                    <button className="px-6 py-3 text-lg bg-white/50 hover:bg-white/80  active:opacity-80  shadow-xl text-black border border-gray-200 font-semibold rounded-3xl cursor-pointer " onClick={() => router.push('/dashboard')}>
                        Start Taking Notes
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-900 text-slate-400 py-8 px-6 border-t border-slate-800">
                <div className="max-w-7xl mx-auto">
                    <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm">&copy; 2025 OwnSpace. Open Source under MIT License.</p>
                        <p className="text-sm">Built with privacy in mind by Kaushik Kundu</p>
                    </div>
                </div>
            </footer>
        </main>
    )
}
