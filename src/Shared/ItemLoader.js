export default function ItemLoader() {
    return (
        <div >
            <div className="w-full col-span-12 sm:col-span-6 md:col-span-3 flex gap-3 animate-pulse ">
                <div>
                    <div className="relative ">
                        <div className="aspect-video bg-slate-200 rounded-md h-20 w-full" />
                    </div>
                </div>

                <div className="w-full pr-2 py-2">
                    <div className="space-y-3">
                        <p className="bg-slate-200 text-slate-200 text-[8px]  w-full">
                            Loading...
                        </p>
                        <p className="bg-slate-200 text-slate-200 text-[8px]  w-[90%]">
                            Loading...
                        </p>
                        <p className="bg-slate-200 text-slate-200 text-[8px]  w-[30%]">
                            Loading...
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
