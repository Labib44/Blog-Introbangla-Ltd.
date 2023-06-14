export default function BlogLoader() {
    return (
        <div >
            <div className="w-full col-span-12 sm:col-span-6 md:col-span-3 flex flex-col animate-pulse">
                <div className="relative ">
                    <div className="aspect-video bg-slate-200 rounded-md " />
                </div>

                <div className="flex flex-row mt-3 gap-2 items-center">
                    {/* <div className="bg-slate-200 rounded-full h-8 w-8 shrink-0" /> */}

                    <div className="flex flex-col space-y-3 grow px-2">
                        <div className="flex justify-between">
                            <p className="bg-slate-200 text-slate-200 text-[8px]  w-[50%]">
                                Loading...
                            </p>
                            <p className="bg-slate-200 text-slate-200 text-[8px]  w-[30%]">
                                Loading...
                            </p>
                        </div>
                        <div className="flex gap-3 pb-2">
                            <p className="bg-slate-200 text-slate-200 text-[8px] w-14">
                                Loading...
                            </p>
                            <p className="bg-slate-200 text-slate-200 text-[8px] w-12">
                                Loading...
                            </p>
                            <p className="bg-slate-200 text-slate-200 text-[8px] w-10">
                                Loading...
                            </p>
                        </div>
                        <p className="bg-slate-200 text-slate-200 text-[8px] w-[100%] ">
                            Loading...
                        </p>
                        <p className="bg-slate-200 text-slate-200 text-[8px] w-[90%]">
                            Loading...
                        </p>
                        <p className="bg-slate-200 text-slate-200 text-[8px] w-[70%]">
                            Loading...
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
