import { motion } from "framer-motion"
import { useContext, useState } from "react"
import { AppContext } from "../context/AppContext"
import { CircleX } from "lucide-react"

export default function History() {
  const { projectHistory } = useContext(AppContext)
  const [selected, setSelected] = useState(null)

  return (
    <div  className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">

      {/* Background gradients */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(ellipse 120% 80% at 70% 20%, rgba(255, 20, 147, 0.15), transparent 50%),
            radial-gradient(ellipse 100% 60% at 30% 10%, rgba(0, 255, 255, 0.12), transparent 60%),
            radial-gradient(ellipse 90% 70% at 50% 0%, rgba(138, 43, 226, 0.18), transparent 65%),
            radial-gradient(ellipse 110% 50% at 80% 30%, rgba(255, 215, 0, 0.08), transparent 40%),
            #000000
          `,
        }}
      />
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #1f2937 1px, transparent 1px),
            linear-gradient(to bottom, #1f2937 1px, transparent 1px)
          `,
          backgroundSize: "20px 30px",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)",
        }}
      />

      {/* History Cards */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 p-6 w-full max-w-6xl">
        {projectHistory.map((item, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.02 }}
            className="flex justify-center"
          >
            <div className="w-full bg-white/10 backdrop-blur-xl shadow-lg border border-white/20 rounded-2xl p-4 text-white">
              <div className="space-y-3">
                <p className="text-sm font-medium opacity-80">
                  Input: {item.input_text}
                </p>

                <p className="text-base">
                  {item.output_text.length > 100 ? (
                    <>
                      {item.output_text.slice(0, 100)}...
                      <button
                        onClick={() => setSelected(item)}
                        className="text-pink-400 underline ml-2"
                      >
                        Read more
                      </button>
                    </>
                  ) : (
                    item.output_text
                  )}
                </p>

                <p className="text-xs text-gray-300">
                  Tone: {item.tone_tags.join(", ")}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      {selected && (
        <div  className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"> 
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className=" modal-content bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg p-6 w-full max-w-2xl text-white relative max-h-[80vh] overflow-y-auto over "
          >
            {/* Close button */}
            <button
              onClick={() => setSelected(null)}
              className="absolute top-3 right-3 text-gray-300 hover:text-white text-xl"
            >
                <CircleX/>
            </button>

            <h2 className="text-lg text-yellow-200 font-semibold mb-2">Input</h2>
            <p className="mb-4 text-gray-200">{selected.input_text}</p>

            <h2 className="text-lg font-semibold text-yellow-200 mb-2">Output</h2>
            <p className="mb-4 text-gray-100 whitespace-pre-line">{selected.output_text}</p>

            <h2 className="text-lg font-semibold text-yellow-200 mb-2">Tone Tags</h2>
            <p className="text-gray-300">{selected.tone_tags.join(", ")}</p>
          </motion.div>
        </div>
      )}
    </div>
  )
}
