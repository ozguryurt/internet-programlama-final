const About = () => {
    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-3 py-36 px-5">
            <div className="w-full flex justify-center items-center lg:col-span-3">
                <p className="font-bold text-zinc-800 text-4xl text-center">Emeği Geçenler</p>
            </div>
            <div className="w-full flex flex-col justify-center items-center">
                <p className="font-medium text-zinc-800 text-2xl text-center">Özgür Yurt</p>
                <p className="font-medium text-zinc-800 text-2xl text-center">202113709052</p>
            </div>
            <div className="w-full flex flex-col justify-center items-center">
                <p className="font-medium text-zinc-800 text-2xl text-center">Oğuzhan Yılmaz</p>
                <p className="font-medium text-zinc-800 text-2xl text-center">202113709014</p>
            </div>
            <div className="w-full flex flex-col justify-center items-center">
                <p className="font-medium text-zinc-800 text-2xl text-center">Enes Koç</p>
                <p className="font-medium text-zinc-800 text-2xl text-center">202113709005</p>
            </div>
        </div>
    )
}

export default About