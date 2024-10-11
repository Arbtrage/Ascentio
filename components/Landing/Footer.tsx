export default function Footer() {
    return (
        <footer>

            {/* Big text */}
            <div className="relative -mt-16 h-60 w-full" aria-hidden="true">
                <div className="pointer-events-none absolute left-1/2 -z-10 -translate-x-1/2 text-center text-[200px] font-bold leading-none before:bg-gradient-to-b before:from-gray-200 before:to-gray-100/30 before:to-80% before:bg-clip-text before:text-transparent before:content-['Ascentio'] after:absolute after:inset-0 after:bg-gray-300/70 after:bg-clip-text after:text-transparent after:mix-blend-darken after:content-['Ascentio'] after:[text-shadow:0_1px_0_white]"></div>
                {/* Glow */}
                <div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2/3"
                    aria-hidden="true"
                >
                </div>
            </div>
            
        </footer>
    );
}